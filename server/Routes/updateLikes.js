const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog')

router.put('/:id', async (req, res) => {
    try {

        const BlogId = req.params.id;
        const blog = await Blog.findById(BlogId);
        console.log(blog.likes)
        blog.likes++;
        await blog.save()
        res.sendStatus(200);
    }
    catch (error) {
        res.sendStatus(500);
        console.log("error in likes: ", error);
    }


})

module.exports = router;