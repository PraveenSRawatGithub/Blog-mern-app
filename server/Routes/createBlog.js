const express = require('express');
const router = express.Router();

const Blog = require('../models/Blog');
const authenticateToken = require('../authenticateToken')

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({ 
    destination: (req, file, cb) => {
        cb(null, 'public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

router.post('/', authenticateToken, upload.single('file'), async (req, res) => {
    try {
        const { title, author, content, tag } = req.body;
        const modifiedContent = content.replace(/\n/g, '<br>')
        const newBlog = new Blog({
            user: req.id,
            title: title,
            content: modifiedContent,
            tag: tag,
            author: author,
            image: req.file.filename,
            createdAt: Date.now()
        })
        await newBlog.save()
        res.status(200).send('blog created')
    }
    catch (error) {
        console.error('Internal server error: ', error)
        res.sendStatus(500);
    }
})

module.exports = router;