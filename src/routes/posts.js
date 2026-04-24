import express from 'express';

const routerPosts = express.Router();

// array de posts
const posts = [
    { id: 3, title: 'meu primeiro post', content: 'hoje é o primeiro post do meu blog...', tags: 'geral' },
    { id: 6, title: 'o que é front-end', content: 'em algum momento você já...', tags: 'frontend' },
    { id: 10, title: 'o que é back-end', content: 'ontem falamos sobre front-end...', tags: 'backend' },
    { id: 2, title: 'aprendendo html', content: 'o primeiro passo para aprender...', tags: 'frontend' },
    { id: 13, title: 'introdução ao css', content: 'blz, agora é hora de dar estilo para nossa...', tags: 'frontend' },
    { id: 12, title: 'desmistificando o javascript', content: 'muito bem, vamos dar vida a nossa pagina...', tags: 'frontend' },
    { id: 20, title: 'javascript no servidor?', content: 'quem diria hein, nem só de front vivera o javascript...', tags: 'backend' },
    { id: 1, title: 'o que é o node.js?', content: 'novo motor v8 do chrome é usado também em...', tags: 'backend' },
    { id: 45, title: 'adeus express? fastify é o novo queridinho', content: 'concorrência de peso surgiu recentemente...', tags: 'backend' },
    { id: 7, title: 'bun é melhor que node?', content: 'o criador do node resolveu...', tags: 'backend' }
];

// read all posts
routerPosts.get('/posts', (req, res) => {
    const searchTags = req.query.tags
    if (searchTags) {
        const result = posts.filter((post) => post.tags === searchTags);
        return res.status(200).json(result);
    }
    return res.status(200).json(posts);
});

// read post by id
routerPosts.get('/posts/:id', (req, res) => {
    const postId = Number(req.params.id);
    const found = posts.find((post) => post.id === postId);
    if (!found) return res.status(404).json({ error: `Post ${postId} not found!` });

    return res.status(200).json(found);
});

// create post
routerPosts.post('/posts', (req, res) => {
    const maxId = posts.reduce((prev, current) => {
        return (prev.id > current.id) ? prev : current;
    }, { id: 0 });

    const newPost = {
        id: maxId.id + 1,
        title: req.body.title,
        content: req.body.content,
        tags: req.body.tags
    }

    posts.push(newPost);

    return res.status(201).json(newPost);
});

// delete post
routerPosts.delete('/posts/:id', (req, res) => {
    const postId = Number(req.params.id);
    const indexDelete = posts.findIndex((post) => post.id === postId);
    if (indexDelete === -1) return res.status(404).json({ error: `Post ${postId} not found!` });
    posts.splice(indexDelete, 1);

    return res.sendStatus(204);
});

// update post by id
routerPosts.put('/posts/:id', (req, res) => {
    const postId = Number(req.params.id);
    const indexUpdate = posts.findIndex((post) => post.id === postId);
    if (indexUpdate === -1) return res.status(404).json({ error: `Post ${postId} not found!` });
    posts[indexUpdate].title = req.body.title;
    posts[indexUpdate].content = req.body.content;
    posts[indexUpdate].tags = req.body.tags;

    return res.status(200).json(posts[indexUpdate]);
});

export default routerPosts;