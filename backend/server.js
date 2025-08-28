const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(express.json());



// PostgreSQL connection
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Initialize database tables
async function initDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        telegram_id VARCHAR(255) UNIQUE,
        username VARCHAR(255),
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        current_day INTEGER DEFAULT 1,
        current_step VARCHAR(50) DEFAULT 'intro',
        progress JSONB DEFAULT '{"day1": false, "day2": false, "day3": false, "day4": false}',
        journal JSONB DEFAULT '[]',
        deck JSONB DEFAULT '{"selectedCards": [], "completedReadings": 0}',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS sessions (
        id VARCHAR(255) PRIMARY KEY,
        telegram_id VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP
      )
    `);

    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
  }
}

// Initialize database on startup
initDatabase();

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// User management
app.post('/api/users', async (req, res) => {
  try {
    const { telegramId, username, firstName, lastName } = req.body;
    const userId = telegramId || `user_${Date.now()}`;
    
    const result = await pool.query(`
      INSERT INTO users (id, telegram_id, username, first_name, last_name)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (telegram_id) DO UPDATE SET
        username = EXCLUDED.username,
        first_name = EXCLUDED.first_name,
        last_name = EXCLUDED.last_name,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *
    `, [userId, telegramId, username, firstName, lastName]);
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.get('/api/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ error: 'Failed to get user' });
  }
});

app.put('/api/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;
    
    const result = await pool.query(`
      UPDATE users 
      SET 
        current_day = COALESCE($1, current_day),
        current_step = COALESCE($2, current_step),
        progress = COALESCE($3, progress),
        journal = COALESCE($4, journal),
        deck = COALESCE($5, deck),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING *
    `, [
      updates.currentDay,
      updates.currentStep,
      updates.progress ? JSON.stringify(updates.progress) : null,
      updates.journal ? JSON.stringify(updates.journal) : null,
      updates.deck ? JSON.stringify(updates.deck) : null,
      userId
    ]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Progress management
app.post('/api/users/:userId/progress', async (req, res) => {
  try {
    const { userId } = req.params;
    const { day, completed } = req.body;
    
    // Get current user data
    const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const user = userResult.rows[0];
    const progress = user.progress || {};
    progress[`day${day}`] = completed;
    
    const result = await pool.query(`
      UPDATE users 
      SET 
        progress = $1,
        current_day = $2,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING *
    `, [JSON.stringify(progress), Math.max(day + 1, 1), userId]);
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

// Journal management
app.post('/api/users/:userId/journal', async (req, res) => {
  try {
    const { userId } = req.params;
    const { entry } = req.body;
    
    // Get current user data
    const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const user = userResult.rows[0];
    const journal = user.journal || [];
    journal.push(entry);
    
    const result = await pool.query(`
      UPDATE users 
      SET 
        journal = $1,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `, [JSON.stringify(journal), userId]);
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error adding journal entry:', error);
    res.status(500).json({ error: 'Failed to add journal entry' });
  }
});

// Deck management
app.post('/api/users/:userId/deck', async (req, res) => {
  try {
    const { userId } = req.params;
    const { selectedCards } = req.body;
    
    // Get current user data
    const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const user = userResult.rows[0];
    const deck = user.deck || { selectedCards: [], completedReadings: 0 };
    deck.selectedCards = selectedCards;
    deck.completedReadings += 1;
    
    const result = await pool.query(`
      UPDATE users 
      SET 
        deck = $1,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `, [JSON.stringify(deck), userId]);
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating deck:', error);
    res.status(500).json({ error: 'Failed to update deck' });
  }
});

// Session management
app.post('/api/sessions', async (req, res) => {
  try {
    const { telegramId } = req.body;
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    
    const result = await pool.query(`
      INSERT INTO sessions (id, telegram_id, expires_at)
      VALUES ($1, $2, $3)
      RETURNING *
    `, [sessionId, telegramId, expiresAt]);
    
    res.json({ sessionId });
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ error: 'Failed to create session' });
  }
});

// Cleanup old sessions (every hour)
setInterval(async () => {
  try {
    await pool.query('DELETE FROM sessions WHERE expires_at < NOW()');
  } catch (error) {
    console.error('Error cleaning up sessions:', error);
  }
}, 60 * 60 * 1000);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Serve static files from frontend build
app.use(express.static('public'));

// Serve React app for all non-API routes
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  res.sendFile('index.html', { root: 'public' });
});

app.listen(PORT, () => {
  console.log(`🚀 Shadow Quest Backend running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});
