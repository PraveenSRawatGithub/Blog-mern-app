const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/User');


router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log(email, password);

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.sendStatus(404);
        }
        const isMatch = await bcrypt.compare(password, user.password);
        // console.log(isMatch)
        if (!isMatch) {
            res.sendStatus(401);
        }
        else {
            // generating token and saving it to browser cookie
            const token = await user.generateAuthToken();

            res.status(200).send(token);
        }

    }
    catch (error) {
        console.log('error: ', error);
        res.sendStatus(500);
    }
})

module.exports = router;
