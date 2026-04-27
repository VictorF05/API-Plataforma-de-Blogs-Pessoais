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
            const post = await postRepository.getPostById(req.params.id);
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
            const post = await postRepository.createPost({ title, content, tags });
            return res.status(201).json(post);
        } catch (err) {
            console.error('Erro no endpoint POST /posts', err);
            return res.status(500).json({ error: 'Internal server error.' });
        }
    },

    async deletePostById(req, res) {
        try {
            const postDeleted = await postRepository.deletePostById(req.params.id);
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
            const { title, content, tags } = req.body;
            const post = await postRepository.updatePostById(req.params.id, { title, content, tags });
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