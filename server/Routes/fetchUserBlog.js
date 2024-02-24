const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Blog = require('../models/Blog');
const authenticateToken = require('../authenticateToken')
 
router.get('/', authenticateToken, async (req, res) => {
    try {
        let user_id = req.id;
        const blogs = await Blog.find({ user: user_id }).sort({ createdAt: -1 });
        const user = await User.findById(user_id);
        res.status(200).json({ blogs: blogs, user: user });
    }
    catch (error) {
        console.error('Internal Server error: ', error);
        res.sendStatus(500);
    }
})

module.exports = router;