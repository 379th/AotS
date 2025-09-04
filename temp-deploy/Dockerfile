FROM node:18-alpine

WORKDIR /app

# Install system dependencies
RUN apk add --no-cache curl

# Copy root package files
COPY package*.json ./

# Install root dependencies
RUN npm ci --only=production

# Copy frontend
COPY frontend/ ./frontend/

# Install and build frontend
RUN cd frontend && npm ci --only=production && npm run build

# Copy backend
COPY backend/ ./backend/

# Install backend dependencies
RUN cd backend && npm ci --only=production

# Copy static files to backend
RUN cp -r frontend/dist/* backend/public/ 2>/dev/null || mkdir -p backend/public && cp -r frontend/dist/* backend/public/

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/health || exit 1

# Start the backend
WORKDIR /app/backend
CMD ["npm", "start"]
