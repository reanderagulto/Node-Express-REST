require('dotenv').config();
const express = require('express');
const pool = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// GET Method - Get all the posts
app.get('/posts', async(req, res) => {
		try {
				const result = await pool.query('SELECT * FROM posts ORDER BY id ASC');
				res.status(200).json({
						data: result.rows,
				});
		} catch (err) {
				res.status(500).json({
						error: `Database error ${err.message}`,
				})
		}
});

// POST Method
app.post('/posts', async(req, res) => {
		const { title, content } = req.body;

		if(!title || !content){
				return res.status(400).json({
						error: 'Title and content are required'
				});
		}

		try {
			const result = await pool.query(
							'INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *',
							[title, content]
			);

			res.status(201).json({
					message: 'Post created successfully.',
					data: result.rows[0]
			});
		} catch (err) {
				res.status(500).json({
						error: `Database error ${err.message}`,
				})
		}
});

app.listen(PORT, () => {
		console.log(`API running on http://localhost:${PORT}`);
});