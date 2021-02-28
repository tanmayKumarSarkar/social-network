const express = require('express');
const router = express.Router();
const postController = require('./postController');

router.get('/', postController.getUserDetails);
router.get('/posts', postController.getFollowerPosts);
 
module.exports = router;