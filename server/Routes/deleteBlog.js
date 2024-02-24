const express = require('express');
const router = express.Router();

const Blog = require('../models/Blog')

router.delete('/:id', async (req, res) => {
    try { 
        const { id } = req.params;
        console.log("got id is : ", id);
        const user = await Blog.findByIdAndDelete(id);
        if (user) {
            console.log('Document deleted successfully:', user);
            res.status(200).json({ message: 'Document deleted successfully', deletedUser: user });
        } else {
            console.log('Document not found');
            res.status(404).json({ message: 'Document not found' });
        }
    } catch (error) {
        console.error('Error Deleting document:', error);
        res.status(500).json({ message: 'Error deleting document', error: error.message });
    }
});

module.exports = router;