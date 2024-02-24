const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.post('/', async (req, res) => {

    try {
        const { username, email, password } = req.body;
        const newUser = new User({
            username: username,
            email: email,
            password: password
        })

        // generating token and saving it to browser cookie
        const token = await newUser.generateAuthToken();
        // res.cookie("jwt", token, {
        //     expires: new Date(Date.now() + 3600000),
        //     httpOnly: true
        // });

        await newUser.save();
        res.status(200).send(token);
    }
    catch (error) {
        console.log("error saving: ", error);
        res.sendStatus(500);
    }
})

module.exports = router;