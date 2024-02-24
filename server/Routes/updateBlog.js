const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog')

router.use(express.json())

router.put('/:id', async(req, res) => {
    const id = req.params.id
    console.log(id)
    
    const {title, author, content} = req.body;
    const modifiedContent = content.replace(/\n/g, '<br>')
    try{
        const blog = await Blog.findById(id);
        blog.title = title;
        blog.author = author;
        blog.content = modifiedContent;
        await blog.save()
        res.sendStatus(200);
    }
    catch(error){
        res.sendStatus(500);
    }
})

module.exports = router;