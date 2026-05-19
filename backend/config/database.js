const mysql = require('mysql2/promise');
const { logger } = require('../utils/logger');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ecommerce_chat',
  waitForConnections: true,
  connectionLimit: process.env.DB_POOL_SIZE || 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelayMs: 0,
});

// Handle pool errors
pool.on('error', (error) => {
  logger.error('Database pool error:', error);
  if (error.code === 'PROTOCOL_CONNECTION_LOST') {
    logger.error('Database connection was closed.');
  }
  if (error.code === 'PROTOCOL_ERROR') {
    logger.error('Database protocol error.');
  }
  if (error.code === 'ER_CON_COUNT_ERROR') {
    logger.error('Database has too many connections.');
  }
  if (error.code === 'ER_AUTHENTICATION_PLUGIN_ERROR') {
    logger.error('Database authentication plugin error.');
  }
  if (error.code === 'HANDSHAKE_ERROR') {
    logger.error('Database handshake error.');
  }
});

// Test connection on startup
pool.getConnection()
  .then((connection) => {
    logger.info('✓ Database connection successful');
    connection.release();
  })
  .catch((error) => {
    logger.error('✗ Database connection failed:', error.message);
  });

module.exports = pool;
