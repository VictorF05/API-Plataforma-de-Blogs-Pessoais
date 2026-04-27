import express from 'express';
import { postRouter } from './routes/postRouter.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/posts', postRouter);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});