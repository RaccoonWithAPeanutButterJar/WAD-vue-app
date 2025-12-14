const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');

// READ
router.get('/', postsController.getAllPosts);
router.get('/:id', postsController.getPost);

// CREATE
router.post('/', postsController.createPost);

// UPDATE
router.put('/:id', postsController.updatePost);

// DELETE
router.delete('/:id', postsController.deletePost);
router.delete('/', postsController.deleteAllPosts);

module.exports = router;
