const errorHandler = (err, req, res, next) => {
    console.error(`Erro na rota ${req.method} ${req.originalUrl}`);
    console.error(err);

    const statusCode = err.statusCode || 500;
    const errorMessage = statusCode === 500 ? 'Internal Server Error.' : err.message;

    return res.status(statusCode).json({ error: errorMessage });
};

export { errorHandler };