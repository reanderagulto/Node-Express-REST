<div align="center">
  <h1>🚀 Node.js Express REST API</h1>
  <p>A modern, lightweight RESTful API built with Node.js, Express, and PostgreSQL</p>
  <p>
    <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-v18+-green.svg" alt="Node.js"></a>
    <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express-v5.2.1-blue.svg" alt="Express"></a>
    <a href="https://www.postgresql.org/"><img src="https://img.shields.io/badge/PostgreSQL-v15-blue.svg" alt="PostgreSQL"></a>
    <a href="https://www.docker.com/"><img src="https://img.shields.io/badge/Docker-Ready-blue.svg" alt="Docker"></a>
    <a href="https://opensource.org/licenses/ISC"><img src="https://img.shields.io/badge/License-ISC-orange.svg" alt="License"></a>
  </p>
</div>

## ✨ Features

- **📡 RESTful API Design**: Implements standard HTTP methods (GET, POST) for managing posts
- **🗄️ PostgreSQL Database**: Uses PostgreSQL for data persistence with connection pooling
- **🔒 Environment Configuration**: Supports .env file for secure configuration
- **🐳 Docker Support**: Containerized deployment with Docker and Docker Compose
- **🔄 Auto-Reload Development**: Nodemon integration for automatic server restart
- **🎯 Error Handling**: Comprehensive error handling with proper HTTP status codes
- **✅ Data Validation**: Basic request body validation for POST requests
- **⚡ Fast & Lightweight**: Minimal dependencies for optimal performance

## 📁 Project Structure

```
├── src/
│   ├── index.js          # Express server and API routes 🏠
│   └── database.js       # PostgreSQL connection pool 🗄️
├── .env.example          # Example environment variables 📝
├── .gitignore            # Git ignore configuration 🚫
├── docker-compose.yml    # Docker Compose configuration 🐳
├── Dockerfile            # Docker image definition 🐋
├── init.sql              # Database initialization script 📊
├── package.json          # Project dependencies and scripts 📦
└── package-lock.json     # Dependency lock file 🔒
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
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_NAME=rest_api_db
   ```

5. **Initialize the database**:
   - Create a database with the name specified in `DB_NAME`
   - Run the initialization script:
     ```bash
     psql -U your_username -d rest_api_db -f init.sql
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

## 🗄️ Database Schema

The application uses a single `posts` table with the following structure:

```sql
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,        -- Unique identifier
  title VARCHAR(255) NOT NULL,  -- Post title
  content TEXT NOT NULL         -- Post content
);
```

## 🛠️ Technologies Used

| Technology             | Version | Description                           |
| ---------------------- | ------- | ------------------------------------- |
| **Node.js**            | v18+    | JavaScript runtime environment        |
| **Express**            | v5.2.1  | Web application framework for Node.js |
| **PostgreSQL**         | v15     | Relational database management system |
| **node-postgres (pg)** | v8.18.0 | PostgreSQL client for Node.js         |
| **dotenv**             | v17.2.4 | Environment variable management       |
| **nodemon**            | v3.1.11 | Development server auto-restart       |
| **Docker**             | Latest  | Containerization platform             |

## 📝 Development

### Available Scripts

- `npm start`: Starts the server in production mode 🚀
- `npm run dev`: Starts the server in development mode with nodemon 🔄

### Adding New Endpoints

1. Open `src/index.js`
2. Add a new route handler
3. Implement the desired functionality
4. Test the endpoint using tools like Postman or curl

## 📄 License

This project is licensed under the **ISC License** - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

If you have any questions or need support, please open an issue or contact the project maintainer.

<div align="center">
  <p>Built with ❤️ using Node.js and Express</p>
</div>
