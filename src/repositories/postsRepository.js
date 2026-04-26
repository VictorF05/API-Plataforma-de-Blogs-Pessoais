import { pool } from '../database.js';

const getAllPosts = async (searchTags) => {
    const query = {
        text: 'SELECT * FROM posts',
        values: []
    }
    if (searchTags) {
        query.text += ' WHERE tags LIKE $1';
        query.values.push(`%${searchTags}%`);
    }
    const responseDB = await pool.query(query);
    return responseDB.rows;
}

const getPostById = async (id) => {
    const query = {
        text: 'SELECT * FROM posts WHERE id = $1',
        values: [id]
    }
    const responseDB = await pool.query(query);
    return responseDB.rows[0];
}

const createPost = async (data) => {
    const query = {
        text: 'INSERT INTO posts (title,content,tags) VALUES ($1, $2, $3) RETURNING *',
        values: [data.title,data.content,data.tags]
    }
    const responseDB = await pool.query(query);
    return responseDB.rows[0];
}

const deletePostById = async (id) => {
    const query = {
        text: 'DELETE FROM posts WHERE id = $1',
        values: [id]
    }
    const responseDB = await pool.query(query);
    return responseDB.rowCount;
}

const updatePostById = async (id, data) => {
    const fields = [];
    const values = [];
    let paramIndex = 1;

    if (data.title !== undefined) {
        fields.push(`title = $${paramIndex++}`);
        values.push(data.title);
    }
    if (data.content !== undefined) {
        fields.push(`content = $${paramIndex++}`);
        values.push(data.content);
    }
    if (data.tags !== undefined) {
        fields.push(`tags = $${paramIndex++}`);
        values.push(data.tags);
    }

    values.push(id);
    const strFields = fields.join(', ');

    const query = {
        text: `UPDATE posts SET ${strFields} WHERE id = $${paramIndex} RETURNING *`,
        values: values
    }
    const responseDB = await pool.query(query);
    return responseDB.rows[0];
}

export { getAllPosts, getPostById, createPost, deletePostById, updatePostById };