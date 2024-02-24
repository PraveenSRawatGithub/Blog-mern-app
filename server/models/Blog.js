const mongoose = require('mongoose');
const User = require('./User')

const blogSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    }
})

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;