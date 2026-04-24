import express from 'express';
import { pool } from '../database.js';

const postsRouter = express.Router();

// read all posts
postsRouter.get('/', async (req, res) => {
    try {
        const searchTags = req.query.tags;
        const query = {
            text: 'SELECT * FROM posts',
            values: []
        }
        if (searchTags) {
            query.text += ' WHERE tags LIKE $1';
            query.values.push(`%${searchTags}%`);
        }
        const responseDB = await pool.query(query);
        return res.status(200).json(responseDB.rows);
    } catch (err) {
        console.error('Erro no endpoint GET /posts', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// read post by id
postsRouter.get('/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        if (isNaN(postId)) {
            return res.status(400).json({ error: 'Invalid ID format. Must be a number.' });
        }
        const query = {
            text: 'SELECT * FROM posts WHERE id = $1',
            values: [postId]
        }
        const responseDB = await pool.query(query);
        if (responseDB.rowCount === 0) {
            return res.status(404).json({ error: 'ID not found!'});
        }
        return res.status(200).json(responseDB.rows[0]);
    } catch (err) {
        console.error('Erro no endpoint GET /posts/:id', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// create post
postsRouter.post('/', async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        if (title === undefined || content === undefined) {
            return res.status(422).json({ error: 'title and content are required.' });
        }
        if (title.length < 3 || content.length < 3) {
            return res.status(422).json({ error: 'title and content are minimum length(3).' });
        }
        const query = {
            text: 'INSERT INTO posts (title,content,tags) VALUES ($1, $2, $3) RETURNING *',
            values: [title,content,tags]
        }
        const responseDB = await pool.query(query);
        return res.status(201).json(responseDB.rows[0]);
    } catch (err) {
        console.error('Erro no endpoint POST /posts', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// delete post
postsRouter.delete('/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        if (isNaN(postId)) {
            return res.status(400).json({ error: 'Invalid ID format. Must be a number.' });
        }
        const query = {
            text: 'DELETE FROM posts WHERE id = $1',
            values: [postId]
        }
        const responseDB = await pool.query(query);
        if (responseDB.rowCount === 0) {
            return res.status(404).json({ error: 'ID not found!' });
        }
        return res.sendStatus(204);
    } catch (err) {
        console.error('Erro no endpoint DELETE /posts/:id', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// update post by id
postsRouter.put('/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        if (isNaN(postId)) {
            return res.status(400).json({ error: 'Invalid ID format. Must be a number.'});
        }
        const { title, content, tags } = req.body;
        if (title === undefined && content === undefined && tags === undefined) {
            return res.status(422).json({ error: 'nothing to change. Send title, content or tags to update.' });
        }

        const fields = [];
        const values = [];
        let paramIndex = 1;

        if (title !== undefined) {
            if (title.length < 3) {
                return res.status(422).json({ error: 'title are minimum length(3).' });
            }
            fields.push(`title = $${paramIndex++}`);
            values.push(title);
        }
        if (content !== undefined) {
            if (content.length < 3) {
                return res.status(422).json({ error: 'content are minimum length(3).' });
            }
            fields.push(`content = $${paramIndex++}`);
            values.push(content);
        }
        if (tags !== undefined) {
            fields.push(`tags = $${paramIndex++}`);
            values.push(tags);
        }

        values.push(postId);

        const strFields = fields.join(', ');
        const query = {
            text: `UPDATE posts SET ${strFields} WHERE id = $${paramIndex} RETURNING *`,
            values: values
        }
        const responseDB = await pool.query(query);
        if (responseDB.rowCount === 0) {
            return res.status(404).json({ error: 'ID not found!'});
        }
        return res.status(200).json(responseDB.rows[0]);
    } catch (err) {
        console.error('Erro no endpoint PUT /posts/:id', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

export { postsRouter };