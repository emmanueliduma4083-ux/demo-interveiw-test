const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

// Create connection pool
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

// Test connection
pool.getConnection().then(conn => {
  console.log('✅ Database connected successfully');
  conn.release();
}).catch(err => {
  console.error('❌ Database connection failed:', err.message);
});

module.exports = pool;
