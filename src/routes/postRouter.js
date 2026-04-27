import express from 'express';
import { postController } from '../controllers/postController.js';
import { postValidator } from '../middlewares/postValidator.js';

const postRouter = express.Router();

postRouter.get('/', postController.getAllPosts);

postRouter.get('/:id', postValidator.validateIdParams, postController.getPostById);

postRouter.post('/', postValidator.validateCreate, postController.createPost);

postRouter.delete('/:id', postValidator.validateIdParams, postController.deletePostById);

postRouter.patch('/:id', postValidator.validateIdParams, postValidator.validateUpdate, postController.updatePostById);

export { postRouter };