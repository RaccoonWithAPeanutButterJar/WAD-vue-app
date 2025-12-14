const pool = require('../database');

const postQuerySelect = `
    SELECT 
        id AS "postId", 
        post_time AS "postTime", 
        author_name AS "authorName", 
        profile_image AS "profileImage", 
        post_content AS "postContent" 
    FROM posttable`;

// READ all posts
exports.getAllPosts = async (req, res) => {
    try {
        const result = await pool.query(`${postQuerySelect} ORDER BY post_time DESC`);
        res.json(result.rows);
    } catch (err) {
        console.error("Database query failed:", err.message);
        res.status(500).json({ error: 'Failed to retrieve posts.' });
    }
};

// READ a single post
exports.getPost = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const result = await pool.query(`${postQuerySelect} WHERE id = $1`, [id]);
        
        if (result.rows.length === 0) {
            return res.status(400).json({ error: 'Post not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Database query failed:", err.message);
        res.status(500).json({ error: 'Failed to retrieve post.' });
    }
};

// CREATE a new post
exports.createPost = async (req, res) => {
    const { authorName, profileImage, postContent } = req.body;
    
    if (!authorName || !postContent) {
        return res.status(400).json({ error: 'Author name and post content are required.' });
    }
    
    try {
        const queryText = `
            INSERT INTO posttable(author_name, profile_image, post_content) 
            VALUES ($1, $2, $3) 
            RETURNING id AS "postId", post_time AS "postTime", author_name AS "authorName", profile_image AS "profileImage", post_content AS "postContent"`;
            
        const values = [authorName, profileImage, postContent];
        const result = await pool.query(queryText, values);

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Database INSERT failed:", err.message);
        res.status(500).json({ error: 'Failed to create post in database.' });
    }
};

// UPDATE an existing post
exports.updatePost = async (req, res) => {
    const id = Number(req.params.id);
    const { authorName, profileImage, postContent } = req.body;
    
    try {
        const queryText = `
            UPDATE posttable 
            SET 
                author_name = COALESCE($2, author_name),
                profile_image = COALESCE($3, profile_image),
                post_content = COALESCE($4, post_content),
                post_time = NOW()
            WHERE id = $1
            RETURNING id AS "postId", post_time AS "postTime", author_name AS "authorName", profile_image AS "profileImage", post_content AS "postContent"`;
            
        const values = [id, authorName, profileImage, postContent];
        const result = await pool.query(queryText, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Database UPDATE failed:", err.message);
        res.status(500).json({ error: 'Failed to update post.' });
    }
};

// DELETE a single post
exports.deletePost = async (req, res) => {
    const postId = Number(req.params.id);
    
    try {
        const result = await pool.query('DELETE FROM posttable WHERE id = $1 RETURNING id', [postId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        
        res.json({ message: `Post with ID ${postId} deleted` });
    } catch (err) {
        console.error("Database DELETE failed:", err.message);
        res.status(500).json({ error: 'Failed to delete post.' });
    }
};

// DELETE all posts
exports.deleteAllPosts = async (req, res) => {
    try {
        await pool.query('DELETE FROM posttable');
        res.json({ message: 'All posts deleted' });
    } catch (err) {
        console.error("Database DELETE failed:", err.message);
        res.status(500).json({ error: 'Failed to delete all posts.' });
    }
};