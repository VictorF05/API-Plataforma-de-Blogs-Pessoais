import express from 'express';
import routerPosts from './routes/posts.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(routerPosts);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});