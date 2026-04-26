import express from 'express';
import { getAllPosts, getPostById, createPost, deletePostById, updatePostById } from '../repositories/postsRepository.js';

const postsRouter = express.Router();

// read all posts
postsRouter.get('/', async (req, res) => {
    try {
        const posts = await getAllPosts(req.query.tags);
        return res.status(200).json(posts);
    } catch (err) {
        console.error('Erro no endpoint GET /posts', err);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

// read post by id
postsRouter.get('/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        if (isNaN(postId)) {
            return res.status(400).json({ error: 'Invalid ID format. Must be a number.' });
        }
        const post = await getPostById(postId);
        if (!post) {
            return res.status(404).json({ error: 'ID not found!'});
        }
        return res.status(200).json(post);
    } catch (err) {
        console.error('Erro no endpoint GET /posts/:id', err);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

// create post
postsRouter.post('/', async (req, res) => {
    try {
        const { title, content, tags } = req.body;

        if (typeof title !== 'string' || !title.trim()) {
            return res.status(422).json({ error: 'Title must be a non-empty string.' });
        }

        if (typeof content !== 'string' || !content.trim()) {
            return res.status(422).json({ error: 'Content must be a non-empty string.' });
        }

        const post = await createPost({ title, content, tags });
        return res.status(201).json(post);
    } catch (err) {
        console.error('Erro no endpoint POST /posts', err);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

// delete post
postsRouter.delete('/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        if (isNaN(postId)) {
            return res.status(400).json({ error: 'Invalid ID format. Must be a number.' });
        }
        const postDeleted = await deletePostById(postId);
        if (postDeleted === 0) {
            return res.status(404).json({ error: 'ID not found!' });
        }
        return res.sendStatus(204);
    } catch (err) {
        console.error('Erro no endpoint DELETE /posts/:id', err);
        return res.status(500).json({ error: 'Internal server error.' });
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
            return res.status(422).json({ error: 'Nothing to change.' });
        }

        if (title !== undefined) {
            if (typeof title !== 'string' || !title.trim()) {
                return res.status(422).json({ error: 'Title must be a non-empty string.' });
            }
        }

        if (content !== undefined) {
            if (typeof content !== 'string' || !content.trim()) {
                return res.status(422).json({ error: 'Content must be a non-empty string.' });
            }
        }

        if (tags !== undefined) {
            if (tags !== null && (typeof tags !== 'string' || !tags.trim())) {
                return res.status(422).json({ error: 'Tags must be a non-empty string or null.' });
            }
        }

        const post = await updatePostById(postId, { title, content, tags });
        if (!post) {
            return res.status(404).json({ error: 'ID not found!'});
        }
        return res.status(200).json(post);
    } catch (err) {
        console.error('Erro no endpoint PUT /posts/:id', err);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

export { postsRouter };