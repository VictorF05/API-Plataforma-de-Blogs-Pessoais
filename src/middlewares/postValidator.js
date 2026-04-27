const postValidator = {
    validateIdParams(req, res, next) {
        /*const postId = req.params.id;
        if (!/^\d+$/.test(postId)) {
            return res.status(400).json({ error: 'Invalid ID format. Must be a number.' });
        }*/
        next();
    },

    validateCreate(req, res, next) {
        const { title, content, tags } = req.body;
        if (typeof title !== 'string' || !title.trim()) {
            return res.status(422).json({ error: 'Title must be a non-empty string.' });
        }
        if (typeof content !== 'string' || !content.trim()) {
            return res.status(422).json({ error: 'Content must be a non-empty string.' });
        }
        if (tags !== undefined && tags !== null && (typeof tags !== 'string' || !tags.trim())) {
            return res.status(422).json({ error: 'Tags must be a non-empty string or null.' });
        }
        next();
    },

    validateUpdate(req, res, next) {
        const { title, content, tags } = req.body;
        if (title === undefined && content === undefined && tags === undefined) {
            return res.status(422).json({ error: 'Nothing to change.' });
        }
        if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
            return res.status(422).json({ error: 'Title must be a non-empty string.' });
        }
        if (content !== undefined && (typeof content !== 'string' || !content.trim())) {
            return res.status(422).json({ error: 'Content must be a non-empty string.' });
        }
        if (tags !== undefined && tags !== null && (typeof tags !== 'string' || !tags.trim())) {
            return res.status(422).json({ error: 'Tags must be a non-empty string or null.' });
        }
        next();
    }
};

export { postValidator };