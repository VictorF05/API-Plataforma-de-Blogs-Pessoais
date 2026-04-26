import { postRepository } from "../repositories/postRepository.js";

const postController = {
    async getAllPosts(req, res) {
        try {
            const posts = await postRepository.getAllPosts(req.query.tags);
            return res.status(200).json(posts);
        } catch (err) {
            console.error('Erro no endpoint GET /posts', err);
            return res.status(500).json({ error: 'Internal server error.' });
        }
    },

    async getPostById(req, res) {
        try {
            const postId = req.params.id;
            if (isNaN(postId)) {
                return res.status(400).json({ error: 'Invalid ID format. Must be a number.' });
            }
            const post = await postRepository.getPostById(postId);
            if (!post) {
                return res.status(404).json({ error: 'ID not found!'});
            }
            return res.status(200).json(post);
        } catch (err) {
            console.error('Erro no endpoint GET /posts/:id', err);
            return res.status(500).json({ error: 'Internal server error.' });
        }
    },

    async createPost(req, res) {
        try {
            const { title, content, tags } = req.body;

            if (typeof title !== 'string' || !title.trim()) {
                return res.status(422).json({ error: 'Title must be a non-empty string.' });
            }

            if (typeof content !== 'string' || !content.trim()) {
                return res.status(422).json({ error: 'Content must be a non-empty string.' });
            }

            const post = await postRepository.createPost({ title, content, tags });
            return res.status(201).json(post);
        } catch (err) {
            console.error('Erro no endpoint POST /posts', err);
            return res.status(500).json({ error: 'Internal server error.' });
        }
    },

    async deletePostById(req, res) {
        try {
            const postId = req.params.id;
            if (isNaN(postId)) {
                return res.status(400).json({ error: 'Invalid ID format. Must be a number.' });
            }
            const postDeleted = await postRepository.deletePostById(postId);
            if (postDeleted === 0) {
                return res.status(404).json({ error: 'ID not found!' });
            }
            return res.sendStatus(204);
        } catch (err) {
            console.error('Erro no endpoint DELETE /posts/:id', err);
            return res.status(500).json({ error: 'Internal server error.' });
        }
    },

    async updatePostById(req, res) {
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

            const post = await postRepository.updatePostById(postId, { title, content, tags });
            if (!post) {
                return res.status(404).json({ error: 'ID not found!'});
            }
            return res.status(200).json(post);
        } catch (err) {
            console.error('Erro no endpoint PUT /posts/:id', err);
            return res.status(500).json({ error: 'Internal server error.' });
        }
    }
}

export { postController };