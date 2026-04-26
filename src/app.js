import express from 'express';
import { postsRouter } from './routes/postsRouter.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/posts', postsRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});