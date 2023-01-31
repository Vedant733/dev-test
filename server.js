const express = require('express');
const connectDB = require('./config/db')
const Profile = require('./models/Profile')
const app = express();

// Connect To The Database
connectDB()

// Init Middleware
logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    console.log(method, url, new Date().getFullYear())
    next()
}
app.use(express.json({ extended: false }), logger);

// Routes
app.get('/', (req, res) => res.send('API Running'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/project', require('./routes/api/project'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/profile', require('./routes/api/profile'))

// social by user id

app.get('/api/social/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id })
        if (!profile) {
            return res.status(400).json({ msg: 'Profile Not Found' })
        }
        res.json(profile.social)
    } catch (err) {
        if (err.kind === 'ObjectId') return res.status(400).json({ msg: 'Profile Not Found' })
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Started on ${port}`));