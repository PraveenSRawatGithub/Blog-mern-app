const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        tokens: [
            {
                token: {
                    type: String,
                    required: true
                }
            }
        ]
    }
)

UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next()
})

UserSchema.methods.generateAuthToken = async function () {
    try {
        const token = await jwt.sign({ _id: this._id.toString() }, "jsonwebtokenisgeneratingforuser");
        if (!token) {
            throw new error('Token generation failed!')
        }
        this.tokens = this.tokens.concat({ token: token })
        // console.log("token is : ", token);
        return token
    }
    catch (error) {
        console.error('Error generating authentication token!', error);
    }

}

const User = mongoose.model('User', UserSchema);

module.exports = User;