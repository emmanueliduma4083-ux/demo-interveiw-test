# eCommerce Real-Time Chat System

A robust, scalable real-time chat system designed for eCommerce platforms, enabling authenticated users to communicate with customer support agents, designers, and merchants.

## 📋 Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Usage](#usage)
- [Database Schema](#database-schema)
- [Security](#security)
- [Contributing](#contributing)

## ✨ Features

### Core Features
- **Real-Time Messaging**: WebSocket-based instant messaging
- **User Authentication**: Secure JWT-based authentication
- **Role-Based Access Control (RBAC)**: Support for Customer, Support Agent, Designer, and Merchant roles
- **Conversation Management**: Create and manage multiple conversations
- **Message History**: Persistent message storage with retrieval
- **Typing Indicators**: Show when users are typing
- **Read Receipts**: Track message read status
- **User Presence**: Real-time online/offline status
- **File Sharing**: Support for document and image sharing (future feature)

### Admin Features
- User management and role assignment
- Conversation monitoring
- Analytics and reporting
- Agent performance tracking

## 🏗️ Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Client (Vanilla JS)                      │
│                   - WebSocket Connection                    │
│                   - Message UI/UX                           │
└──────────────────────────┬──────────────────────────────────┘
                           │
                    WebSocket Protocol
                           │
┌──────────────────────────▼──────────────────────────────────┐
│              Node.js Express Server                         │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  REST API Routes (Authentication, User Mgmt)      │   │
│  │  - POST /auth/register                             │   │
│  │  - POST /auth/login                                │   │
│  │  - POST /conversations                             │   │
│  │  - GET /conversations/:id/messages                 │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  WebSocket Handler (Real-Time Communication)      │   │
│  │  - Message broadcasting                            │   │
│  │  - Presence management                             │   │
│  │  - Typing indicators                               │   │
│  └─────────────────────────────────────────────────────┘   │
└──────────────────────────┬──────────────────────────────────┘
                           │
                      MySQL Protocol
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                   MySQL Database                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │     Users    │  │ Conversations│  │   Messages   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### Communication Flow

1. **User Authentication**: Users log in via REST API, receive JWT token
2. **WebSocket Connection**: Client connects to WebSocket server with auth token
3. **Message Sending**: Client sends message via WebSocket
4. **Server Processing**: Server validates, processes, and broadcasts
5. **Database Persistence**: Message stored in MySQL
6. **Client Update**: All connected clients receive real-time update

## 💻 Tech Stack

| Component | Technology | Version |
|-----------|-----------|----------|
| **Backend** | Node.js | 18+ |
| **Web Framework** | Express.js | 4.x |
| **Real-Time** | WebSocket (ws) | 8.x |
| **Database** | MySQL | 8.0+ |
| **ORM** | mysql2 | 3.x |
| **Authentication** | JWT (jsonwebtoken) | 9.x |
| **Password Hashing** | bcryptjs | 2.x |
| **Frontend** | Vanilla JavaScript | ES6+ |
| **Environment** | dotenv | 16.x |

## 📁 Project Structure

```
demo-interveiw-test/
├── backend/
│   ├── config/
│   │   ├── database.js         # MySQL connection pool
│   │   └── env.js              # Environment variables
│   ├── controllers/
│   │   ├── authController.js   # Authentication logic
│   │   ├── userController.js   # User management
│   │   ├── conversationController.js  # Conversation logic
│   │   └── messageController.js       # Message operations
│   ├── middleware/
│   │   ├── authMiddleware.js   # JWT verification
│   │   └── errorHandler.js     # Error handling
│   ├── models/
│   │   ├── User.js
│   │   ├── Conversation.js
│   │   └── Message.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── conversations.js
│   │   └── messages.js
│   ├── websocket/
│   │   ├── websocketHandler.js # WebSocket event handling
│   │   ├── connectionManager.js # Connection management
│   │   └── messageQueue.js     # Message queue processing
│   ├── utils/
│   │   ├── validators.js       # Input validation
│   │   ├── helpers.js          # Helper functions
│   │   └── logger.js           # Logging utility
│   ├── app.js                  # Express app configuration
│   ├── server.js               # Server entry point
│   ├── package.json
│   ├── .env.example
│   └── .env                    # (Add to .gitignore)
├── frontend/
│   ├── assets/
│   │   ├── css/
│   │   │   └── styles.css
│   │   └── js/
│   │       ├── websocket-client.js
│   │       ├── auth.js
│   │       ├── ui.js
│   │       └── utils.js
│   ├── pages/
│   │   ├── login.html
│   │   ├── register.html
│   │   ├── chat.html
│   │   └── conversations.html
│   └── index.html
├── database/
│   ├── schema.sql              # Database schema
│   ├── seed.sql                # Sample data
│   └── migrations/
│       └── initial_setup.sql
├── docs/
│   ├── API.md                  # API documentation
│   ├── WEBSOCKET_PROTOCOL.md   # WebSocket protocol spec
│   ├── DATABASE_SCHEMA.md      # Database details
│   ├── SETUP_GUIDE.md          # Setup instructions
│   └── ARCHITECTURE.md         # Architecture details
├── .gitignore
├── .env.example
└── README.md
```

## 🚀 Installation

### Prerequisites
- Node.js 18+
- MySQL 8.0+
- npm or yarn

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/emmanueliduma4083-ux/demo-interveiw-test.git
   cd demo-interveiw-test/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your MySQL credentials:
   ```
   PORT=3000
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=ecommerce_chat
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

4. **Set up the database**
   ```bash
   mysql -u root -p < ../database/schema.sql
   ```

5. **Start the server**
   ```bash
   npm start
   ```
   Server runs on `http://localhost:3000`

### Frontend Setup

1. **Navigate to frontend folder**
   ```bash
   cd ../frontend
   ```

2. **Open in browser**
   ```bash
   # Simple HTTP server (Python 3)
   python -m http.server 8000
   
   # Or use Live Server extension in VS Code
   ```

3. **Access the application**
   - Navigate to `http://localhost:8000`

## ⚙️ Configuration

### Environment Variables (.env)

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_NAME=ecommerce_chat
DB_POOL_SIZE=10

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRY=7d

# WebSocket Configuration
WS_PORT=3000
ALLOW_ORIGINS=http://localhost:8000,https://yourdomain.com

# Security
CORS_ORIGIN=http://localhost:8000
```

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe",
  "role": "customer" // customer, support_agent, designer, merchant
}

Response: 201 Created
{
  "success": true,
  "message": "User registered successfully",
  "user": { ... },
  "token": "jwt_token_here"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}

Response: 200 OK
{
  "success": true,
  "token": "jwt_token_here",
  "user": { ... }
}
```

### Conversation Endpoints

#### Create Conversation
```http
POST /api/conversations
Authorization: Bearer {token}
Content-Type: application/json

{
  "participants": ["agent_id_1", "agent_id_2"],
  "type": "support" // support, sales, design
}

Response: 201 Created
{
  "success": true,
  "conversation": { ... }
}
```

#### Get Conversations
```http
GET /api/conversations
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "conversations": [ ... ]
}
```

#### Get Messages in Conversation
```http
GET /api/conversations/{conversationId}/messages?page=1&limit=20
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "messages": [ ... ],
  "pagination": { ... }
}
```

## 🔌 WebSocket Protocol

### Connection
```javascript
const ws = new WebSocket('ws://localhost:3000');
ws.send(JSON.stringify({
  type: 'authenticate',
  token: 'jwt_token_here'
}));
```

### Event Types

#### Send Message
```json
{
  "type": "message",
  "conversationId": "conv_123",
  "content": "Hello, how can I help?",
  "timestamp": 1234567890
}
```

#### Typing Indicator
```json
{
  "type": "typing",
  "conversationId": "conv_123",
  "userId": "user_123"
}
```

#### Stop Typing
```json
{
  "type": "stop_typing",
  "conversationId": "conv_123",
  "userId": "user_123"
}
```

#### Read Receipt
```json
{
  "type": "read_receipt",
  "messageId": "msg_123",
  "conversationId": "conv_123"
}
```

#### User Presence
```json
{
  "type": "presence",
  "status": "online|away|offline"
}
```

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role ENUM('customer', 'support_agent', 'designer', 'merchant') DEFAULT 'customer',
  avatar_url VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Conversations Table
```sql
CREATE TABLE conversations (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255),
  type ENUM('support', 'sales', 'design') NOT NULL,
  created_by VARCHAR(36) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (created_by) REFERENCES users(id)
);
```

### Messages Table
```sql
CREATE TABLE messages (
  id VARCHAR(36) PRIMARY KEY,
  conversation_id VARCHAR(36) NOT NULL,
  sender_id VARCHAR(36) NOT NULL,
  content LONGTEXT NOT NULL,
  message_type ENUM('text', 'file', 'image') DEFAULT 'text',
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (conversation_id) REFERENCES conversations(id),
  FOREIGN KEY (sender_id) REFERENCES users(id),
  INDEX idx_conversation (conversation_id),
  INDEX idx_sender (sender_id),
  INDEX idx_created (created_at)
);
```

## 🔒 Security

### Authentication & Authorization
- JWT token-based authentication
- Password hashing with bcryptjs (10 salt rounds)
- Role-based access control (RBAC)
- Token expiration and refresh mechanism

### Data Protection
- SQL injection prevention via parameterized queries
- XSS protection via input sanitization
- CORS configuration for origin validation
- HTTPS enforcement in production

### WebSocket Security
- JWT validation on connection
- Message origin verification
- Rate limiting per user
- Connection timeout handling

### Best Practices
- Never commit `.env` file
- Use environment variables for sensitive data
- Implement request rate limiting
- Add request/response logging
- Use HTTPS in production
- Validate all user inputs

## 📖 Usage Example

### Frontend JavaScript
```javascript
// Initialize WebSocket connection
const chatClient = new ChatClient('ws://localhost:3000', token);

// Send message
chatClient.sendMessage(conversationId, 'Hello!');

// Listen for messages
chatClient.on('message', (msg) => {
  console.log('New message:', msg);
});

// Show typing indicator
chatClient.sendTyping(conversationId);

// Mark message as read
chatClient.markAsRead(messageId);
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Last Updated**: May 2026
**Version**: 1.0.0-beta