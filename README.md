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

- **📡 RESTful API Design**: Implements standard HTTP methods (GET, POST, PUT, PATCH, DELETE) for managing posts
- **🗄️ PostgreSQL Database**: Uses PostgreSQL for data persistence with connection pooling
- **🔒 Environment Configuration**: Supports .env file for secure configuration
- **🐳 Docker Support**: Containerized deployment with Docker and Docker Compose
- **🔄 Auto-Reload Development**: Nodemon integration for automatic server restart
- **🎯 Error Handling**: Comprehensive error handling with proper HTTP status codes
- **✅ Data Validation**: Advanced request body validation and duplicate detection
- **⚡ Fast & Lightweight**: Minimal dependencies for optimal performance
- **📄 Prisma ORM**: Modern database access with Prisma ORM
- **🔐 Security Features**: Helmet for security, bcryptjs for password hashing, JWT for authentication
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
│   │   └── post.controller.ts    # Post endpoints handler 🎯
│   ├── routes/
│   │   └── post.routes.ts        # Post API routes 🛣️
│   ├── services/
│   │   └── post.service.ts       # Post business logic and database operations 📦
│   ├── middleware/              # Express middleware 🛡️
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

## 🗄️ Database Schema

The application uses Prisma ORM with a single `Post` model. The schema is defined in `prisma/schema.prisma`:

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String   @db.VarChar(255)
  content   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🛠️ Technologies Used

| Technology     | Version | Description                           |
| -------------- | ------- | ------------------------------------- |
| **Node.js**    | v18+    | JavaScript runtime environment        |
| **TypeScript** | v5.6.3  | Static type checking for JavaScript   |
| **Express**    | v5.2.1  | Web application framework for Node.js |
| **PostgreSQL** | v15     | Relational database management system |
| **Prisma**     | v6.19.2 | Modern ORM for TypeScript/JavaScript  |
| **dotenv**     | v17.2.4 | Environment variable management       |
| **nodemon**    | v3.1.11 | Development server auto-restart       |
| **ts-node**    | v10.9.2 | TypeScript execution for Node.js      |
| **Docker**     | Latest  | Containerization platform             |

## 📝 Development

### Available Scripts

- `npm run build`: Compiles TypeScript to JavaScript 📦
- `npm start`: Starts the server in production mode (requires build first) 🚀
- `npm run dev`: Starts the server in development mode with nodemon 🔄
- `npm run prisma:generate`: Generates Prisma client types 🔧

### Adding New Endpoints

#### Step 1: Create a Service (if needed)

Create a new service file in `src/services/` to handle business logic and database operations:

```typescript
// src/services/example.service.ts
import prisma from "../config/database";

export interface ExampleData {
  // Define your data structure
}

class ExampleService {
  async getExamples() {
    return await prisma.example.findMany();
  }

  async getExampleById(id: number) {
    return await prisma.example.findUnique({
      where: { id },
    });
  }

  async createExample(data: ExampleData) {
    return await prisma.example.create({
      data,
    });
  }
}

export default new ExampleService();
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
