const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
// CSP настройки для разных окружений
const isDevelopment = process.env.NODE_ENV !== 'production' || 
                     process.env.PORT === '4000' || 
                     !process.env.RAILWAY_ENVIRONMENT;

console.log('🔒 CSP настройки:', {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  RAILWAY_ENVIRONMENT: process.env.RAILWAY_ENVIRONMENT,
  isDevelopment: isDevelopment,
  cspEnabled: !isDevelopment
});

app.use(helmet({
  contentSecurityPolicy: isDevelopment ? false : {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://telegram.org"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "blob:"],
      connectSrc: [
        "'self'", 
        "https://aots-production-9a30.up.railway.app",
        "https://www.shadow-quest.online",
        "https://telegram.org",
        "https://fonts.googleapis.com",
        "https://fonts.gstatic.com"
      ],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"]
    }
  }
}));
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174', 
    'http://localhost:5175',
    'http://localhost:5176',
    'http://localhost:5177',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(express.json());

// Database connection (PostgreSQL or MySQL based on DATABASE_URL)
let pool = null;
if (process.env.DATABASE_URL) {
  const url = new URL(process.env.DATABASE_URL);
  
  // Determine database type based on URL or hostname
  if (url.protocol === 'postgres:' || url.protocol === 'postgresql:' || url.hostname.includes('postgres')) {
    console.log('🔗 DATABASE_URL found, attempting to connect to PostgreSQL...');
    const { Pool } = require('pg');
    
    const config = {
      host: url.hostname,
      port: url.port || 5432,
      user: url.username,
      password: url.password,
      database: url.pathname.slice(1), // Remove leading slash
      ssl: process.env.NODE_ENV === 'production' || process.env.RAILWAY_ENVIRONMENT ? { rejectUnauthorized: false } : false,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 60000
    };
    
    console.log('🔧 PostgreSQL config:', {
      host: config.host,
      port: config.port,
      user: config.user,
      database: config.database,
      ssl: !!config.ssl
    });
    
    try {
      pool = new Pool(config);
      console.log('✅ PostgreSQL connection pool created');
      
      // Test the connection
      pool.query('SELECT NOW()', (err, result) => {
        if (err) {
          console.error('❌ PostgreSQL connection test failed:', err);
          pool = null;
        } else {
          console.log('✅ PostgreSQL connection test successful:', result.rows[0]);
        }
      });
    } catch (err) {
      console.error('❌ Failed to create PostgreSQL connection pool:', err);
      pool = null;
    }
  } else {
    console.log('🔗 DATABASE_URL found, attempting to connect to MySQL...');
    const mysql = require('mysql2/promise');
    
    const config = {
      host: url.hostname,
      port: url.port || 3306,
      user: url.username,
      password: url.password,
      database: url.pathname.slice(1), // Remove leading slash
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      acquireTimeout: 60000, // 60 seconds
      idleTimeout: 300000, // 5 minutes
      charset: 'utf8mb4',
      timezone: 'Z'
    };
    
    console.log('🔧 MySQL config:', {
      host: config.host,
      port: config.port,
      user: config.user,
      database: config.database,
      ssl: !!config.ssl
    });
    
    try {
      pool = mysql.createPool(config);
      console.log('✅ MySQL connection pool created');
    } catch (err) {
      console.error('❌ Failed to create MySQL connection pool:', err);
      pool = null;
    }
  }
  
  // Test the connection with retry logic
  const testConnection = async (retries = 3) => {
    for (let i = 0; i < retries; i++) {
      try {
        if (!pool) {
          console.error('❌ Connection pool is null, cannot test connection');
          return;
        }
        
        // Test connection based on database type
        if (url.protocol === 'postgres:' || url.protocol === 'postgresql:' || url.hostname.includes('postgres')) {
          const client = await pool.connect();
          console.log('✅ PostgreSQL connection successful');
          client.release();
        } else {
          const connection = await pool.getConnection();
          console.log('✅ MySQL connection successful');
          connection.release();
        }
        return;
      } catch (err) {
        console.error(`❌ Database connection attempt ${i + 1} failed:`, err.message);
        if (i === retries - 1) {
          console.error('❌ Database connection failed after all retries:', err);
          pool = null;
        } else {
          console.log(`⏳ Retrying connection in 5 seconds...`);
          await new Promise(resolve => setTimeout(resolve, 5000));
        }
      }
    }
  };
  
  // Запускаем тест подключения асинхронно
  if (pool) {
    testConnection().catch(err => {
      console.error('❌ Connection test failed:', err);
    });
  }
} else {
  console.log('⚠️  No DATABASE_URL provided');
}

// Initialize database tables
async function initDatabase() {
  if (!pool) {
    console.log('⚠️  No DATABASE_URL provided, skipping database initialization');
    return;
  }

  try {
    console.log('🔄 Testing database connection...');
    
    // Ждем немного перед тестом подключения
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    await pool.query('SELECT NOW()');
    console.log('✅ Database connection successful');
    
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
        timers JSONB DEFAULT '{}',
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

    console.log('✅ MySQL database initialized successfully');
  } catch (error) {
    console.error('❌ MySQL database initialization failed:', error);
    console.log('⚠️  Disabling database connection due to error');
    pool = null;
  }
}

// Initialize database on startup
initDatabase();

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('🔄 Shutting down gracefully...');
  if (pool) {
    await pool.end();
    console.log('✅ Database connection closed');
  }
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('🔄 Shutting down gracefully...');
  if (pool) {
    await pool.end();
    console.log('✅ Database connection closed');
  }
  process.exit(0);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: pool ? 'connected' : 'not configured'
  });
});

// User management
app.post('/api/users', async (req, res) => {
  console.log('📝 POST /api/users called');
  console.log('🔍 Pool status:', pool ? 'available' : 'null');
  console.log('🔍 DATABASE_URL:', process.env.DATABASE_URL ? 'set' : 'not set');
  console.log('🔍 NODE_ENV:', process.env.NODE_ENV);
  console.log('🔍 RAILWAY_ENVIRONMENT:', process.env.RAILWAY_ENVIRONMENT);
  
  if (!pool) {
    console.log('⚠️  Database not available, returning mock user data');
    // Возвращаем моковые данные пользователя для работы без базы данных
    const mockUser = {
      id: req.body.telegramId || `user_${Date.now()}`,
      telegramId: req.body.telegramId || `user_${Date.now()}`,
      username: req.body.username || null,
      firstName: req.body.firstName || null,
      lastName: req.body.lastName || null,
      currentDay: 1,
      currentStep: 'intro',
      progress: { day1: false, day2: false, day3: false, day4: false },
      journal: [],
      deck: { selectedCards: [], completedReadings: 0 },
      timers: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    console.log('✅ Returning mock user:', mockUser.id);
    return res.status(201).json(mockUser);
  }

  try {
    const { telegramId, username, firstName, lastName } = req.body;
    const userId = telegramId || `user_${Date.now()}`;
    
    // Определяем тип базы данных для правильного SQL
    const isPostgreSQL = process.env.DATABASE_URL && (
      process.env.DATABASE_URL.includes('postgres') || 
      process.env.DATABASE_URL.includes('postgresql')
    );
    
    let result, userResult;
    
    if (isPostgreSQL) {
      // PostgreSQL синтаксис
      result = await pool.query(`
        INSERT INTO users (id, telegram_id, username, first_name, last_name)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (id) DO UPDATE SET
          username = EXCLUDED.username,
          first_name = EXCLUDED.first_name,
          last_name = EXCLUDED.last_name,
          updated_at = CURRENT_TIMESTAMP
        RETURNING *
      `, [userId, telegramId, username, firstName, lastName]);
      
      userResult = result.rows[0];
    } else {
      // MySQL синтаксис
      result = await pool.query(`
        INSERT INTO users (id, telegram_id, username, first_name, last_name)
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          username = VALUES(username),
          first_name = VALUES(first_name),
          last_name = VALUES(last_name),
          updated_at = CURRENT_TIMESTAMP
      `, [userId, telegramId, username, firstName, lastName]);
      
      // Get the user data after insert/update
      const [userResultArray] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
      userResult = userResultArray[0];
    }
    
    res.status(201).json(userResult);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.get('/api/users/:userId', async (req, res) => {
  if (!pool) {
    console.log('⚠️  Database not available, returning mock user data');
    // Возвращаем моковые данные пользователя для работы без базы данных
    const mockUser = {
      id: req.params.userId,
      telegramId: req.params.userId,
      username: null,
      firstName: null,
      lastName: null,
      currentDay: 1,
      currentStep: 'intro',
      progress: { day1: false, day2: false, day3: false, day4: false },
      journal: [],
      deck: { selectedCards: [], completedReadings: 0 },
      timers: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    return res.status(200).json(mockUser);
  }

  try {
    const { userId } = req.params;
    const [result] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
    
    if (result.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(result[0]);
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ error: 'Failed to get user' });
  }
});

app.put('/api/users/:userId', async (req, res) => {
  console.log('📝 PUT /api/users/:userId called');
  console.log('🔍 Pool status:', pool ? 'available' : 'null');
  console.log('🔍 User ID:', req.params.userId);
  console.log('🔍 Request body:', req.body);
  
  if (!pool) {
    console.log('⚠️  Database not available, returning mock user data');
    // Возвращаем моковые данные пользователя для работы без базы данных
    const mockUser = {
      id: req.params.userId,
      telegramId: req.params.userId,
      username: null,
      firstName: null,
      lastName: null,
      currentDay: req.body.currentDay || 1,
      currentStep: req.body.currentStep || 'intro',
      progress: req.body.progress || { day1: false, day2: false, day3: false, day4: false },
      journal: req.body.journal || [],
      deck: req.body.deck || { selectedCards: [], completedReadings: 0 },
      timers: req.body.timers || {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    console.log('✅ Returning mock user:', mockUser.id);
    return res.status(200).json(mockUser);
  }

  try {
    const { userId } = req.params;
    const updates = req.body;
    
    // Определяем тип базы данных для правильного SQL
    const isPostgreSQL = process.env.DATABASE_URL && (
      process.env.DATABASE_URL.includes('postgres') || 
      process.env.DATABASE_URL.includes('postgresql')
    );
    
    let result, updatedUser;
    
    if (isPostgreSQL) {
      // PostgreSQL синтаксис
      result = await pool.query(`
        UPDATE users 
        SET 
          current_day = COALESCE($1, current_day),
          current_step = COALESCE($2, current_step),
          progress = COALESCE($3, progress),
          journal = COALESCE($4, journal),
          deck = COALESCE($5, deck),
          timers = COALESCE($6, timers),
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $7
        RETURNING *
      `, [
        updates.currentDay,
        updates.currentStep,
        updates.progress ? JSON.stringify(updates.progress) : null,
        updates.journal ? JSON.stringify(updates.journal) : null,
        updates.deck ? JSON.stringify(updates.deck) : null,
        updates.timers ? JSON.stringify(updates.timers) : null,
        userId
      ]);
      
      updatedUser = result.rows[0];
    } else {
      // MySQL синтаксис
      result = await pool.query(`
        UPDATE users 
        SET 
          current_day = COALESCE(?, current_day),
          current_step = COALESCE(?, current_step),
          progress = COALESCE(?, progress),
          journal = COALESCE(?, journal),
          deck = COALESCE(?, deck),
          timers = COALESCE(?, timers),
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `, [
        updates.currentDay,
        updates.currentStep,
        updates.progress ? JSON.stringify(updates.progress) : null,
        updates.journal ? JSON.stringify(updates.journal) : null,
        updates.deck ? JSON.stringify(updates.deck) : null,
        updates.timers ? JSON.stringify(updates.timers) : null,
        userId
      ]);
      
      // Get updated user data
      const [updatedUserArray] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
      updatedUser = updatedUserArray[0];
    }
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Progress management
app.post('/api/users/:userId/progress', async (req, res) => {
  if (!pool) {
    return res.status(503).json({ error: 'Database not available' });
  }

  try {
    const { userId } = req.params;
    const { day, completed } = req.body;
    
    // Get current user data
    const [userResult] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
    if (userResult.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const user = userResult[0];
    const progress = user.progress || {};
    progress[`day${day}`] = completed;
    
    const result = await pool.query(`
      UPDATE users 
      SET 
        progress = ?,
        current_day = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
      RETURNING *
    `, [JSON.stringify(progress), Math.max(day + 1, 1), userId]);
    
    // Get updated user data
    const [updatedUser] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
    res.json(updatedUser[0]);
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

// Journal management
app.post('/api/users/:userId/journal', async (req, res) => {
  if (!pool) {
    return res.status(503).json({ error: 'Database not available' });
  }

  try {
    const { userId } = req.params;
    const { entry } = req.body;
    
    // Get current user data
    const [userResult] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
    if (userResult.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const user = userResult[0];
    const journal = user.journal || [];
    journal.push(entry);
    
    const result = await pool.query(`
      UPDATE users 
      SET 
        journal = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
      RETURNING *
    `, [JSON.stringify(journal), userId]);
    
    // Get updated user data
    const [updatedUser] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
    res.json(updatedUser[0]);
  } catch (error) {
    console.error('Error adding journal entry:', error);
    res.status(500).json({ error: 'Failed to add journal entry' });
  }
});

// Deck management
app.post('/api/users/:userId/deck', async (req, res) => {
  if (!pool) {
    return res.status(503).json({ error: 'Database not available' });
  }

  try {
    const { userId } = req.params;
    const { selectedCards } = req.body;
    
    // Get current user data
    const [userResult] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
    if (userResult.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const user = userResult[0];
    const deck = user.deck || { selectedCards: [], completedReadings: 0 };
    deck.selectedCards = selectedCards;
    deck.completedReadings += 1;
    
    const result = await pool.query(`
      UPDATE users 
      SET 
        deck = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
      RETURNING *
    `, [JSON.stringify(deck), userId]);
    
    // Get updated user data
    const [updatedUser] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
    res.json(updatedUser[0]);
  } catch (error) {
    console.error('Error updating deck:', error);
    res.status(500).json({ error: 'Failed to update deck' });
  }
});

// Timer management
app.post('/api/users/:userId/timer', async (req, res) => {
  if (!pool) {
    console.log('⚠️  Database not available, returning mock timer data');
    // Возвращаем моковые данные таймера для работы без базы данных
    const mockTimer = {
      startTime: req.body.startTime || Date.now(),
      lastUpdated: Date.now()
    };
    return res.status(201).json(mockTimer);
  }

  try {
    const { userId } = req.params;
    const { dayNumber, startTime } = req.body;
    
    // Определяем тип базы данных для правильного SQL
    const isPostgreSQL = process.env.DATABASE_URL && (
      process.env.DATABASE_URL.includes('postgres') || 
      process.env.DATABASE_URL.includes('postgresql')
    );
    
    let userResult, result, updatedUser;
    
    if (isPostgreSQL) {
      // PostgreSQL синтаксис
      userResult = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
      if (userResult.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      const user = userResult.rows[0];
      const timers = user.timers || {};
      timers[`day${dayNumber}`] = {
        startTime,
        lastUpdated: Date.now()
      };
      
      result = await pool.query(`
        UPDATE users 
        SET 
          timers = $1,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        RETURNING *
      `, [JSON.stringify(timers), userId]);
      
      updatedUser = result.rows[0];
    } else {
      // MySQL синтаксис
      const [userResultArray] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
      if (userResultArray.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      const user = userResultArray[0];
      const timers = user.timers || {};
      timers[`day${dayNumber}`] = {
        startTime,
        lastUpdated: Date.now()
      };
      
      await pool.query(`
        UPDATE users 
        SET 
          timers = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `, [JSON.stringify(timers), userId]);
      
      // Get updated user data
      const [updatedUserArray] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
      updatedUser = updatedUserArray[0];
    }
    
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating timer:', error);
    res.status(500).json({ error: 'Failed to update timer' });
  }
});

app.get('/api/users/:userId/timer/:dayNumber', async (req, res) => {
  console.log('⏰ GET /api/users/:userId/timer/:dayNumber called');
  console.log('🔍 Pool status:', pool ? 'available' : 'null');
  console.log('🔍 User ID:', req.params.userId);
  console.log('🔍 Day Number:', req.params.dayNumber);
  
  if (!pool) {
    console.log('⚠️  Database not available, returning mock timer data');
    // Возвращаем моковые данные таймера для работы без базы данных
    const mockTimer = {
      startTime: Date.now() - 3600000, // 1 час назад
      lastUpdated: Date.now()
    };
    return res.status(200).json(mockTimer);
  }

  try {
    const { userId, dayNumber } = req.params;
    
    // Определяем тип базы данных для правильного SQL
    const isPostgreSQL = process.env.DATABASE_URL && (
      process.env.DATABASE_URL.includes('postgres') || 
      process.env.DATABASE_URL.includes('postgresql')
    );
    
    let result;
    
    if (isPostgreSQL) {
      // PostgreSQL синтаксис
      result = await pool.query('SELECT timers FROM users WHERE id = $1', [userId]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      const timers = result.rows[0].timers || {};
      const timer = timers[`day${dayNumber}`];
      
      if (!timer) {
        return res.status(404).json({ error: 'Timer not found' });
      }
      
      res.json(timer);
    } else {
      // MySQL синтаксис
      const [resultArray] = await pool.query('SELECT timers FROM users WHERE id = ?', [userId]);
      if (resultArray.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      const timers = resultArray[0].timers || {};
      const timer = timers[`day${dayNumber}`];
      
      if (!timer) {
        return res.status(404).json({ error: 'Timer not found' });
      }
      
      res.json(timer);
    }
  } catch (error) {
    console.error('Error getting timer:', error);
    res.status(500).json({ error: 'Failed to get timer' });
  }
});

// Session management
app.post('/api/sessions', async (req, res) => {
  if (!pool) {
    return res.status(503).json({ error: 'Database not available' });
  }

  try {
    const { telegramId } = req.body;
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    
    const result = await pool.query(`
      INSERT INTO sessions (id, telegram_id, expires_at)
      VALUES (?, ?, ?)
      RETURNING *
    `, [sessionId, telegramId, expiresAt]);
    
    res.json({ sessionId });
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ error: 'Failed to create session' });
  }
});

// Cleanup old sessions (every hour)
if (pool) {
  setInterval(async () => {
    try {
      await pool.query('DELETE FROM sessions WHERE expires_at < NOW()');
    } catch (error) {
      console.error('Error cleaning up sessions:', error);
    }
  }, 60 * 60 * 1000);
}

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
  if (!pool) {
    console.log('⚠️  Running without database - API endpoints will return 503');
  }
});
