import express from 'express';
import { postController } from '../controllers/postController.js';

const postRouter = express.Router();

postRouter.get('/', postController.getAllPosts);

postRouter.get('/:id', postController.getPostById);

postRouter.post('/', postController.createPost);

postRouter.delete('/:id', postController.deletePostById);

postRouter.patch('/:id', postController.updatePostById);

export { postRouter };