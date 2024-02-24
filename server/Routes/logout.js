const express = require('express');
const router = express.Router();

const authenticateToken = require('../authenticateToken')

router.delete('/',authenticateToken, async(req, res) => {
    try{
        res.clearCookie('jwt').sendStatus(200);
        // console.log('cookie deleted');
    }
    catch(error){
        res.sendStatus(500);
        console.error("error deleting cookie: ", error)
    } 
})

module.exports = router;