require("dotenv").config();
const express = require("express");
const pool = require("./database");
const result = require('pg/lib/query');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// GET Method
app.get("/posts", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts ORDER BY id ASC");

				return res.status(200).json({
      data: result.rows,
    });
  } catch (err) {
				return res.status(500).json({
      error: `Database error ${err.message}`,
    });
  }
});
// Get post by ID
app.get("/posts/:id", async (req, res) => {
		const { id } = req.params;
		try {
				const result = await pool.query(
								"SELECT * FROM posts WHERE id = $1", [id]
				);
				return res.status(200).json({
						data: result.rows[0],
				})
		}
		catch (err) {
				return res.status(500).json({
						error: `Database error ${err.message}`,
				})
		}
});

// POST Method
app.post("/posts", async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      error: "Title and content are required",
    });
  }

  try {
    const existingPost = await pool.query(
      "SELECT id FROM posts WHERE LOWER(title) = LOWER($1)",
      [title],
    );
    if (existingPost.rows.length > 0) {
      return res.status(409).json({
        error: "A post with this title already exists",
      });
    }
    // Create new post if no duplicate
    const result = await pool.query(
      "INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *",
      [title, content],
    );
				return res.status(201).json({
      message: "Post created successfully.",
      data: result.rows[0],
    });
  } catch (err) {
				return res.status(500).json({
      error: `Database error ${err.message}`,
    });
  }
});

// PUT Method
app.put("/posts/:id", async (req, res) => {
		const { id } = req.params;
		const { title, content } = req.body;

		if (!title || !content) {
				return res.status(400).json({
						error: "Title and content are required",
				})
		}
		if(!id) {
				return res.status(400).json({
						error: "Id is required",
				})
		}

		try {
				const existingPost = await pool.query(
								"SELECT id FROM posts WHERE LOWER(title) = LOWER($1)",
								[title],
				);
				if (existingPost.rows.length > 0) {
						return res.status(409).json({
								error: "A post with this title already exists",
						});
				}

				const result = await pool.query(
								`UPDATE posts 
									SET 
											title = $1, 
											content = $2 
									WHERE id = $3 
									RETURNING *;`,
								[title, content, id],
				);
				if(result.rows.length === 0) {
						return res.status(409).json({
								error: "Post not found"
						});
				}
				return res.status(200).json({
						message: "Post updated successfully.",
						data: result.rows[0]
				});
		}
		catch (err) {
				return res.status(500).json({
						error: `Database error ${err.message}`,
				})
		}
});

// PATCH Method
app.patch("/posts/:id", async (req, res) => {
		const { id } = req.params;
		const { title, content } = req.body;

		if (!title && !content) {
				return res.status(400).json({
						error: 'At least one field is required'
				})
		}
		if(!id) {
				return res.status(400).json({
						error: "Id is required",
				})
		}

		try {
				const existingPost = await pool.query(
								"SELECT id FROM posts WHERE LOWER(title) = LOWER($1)",
								[title],
				);
				if (existingPost.rows.length > 0) {
						return res.status(409).json({
								error: "A post with this title already exists",
						});
				}

				const result = await pool.query(
								`UPDATE posts
       		SET
         	title = COALESCE($1, title),
         	content = COALESCE($2, content)
       		WHERE id = $3
       		RETURNING *`,
								[title || null, content || null, id]
				);

				if(result.rows.length === 0) {
						return res.status(404).json({
								error: "Post not found"
						});
				}

				return res.status(200).json({
						message: "Post updated successfully.",
						data: result.rows[0]
				});
		}
		catch (err) {
				return res.status(500).json({
						error: `Database error ${err.message}`,
				})
		}
});

// DELETE Method
app.delete("/posts/:id", async (req, res) => {
		const { id } = req.params;
		if (!id) {
				return res.status(400).json({
						error: "Id is required",
				});
		}
		try {
				const results = await pool.query(
						`DELETE FROM posts WHERE id = $1 RETURNING *`,
						[id]
				);
				if(results.rowCount === 0) {
						return res.status(404).json({
								error: "Post not found"
						});
				}

				return res.status(200).json({
						message: "Post deleted successfully."
				});
		}
		catch (err) {
				return res.status(500).json({
						error: `Database error ${err.message}`,
				});
		}
})

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
