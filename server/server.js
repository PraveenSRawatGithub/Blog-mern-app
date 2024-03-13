const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');


const cors = require('cors');
// app.use(cors())
app.use(cors(
    {
        origin: ["https://blogger-mern-app.netlify.app"],
        methods: ["POST", "GET", "PUT", "DELETE"],
        credentials: true
    }
))

// app cors


const DB = 'mongodb+srv://praveensinghrawat46:KsmwtchxT5g0jueA@cluster0.uewpwtk.mongodb.net/BlogApp?retryWrites=true&w=majority'
mongoose.connect(DB).then(() => {
    console.log('connection successful')
}).catch((error) => console.log('no connection: ', error))

app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'))



const login = require('./Routes/login');
const signup = require('./Routes/signup');
const logout = require('./Routes/logout');
const createBlog = require('./Routes/createBlog');
const fetchUserBlog = require('./Routes/fetchUserBlog');
const fetchBlogs = require('./Routes/fetchBlog');
const updateBlog = require('./Routes/updateBlog')
const deleteBlog = require('./Routes/deleteBlog');
const updateLikes = require('./Routes/updateLikes');


app.use('/login', login);
app.use('/signup', signup);
app.use('/logout', logout);
app.use('/createBlog', createBlog);
app.use('/fetchUserBlog', fetchUserBlog);
app.use('/fetchBlogs', fetchBlogs);
app.use('/updateBlog', updateBlog)
app.use('/deleteBlog', deleteBlog);
app.use('/likes', updateLikes);

app.get('/', (req, res) => {
    res.send("hello");
})


if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"))
}


app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
})
