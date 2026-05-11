<div align="center">
  <h1>🚀 Node.js Express REST API</h1>
  <p>A modern, production-ready RESTful API built with Node.js, Express, and PostgreSQL with Prisma ORM</p>
  <p>
    <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-v18+-green.svg" alt="Node.js"></a>
    <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express-v5.2.1-blue.svg" alt="Express"></a>
    <a href="https://www.postgresql.org/"><img src="https://img.shields.io/badge/PostgreSQL-v15-blue.svg" alt="PostgreSQL"></a>
    <a href="https://www.prisma.io/"><img src="https://img.shields.io/badge/Prisma-v6.19.2-blue.svg" alt="Prisma"></a>
    <a href="https://www.docker.com/"><img src="https://img.shields.io/badge/Docker-Ready-blue.svg" alt="Docker"></a>
    <a href="https://opensource.org/licenses/ISC"><img src="https://img.shields.io/badge/License-ISC-orange.svg" alt="License"></a>
  </p>
</div>

## ✨ Features

### Core Features

- **📡 RESTful API Design**: Implements standard HTTP methods (GET, POST, PUT, PATCH, DELETE) for managing resources
- **🗄️ PostgreSQL Database**: Uses PostgreSQL for data persistence with connection pooling
- **🌐 API Versioning**: Endpoints use `/api/v1/` prefix for better version management
- **🔒 Environment Configuration**: Supports .env file for secure configuration management
- **🐳 Docker Support**: Containerized deployment with Docker and Docker Compose
- **⚡ Redis Caching**: Read-heavy endpoints are accelerated using Redis cache for posts and users
- **🔄 Auto-Reload Development**: Nodemon integration for automatic server restart
- **🎯 Comprehensive Error Handling**: Proper HTTP status codes with environment-aware error messages
- **✅ Advanced Data Validation**: Input validation with Zod and duplicate detection
- **⚡ Fast & Lightweight**: Minimal dependencies for optimal performance
- **📄 Prisma ORM**: Modern database access with Prisma ORM

### Security Features (⭐ NEW)

- **🔐 Helmet Security Headers**: Protection against clickjacking, MIME-type sniffing, and other attacks
- **🔑 API Key Authentication**: Secure API access with hashed API keys stored in database
- **🔒 JWT Authentication**: Secure user sessions with configurable token expiration
- **🛡️ Rate Limiting**: Protection against brute force attacks on sensitive endpoints
- **🔐 Password Hashing**: Strong password hashing with bcryptjs (10-round salting)
- **🔐 API Key Hashing**: API keys are hashed with SHA-256 before storage for enhanced security
- **✅ Strong Password Policy**: Minimum 12 characters, uppercase, lowercase, numbers, and special characters
- **✅ Email Validation**: Comprehensive email format validation
- **🌐 CORS Protection**: Configurable Cross-Origin Resource Sharing
- **⚠️ Authorization Checks**: User ownership verification to prevent unauthorized access
- **📊 Audit Logging**: Comprehensive logging of all operations with Winston
- **🔍 Sensitive Error Handling**: Generic error messages in production, detailed in development
- **📝 Request/Response Logging**: Automatic logging of all API requests with status codes and duration
- **🔒 Request Size Limits**: Protection against DoS attacks via large payloads
- **🛑 Graceful Shutdown**: Proper cleanup of database connections on server shutdown

## 📁 Project Structure

```
├── src/
│   ├── app.ts                          # Express server entry point with security middleware 🏠
│   ├── config/
│   │   └── database.ts                 # Prisma client initialization 🗄️
│   ├── controllers/
│   │   ├── post.controller.ts          # Post endpoints handler 🎯
│   │   ├── apiKey.controller.ts        # API key endpoints handler 🔑
│   │   ├── auth.controller.ts          # Authentication endpoints 🔐
│   │   └── user.controller.ts          # User management endpoints 👤
│   ├── routes/
│   │   ├── post.routes.ts              # Post API routes 🛣️
│   │   ├── apiKey.routes.ts            # API key API routes 🔑
│   │   ├── auth.routes.ts              # Auth routes 🔐
│   │   └── user.routes.ts              # User routes 👤
│   ├── services/
│   │   ├── post.service.ts             # Post business logic and database operations 📦
│   │   ├── apiKey.service.ts           # API key business logic with hashing 🔑
│   │   ├── auth.service.ts             # Authentication service with JWT 🔐
│   │   └── user.service.ts             # User service with validation and password hashing 👤
│   ├── repository/
│   │   ├── apikey.repository.ts        # API key data access layer 🗄️
│   │   ├── auth.repository.ts          # Auth data access layer 🔐
│   │   ├── post.repository.ts          # Post data access layer 📦
│   │   └── user.repository.ts          # User data access layer 👤
│   ├── middleware/
│   │   ├── apiKey.middleware.ts        # API key authentication middleware with hashing verification 🛡️
│   │   ├── auth.middleware.ts          # JWT authentication middleware 🔐
│   │   └── auth.authorization.ts       # User ownership and authorization checks 🔐
│   ├── utils/
│   │   ├── logger.ts                   # Winston logging utility ✍️
│   │   ├── validation.ts               # Zod-based validation schemas 📋
│   │   ├── crypto.ts                   # Cryptographic utilities for API key hashing 🔐
│   │   ├── env.validator.ts            # Environment variable validation 🔍
│   │   └── generate.apikey.ts          # API key generation utility 🔑
│   ├── types/
│   │   └── express/
│   │       └── index.d.ts              # Express type definitions 📝
│   └── generated/                      # Prisma generated types 🔧
├── prisma/
│   └── schema.prisma                   # Prisma schema with updated API key model 📋
│   └── migrations/                     # Database migrations 🗄️
├── logs/                               # Application logs (created at runtime) 📝
├── .env.example                        # Example environment variables 📝
├── .gitignore                          # Git ignore configuration 🚫
├── docker-compose.yml                  # Docker Compose configuration 🐳
├── Dockerfile                          # Docker image definition 🐋
├── package.json                        # Project dependencies and scripts 📦
├── tsconfig.json                       # TypeScript configuration ⚙️
└── README.md                           # This file 📖
```

## 🔐 Security Improvements Implemented

### Authentication & Authorization

- ✅ **JWT Authentication**: Secure token-based user authentication with configurable expiration
- ✅ **API Key Authentication**: Hashed API keys for machine-to-machine communication
- ✅ **User Ownership Verification**: Authorization middleware prevents unauthorized access to user resources
- ✅ **Strict Password Requirements**: Minimum 12 characters with uppercase, lowercase, number, and special character

### API Security

- ✅ **Helmet.js Integration**: Comprehensive HTTP security headers
- ✅ **Rate Limiting**:
  - 100 requests per 15 minutes for general endpoints
  - 5 requests per 15 minutes for authentication endpoints
- ✅ **CORS Protection**: Configurable allowed origins to prevent cross-origin attacks
- ✅ **Request Size Limits**: Maximum 10KB payload to prevent DoS attacks
- ✅ **API Versioning**: `/api/v1/` prefix for future compatibility

### Data Security

- ✅ **API Key Hashing**: Keys are hashed with SHA-256 before storage
- ✅ **Password Hashing**: bcryptjs with 10-round salting
- ✅ **Email Validation**: RFC 5322 compliant email validation
- ✅ **Sensitive Data Filtering**: Passwords never returned in API responses

### Operational Security

- ✅ **Environment Validation**: Required environment variables checked at startup
- ✅ **Secure Error Handling**: Production environment shows generic errors, development shows full details
- ✅ **Audit Logging**: All operations logged with Winston for security analysis
- ✅ **Request Logging**: Every request logged with HTTP method, path, status code, duration, and IP
- ✅ **Graceful Shutdown**: Proper database connection cleanup on termination
- ✅ **Health Check Endpoint**: `/health` endpoint for monitoring and load balancers

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher) 🔹
- **PostgreSQL** (v12 or higher) 🐘
- **Docker and Docker Compose** (optional, for containerized setup) 🐳

### Local Development Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd js-api
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create a .env file** from the example:

   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** in `.env`:

   ```env
   # Database Configuration
   DATABASE_URL="postgresql://postgres:password@localhost:5432/js_api_db?schema=public"

   # Server Configuration
   PORT=3000
   NODE_ENV=development

   # JWT Configuration (MUST be at least 32 characters)
   JWT_SECRET=your-super-secure-secret-key-must-be-at-least-32-characters-long
   JWT_EXPIRATION=24h

   # CORS Configuration
   ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

   # Redis Configuration
   REDIS_URL=redis://localhost:6379

   # Logging
   LOG_LEVEL=info
   ```

5. **Setup the database**:

   ```bash
   # Create the database and run migrations
   npx prisma migrate dev --name init

   # Generate Prisma client
   npx prisma generate
   ```

6. **Start the development server**:

   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:3000`

### Docker Setup

1. **Build and start with Docker Compose**:

   ```bash
   docker-compose up --build
   ```

   This starts both PostgreSQL and Redis cache services alongside the API.

2. **Access the API**:

   The API will be available at `http://localhost:3000`

3. **View logs**:

   ```bash
   docker-compose logs -f api
   ```

4. **Stop containers**:

   ```bash
   docker-compose down
   ```

## 📚 API Endpoints

All endpoints use the `/api/v1/` prefix.

### Authentication

- `POST /api/v1/auth/login` - User login (returns JWT token)

### User Management

- `POST /api/v1/users` - Register a new user
- `GET /api/v1/users` - Get all users (requires JWT)
- `GET /api/v1/users/:id` - Get a specific user (requires JWT)
- `PUT /api/v1/users/:id` - Update a user (requires JWT + user ownership)
- `DELETE /api/v1/users/:id` - Delete a user (requires JWT + user ownership)

### Posts

- `GET /api/v1/posts` - Get all posts (requires API key)
- `GET /api/v1/posts/:id` - Get a specific post (requires API key)
- `POST /api/v1/posts` - Create a new post (requires API key + JWT)
- `PUT /api/v1/posts/:id` - Update a post (requires API key + JWT)
- `PATCH /api/v1/posts/:id` - Partially update a post (requires API key + JWT)
- `DELETE /api/v1/posts/:id` - Delete a post (requires API key + JWT)

### API Keys

- `POST /api/v1/api-keys` - Create a new API key (requires JWT)
- `GET /api/v1/api-keys` - Get all API keys (requires API key)
- `GET /api/v1/api-keys/:id` - Get a specific API key (requires API key)
- `PUT /api/v1/api-keys/:id` - Update an API key (requires API key)
- `DELETE /api/v1/api-keys/:id` - Delete an API key (requires API key)

### Health Check

- `GET /health` - Health check endpoint (no authentication required)

## 🔑 Authentication

### JWT Authentication

1. **Register a user**:

   ```bash
   curl -X POST http://localhost:3000/api/v1/users \
     -H "Content-Type: application/json" \
     -d '{
       "email": "user@example.com",
       "password": "SecurePass123!",
       "name": "John Doe"
     }'
   ```

2. **Login to get JWT token**:

   ```bash
   curl -X POST http://localhost:3000/api/v1/auth/login \
     -H "Content-Type: application/json" \
     -d '{
       "email": "user@example.com",
       "password": "SecurePass123!"
     }'
   ```

3. **Use JWT in requests**:

   ```bash
   curl -X GET http://localhost:3000/api/v1/users \
     -H "Authorization: Bearer <your_jwt_token>"
   ```

### API Key Authentication

1. **Create an API key** (requires JWT):

   ```bash
   curl -X POST http://localhost:3000/api/v1/api-keys \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <your_jwt_token>" \
     -d '{
       "name": "My API Key"
     }'
   ```

   **Important**: Store the returned API key securely. It will not be shown again!

2. **Use API key in requests**:

   ```bash
   curl -X GET http://localhost:3000/api/v1/posts \
     -H "x-api-key: <your_api_key>"
   ```

## 📝 Password Requirements

Passwords must meet the following criteria:

- ✅ Minimum 12 characters
- ✅ At least one uppercase letter (A-Z)
- ✅ At least one lowercase letter (a-z)
- ✅ At least one number (0-9)
- ✅ At least one special character (@$!%\*?&)

Example: `MyPassword123!`

## 📊 Logging

The application uses Winston for structured logging. Logs are stored in the `logs/` directory:

- **logs/combined.log** - All application logs
- **logs/error.log** - Error logs only

Log level can be configured via the `LOG_LEVEL` environment variable (default: `info`).

### Log Levels

- `error` - Error messages
- `warn` - Warning messages
- `info` - Information messages
- `debug` - Debug messages

## 🗄️ Database Migrations

### Create a new migration after schema changes:

```bash
npx prisma migrate dev --name <migration_name>
```

### Apply pending migrations:

```bash
npx prisma migrate deploy
```

### View migration status:

```bash
npx prisma migrate status
```

### Reset the database (development only):

```bash
npx prisma migrate reset
```

## ⚙️ Configuration

### Environment Variables

| Variable          | Required | Default               | Description                            |
| ----------------- | -------- | --------------------- | -------------------------------------- |
| `DATABASE_URL`    | Yes      | -                     | PostgreSQL connection string           |
| `PORT`            | No       | 3000                  | Server port                            |
| `NODE_ENV`        | Yes      | -                     | Environment (development/production)   |
| `JWT_SECRET`      | Yes      | -                     | JWT signing secret (min 32 characters) |
| `JWT_EXPIRATION`  | No       | 24h                   | JWT token expiration time              |
| `ALLOWED_ORIGINS` | No       | http://localhost:3000 | CORS allowed origins (comma-separated) |
| `LOG_LEVEL`       | No       | info                  | Logging level                          |

## 🐛 Troubleshooting

### JWT_SECRET is too weak

**Error**: `JWT_SECRET must be at least 32 characters long`

**Solution**: Generate a strong secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Database connection failed

**Error**: `Error connecting to database`

**Solution**:

- Verify PostgreSQL is running
- Check `DATABASE_URL` is correct
- Ensure database exists: `createdb js_api_db`

### Port already in use

**Error**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solution**:

```bash
# Change port in .env
PORT=3001

# Or kill the process using port 3000 (Linux/Mac)
lsof -ti:3000 | xargs kill -9
```

### Prisma client not found

**Error**: `Cannot find module @prisma/client`

**Solution**:

```bash
npx prisma generate
npm install
```

## 📦 Dependencies

### Production Dependencies

- `@prisma/client` - Database ORM
- `bcryptjs` - Password hashing
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variable management
- `express` - Web framework
- `express-rate-limit` - Rate limiting middleware
- `helmet` - HTTP security headers
- `jsonwebtoken` - JWT token management
- `winston` - Logging
- `zod` - Schema validation

### Development Dependencies

- `@types/*` - TypeScript type definitions
- `nodemon` - Auto-reload development server
- `ts-node` - TypeScript execution
- `typescript` - TypeScript compiler

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📋 Development Workflow

### Build the project

```bash
npm run build
```

### Run in production

```bash
npm start
```

### Generate Prisma types

```bash
npm run prisma:generate
```

## 🔐 Security Best Practices

1. **Never commit `.env` files** - Use `.env.example` template
2. **Rotate API keys regularly** - Treat them like passwords
3. **Use HTTPS in production** - Use a reverse proxy (Nginx, Apache)
4. **Monitor logs** - Set up log aggregation and alerting
5. **Keep dependencies updated** - Run `npm audit` regularly
6. **Use strong secrets** - Generate random 32+ character secrets
7. **Implement CORS carefully** - Only allow trusted origins
8. **Enable HTTPS/TLS** - Encrypt data in transit

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 🙋 Support

For issues and questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Check existing GitHub issues
3. Create a new GitHub issue with detailed information

## 🎯 Production Deployment Checklist

- ✅ `NODE_ENV` set to `production`
- ✅ `JWT_SECRET` set to a strong random value (32+ characters)
- ✅ `DATABASE_URL` points to production database
- ✅ HTTPS/TLS enabled
- ✅ CORS origins restricted to your domain
- ✅ Rate limiting appropriate for your scale
- ✅ Monitoring and alerting configured
- ✅ Log aggregation configured
- ✅ Regular backups enabled
- ✅ Security headers verified
- ✅ All dependencies updated and audited
- ✅ API keys rotated
- ✅ Database backups tested

5. **Initialize Prisma**:
   - Generate the Prisma client:
     ```bash
     npm run prisma:generate
     ```
   - Run migrations to create the database tables:
     ```bash
     npx prisma migrate dev --name init
     ```

6. **Start the server**:

   ```bash
   npm run dev  # Development mode with nodemon 🔄
   # or
   npm start    # Production mode 🚀
   ```

7. **Access the API**:
   - Base URL: `http://localhost:3000`
   - Health check: `curl http://localhost:3000`

### Docker Setup

1. **Build and start the containers**:

   ```bash
   docker-compose up -d
   ```

2. **Access the API**:
   - API: `http://localhost:3000`
   - Database: `localhost:5432` (credentials from docker-compose.yml)

3. **View logs**:
   ```bash
   docker-compose logs -f
   ```

## 📖 API Documentation

### Get All Posts

```http
GET /posts
```

Returns all posts from the database.

**Response**:

```json
{
  "data": [
    {
      "id": 1,
      "title": "First Post",
      "content": "This is the content of the first post"
    },
    {
      "id": 2,
      "title": "Second Post",
      "content": "This is the content of the second post"
    }
  ]
}
```

### Get Post by ID

```http
GET /posts/:id
```

Returns a single post by its ID.

**Parameters**:

- `id` (required): The unique identifier of the post

**Response**:

```json
{
  "data": {
    "id": 1,
    "title": "First Post",
    "content": "This is the content of the first post"
  }
}
```

### Create a New Post

```http
POST /posts
```

Creates a new post with the provided title and content.

**Request Body**:

```json
{
  "title": "New Post",
  "content": "Content of the new post"
}
```

**Response**:

```json
{
  "message": "Post created successfully.",
  "data": {
    "id": 3,
    "title": "New Post",
    "content": "Content of the new post"
  }
}
```

### Update Post (Full Update)

```http
PUT /posts/:id
```

Updates an existing post with the provided title and content. Requires both fields to be present.

**Parameters**:

- `id` (required): The unique identifier of the post

**Request Body**:

```json
{
  "title": "Updated Post Title",
  "content": "Updated content of the post"
}
```

**Response**:

```json
{
  "message": "Post updated successfully.",
  "data": {
    "id": 1,
    "title": "Updated Post Title",
    "content": "Updated content of the post"
  }
}
```

### Update Post (Partial Update)

```http
PATCH /posts/:id
```

Updates an existing post with the provided fields. At least one field is required.

**Parameters**:

- `id` (required): The unique identifier of the post

**Request Body** (at least one field required):

```json
{
  "title": "Updated Post Title"
}
```

**Response**:

```json
{
  "message": "Post updated successfully.",
  "data": {
    "id": 1,
    "title": "Updated Post Title",
    "content": "This is the content of the first post"
  }
}
```

### Delete Post

```http
DELETE /posts/:id
```

Deletes a post by its ID.

**Parameters**:

- `id` (required): The unique identifier of the post

**Response**:

```json
{
  "message": "Post deleted successfully."
}
```

---

## 🔑 API Key Management

### Create a New API Key

```http
POST /api-keys
```

Creates a new API key for authentication.

**Request Body**:

```json
{
  "name": "My API Key"
}
```

**Response**:

```json
{
  "message": "API key created successfully",
  "data": {
    "id": "uuid",
    "key": "a1b2c3d4e5f6...",
    "name": "My API Key",
    "isActive": true,
    "createdAt": "2026-02-19T12:00:00.000Z"
  }
}
```

### Get All API Keys

```http
GET /api-keys
```

Returns all API keys associated with the account. Requires authentication.

**Headers**:

- `x-api-key`: Your API key

**Response**:

```json
{
  "message": "API keys retrieved successfully",
  "data": [
    {
      "id": "uuid1",
      "name": "My API Key",
      "isActive": true,
      "createdAt": "2026-02-19T12:00:00.000Z"
    },
    {
      "id": "uuid2",
      "name": "Test Key",
      "isActive": false,
      "createdAt": "2026-02-18T10:30:00.000Z"
    }
  ]
}
```

### Get a Specific API Key

```http
GET /api-keys/:id
```

Returns a specific API key by its ID. Requires authentication.

**Parameters**:

- `id` (required): The unique identifier of the API key

**Headers**:

- `x-api-key`: Your API key

**Response**:

```json
{
  "message": "API key retrieved successfully",
  "data": {
    "id": "uuid1",
    "name": "My API Key",
    "isActive": true,
    "createdAt": "2026-02-19T12:00:00.000Z"
  }
}
```

### Update an API Key

```http
PUT /api-keys/:id
```

Updates an existing API key. Requires authentication.

**Parameters**:

- `id` (required): The unique identifier of the API key

**Headers**:

- `x-api-key`: Your API key

**Request Body** (at least one field required):

```json
{
  "name": "Updated API Key Name",
  "isActive": false
}
```

**Response**:

```json
{
  "message": "API key updated successfully",
  "data": {
    "id": "uuid1",
    "name": "Updated API Key Name",
    "isActive": false,
    "createdAt": "2026-02-19T12:00:00.000Z"
  }
}
```

### Delete an API Key

```http
DELETE /api-keys/:id
```

Deletes an API key by its ID. Requires authentication.

**Parameters**:

- `id` (required): The unique identifier of the API key

**Headers**:

- `x-api-key`: Your API key

**Response**:

```json
{
  "message": "API key deleted successfully"
}
```

---

## 🔐 API Authentication

All API key management endpoints require authentication using an API key. To authenticate your requests:

1. Include an `x-api-key` header with your API key
2. Example using curl:

```bash
curl -X GET "http://localhost:3000/api-keys" \
  -H "x-api-key: your-api-key-here"
```

API keys are generated using `POST /api-keys` endpoint, which doesn't require authentication.

## 🗄️ Database Schema

The application uses Prisma ORM with two main models: `Post` for content management and `ApiKey` for authentication. The schema is defined in `prisma/schema.prisma`:

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
  output   = "../src/generated/prisma"
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String   @unique
  content   String
  authorId  Int?
  author    User?    @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime? @updatedAt

  @@map("posts")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  posts     Post[]

  @@map("users")
}

model ApiKey {
  id        String   @id @default(uuid())
  key       String   @unique
  name      String
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())

  @@map("api_keys")
}
```

## 🛠️ Technologies Used

| Technology       | Version | Description                           |
| ---------------- | ------- | ------------------------------------- |
| **Node.js**      | v18+    | JavaScript runtime environment        |
| **TypeScript**   | v5.6.3  | Static type checking for JavaScript   |
| **Express**      | v5.2.1  | Web application framework for Node.js |
| **PostgreSQL**   | v15     | Relational database management system |
| **Prisma**       | v6.19.2 | Modern ORM for TypeScript/JavaScript  |
| **dotenv**       | v17.2.4 | Environment variable management       |
| **nodemon**      | v3.1.11 | Development server auto-restart       |
| **ts-node**      | v10.9.2 | TypeScript execution for Node.js      |
| **Docker**       | Latest  | Containerization platform             |
| **bcryptjs**     | v3.0.3  | Password hashing library              |
| **jsonwebtoken** | v9.0.3  | JWT token generation and verification |
| **helmet**       | v8.1.0  | Security middleware for Express       |
| **cors**         | v2.8.6  | Cross-Origin Resource Sharing         |

## 📝 Development

### Available Scripts

- `npm run build`: Compiles TypeScript to JavaScript 📦
- `npm start`: Starts the server in production mode (requires build first) 🚀
- `npm run dev`: Starts the server in development mode with nodemon 🔄
- `npm run prisma:generate`: Generates Prisma client types 🔧

### Adding New Endpoints

#### Step 1: Create a Repository (if needed)

Create a new repository file in `src/repository/` to handle direct database operations using Prisma:

```typescript
// src/repository/example.repository.ts
import prisma from "../config/database";

export const findExample = (id: string) => {
  return prisma.example.findUnique({
    where: { id },
  });
};

export const getExamples = () => {
  return prisma.example.findMany();
};

export const createExample = (data: any) => {
  return prisma.example.create({
    data,
  });
};

export const updateExample = (id: string, data: any) => {
  return prisma.example.update({
    where: { id },
    data,
  });
};

export const deleteExample = (id: string) => {
  return prisma.example.delete({
    where: { id },
  });
};
```

#### Step 2: Create a Service (if needed)

Create a new service file in `src/services/` to handle business logic and interact with the repository:

```typescript
// src/services/example.service.ts
import {
  findExample,
  getExamples,
  createExample,
  updateExample,
  deleteExample,
} from "../repository/example.repository";

export const getExampleById = async (id: string) => {
  return findExample(id);
};

export const getAllExamples = async () => {
  return getExamples();
};

export const createNewExample = async (data: any) => {
  return createExample(data);
};

export const updateExampleDetails = async (id: string, data: any) => {
  return updateExample(id, data);
};

export const deleteExampleById = async (id: string) => {
  return deleteExample(id);
};
```

#### Step 2: Create a Controller

Create a new controller file in `src/controllers/` to handle HTTP requests/responses:

```typescript
// src/controllers/example.controller.ts
import { Request, Response } from "express";
import exampleService from "../services/example.service";

class ExampleController {
  async getExamples(req: Request, res: Response) {
    try {
      const examples = await exampleService.getExamples();
      return res.status(200).json({ data: examples });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getExampleById(req: Request, res: Response) {
    try {
      const example = await exampleService.getExampleById(
        parseInt(req.params.id as string),
      );
      if (!example) {
        return res.status(404).json({ error: "Example not found" });
      }
      return res.status(200).json({ data: example });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async createExample(req: Request, res: Response) {
    try {
      const example = await exampleService.createExample(req.body);
      return res.status(201).json({
        message: "Example created successfully",
        data: example,
      });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new ExampleController();
```

#### Step 3: Create Routes

Create a new routes file in `src/routes/` to define API endpoints:

```typescript
// src/routes/example.routes.ts
import express from "express";
import exampleController from "../controllers/example.controller";

const router = express.Router();

router.get("/", exampleController.getExamples);
router.get("/:id", exampleController.getExampleById);
router.post("/", exampleController.createExample);

export default router;
```

#### Step 4: Register Routes in App.ts

Add the new routes to `src/app.ts`:

```typescript
// src/app.ts
import exampleRoutes from "./routes/example.routes";

app.use("/examples", exampleRoutes);
```

#### Step 5: Test the Endpoint

Test your new endpoints using tools like Postman or curl.

## 📄 License

This project is licensed under the **ISC License** - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

If you have any questions or need support, please open an issue or contact the project maintainer.

<div align="center">
  <p>Built with ❤️ using Node.js and Express</p>
</div>
