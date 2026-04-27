import { postRepository } from "../repositories/postRepository.js";

const postController = {
    async getAllPosts(req, res) {
        const posts = await postRepository.getAllPosts(req.query.tags);
        return res.status(200).json(posts);
    },

    async getPostById(req, res) {
        const post = await postRepository.getPostById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'ID not found!'});
        }
        return res.status(200).json(post);
    },

    async createPost(req, res) {
        const { title, content, tags } = req.body;
        const post = await postRepository.createPost({ title, content, tags });
        return res.status(201).json(post);
    },

    async deletePostById(req, res) {
        const postDeleted = await postRepository.deletePostById(req.params.id);
        if (postDeleted === 0) {
            return res.status(404).json({ error: 'ID not found!' });
        }
        return res.sendStatus(204);
    },

    async updatePostById(req, res) {
        const { title, content, tags } = req.body;
        const post = await postRepository.updatePostById(req.params.id, { title, content, tags });
        if (!post) {
            return res.status(404).json({ error: 'ID not found!'});
        }
        return res.status(200).json(post);
    }
}

export { postController };