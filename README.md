<div align="center">
  <h1>🚀 Node.js Express REST API</h1>
  <p>A modern, feature-rich RESTful API built with Node.js, Express, and PostgreSQL with Prisma ORM</p>
  <p>
    <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-v18+-green.svg" alt="Node.js"></a>
    <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express-v5.2.1-blue.svg" alt="Express"></a>
    <a href="https://www.postgresql.org/"><img src="https://img.shields.io/badge/PostgreSQL-v15-blue.svg" alt="PostgreSQL"></a>
    <a href="https://www.prisma.io/"><img src="https://img.shields.io/badge/Prisma-v7.4.0-blue.svg" alt="Prisma"></a>
    <a href="https://www.docker.com/"><img src="https://img.shields.io/badge/Docker-Ready-blue.svg" alt="Docker"></a>
    <a href="https://opensource.org/licenses/ISC"><img src="https://img.shields.io/badge/License-ISC-orange.svg" alt="License"></a>
  </p>
</div>

## ✨ Features

- **📡 RESTful API Design**: Implements standard HTTP methods (GET, POST, PUT, PATCH, DELETE) for managing posts and API keys
- **🗄️ PostgreSQL Database**: Uses PostgreSQL for data persistence with connection pooling
- **🔒 Environment Configuration**: Supports .env file for secure configuration
- **🐳 Docker Support**: Containerized deployment with Docker and Docker Compose
- **🔄 Auto-Reload Development**: Nodemon integration for automatic server restart
- **🎯 Error Handling**: Comprehensive error handling with proper HTTP status codes
- **✅ Data Validation**: Advanced request body validation and duplicate detection
- **⚡ Fast & Lightweight**: Minimal dependencies for optimal performance
- **📄 Prisma ORM**: Modern database access with Prisma ORM
- **🔐 API Key Authentication**: Secure API access with API key authentication middleware
- **🔒 Security Features**: Helmet for security, bcryptjs for password hashing, JWT for authentication
- **🌐 CORS Support**: Cross-Origin Resource Sharing enabled
- **📊 Advanced Queries**: Pagination, sorting, and searching capabilities
- **🏗️ MVC Architecture**: Organized into controllers, routes, middleware, and services

## 📁 Project Structure

```
├── src/
│   ├── app.ts                    # Express server entry point 🏠
│   ├── config/
│   │   └── database.ts           # Prisma client initialization 🗄️
│   ├── controllers/
│   │   ├── post.controller.ts    # Post endpoints handler 🎯
│   │   └── apiKey.controller.ts  # API key endpoints handler 🔑
│   ├── routes/
│   │   ├── post.routes.ts        # Post API routes 🛣️
│   │   └── apiKey.routes.ts      # API key API routes 🔑
│   ├── services/
│   │   ├── post.service.ts       # Post business logic and database operations 📦
│   │   └── apiKey.service.ts     # API key business logic and validation 🔑
│   ├── repository/
│   │   └── apikey.repository.ts  # API key data access layer 🗄️
│   ├── middleware/
│   │   └── apiKey.middleware.ts  # API key authentication middleware 🛡️
│   ├── helpers/
│   │   └── generate.apikey.ts    # API key generation utility 🔑
│   └── generated/               # Prisma generated types 🔧
├── prisma/
│   └── schema.prisma            # Prisma schema definition 📋
├── .env.example                 # Example environment variables 📝
├── .gitignore                   # Git ignore configuration 🚫
├── docker-compose.yml           # Docker Compose configuration 🐳
├── Dockerfile                   # Docker image definition 🐋
├── package.json                 # Project dependencies and scripts 📦
├── tsconfig.json                # TypeScript configuration ⚙️
└── package-lock.json            # Dependency lock file 🔒
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher) 🔹
- **PostgreSQL** (v12 or higher) 🐘
- **Docker and Docker Compose** (optional, for containerized setup) 🐳

### Local Development

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
   PORT=3000
   DATABASE_URL="postgresql://postgres:your_password@localhost:5432/rest_api_db?schema=public"
   ```

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
