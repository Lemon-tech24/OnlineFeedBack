require('dotenv').config()
const cookieSession = require('cookie-session')
const express = require('express')
const passport = require('passport')
const helmet = require('helmet');
const authRoute = require('./routes/auth')
const dbRoute = require('./routes/database')
const cors = require('cors')
const app = express()
require('./passport')

app.use(cors({
    origin: 'http://localhost:5173', // react app
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
}))

app.use(helmet())
app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ limit: '5mb', extended: true }));
app.use(cookieSession({ name: "session", keys: ["cat dog moew asda"], maxAge: 24 * 60 * 60 * 100 }));

app.use(passport.initialize())
app.use(passport.session())


app.use("/auth", authRoute)
app.use("/api/database/", dbRoute)

app.listen("5000", () => {
    console.log('server running')
})
