const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const WebSocket = require('ws');
const http = require('http');
require('dotenv').config();

const db = require('./config/database');
const { initializeWebSocket } = require('./websocket/websocketHandler');
const authRoutes = require('./routes/auth');
const conversationRoutes = require('./routes/conversations');
const messageRoutes = require('./routes/messages');
const userRoutes = require('./routes/users');
const errorHandler = require('./middleware/errorHandler');
const { logger } = require('./utils/logger');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// ==================== MIDDLEWARE ====================
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:8000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==================== LOGGING ====================
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// ==================== HEALTH CHECK ====================
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// ==================== API ROUTES ====================
app.use('/api/auth', authRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

// ==================== 404 HANDLER ====================
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ==================== ERROR HANDLING ====================
app.use(errorHandler);

// ==================== WEBSOCKET SETUP ====================
initializeWebSocket(wss);

// ==================== SERVER STARTUP ====================
const PORT = process.env.PORT || 3000;
server.listen(PORT, async () => {
  try {
    // Test database connection
    const connection = await db.getConnection();
    connection.release();
    logger.info('✓ Database connected successfully');
    logger.info(`✓ Server running on http://localhost:${PORT}`);
    logger.info(`✓ WebSocket server ready on ws://localhost:${PORT}`);
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
});

// ==================== GRACEFUL SHUTDOWN ====================
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    logger.info('Server closed');
    db.end(() => {
      logger.info('Database connection closed');
      process.exit(0);
    });
  });
});

module.exports = { app, server, wss };
