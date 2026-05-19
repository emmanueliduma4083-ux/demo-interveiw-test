require('dotenv').config();

const config = {
  // Server
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Database
  DB: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ecommerce_chat',
    poolSize: process.env.DB_POOL_SIZE || 10,
  },
  
  // JWT
  JWT: {
    secret: process.env.JWT_SECRET || 'your_secret_key',
    expiry: process.env.JWT_EXPIRY || '7d',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'your_refresh_secret',
    refreshExpiry: process.env.JWT_REFRESH_EXPIRY || '30d',
  },
  
  // Security
  BCRYPT_ROUNDS: parseInt(process.env.BCRYPT_ROUNDS) || 10,
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:8000',
  ALLOW_ORIGINS: (process.env.ALLOW_ORIGINS || 'http://localhost:8000').split(','),
  
  // WebSocket
  WS_PORT: process.env.WS_PORT || 3000,
  
  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
};

module.exports = config;
