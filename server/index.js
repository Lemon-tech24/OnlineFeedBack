require('dotenv').config()
const cookieSession = require('cookie-session')
const express = require('express')
const passport = require('passport')
const authRoute = require('./routes/auth')
const dbRoute = require('./routes/database')
const cors = require('cors')
const app = express()
require('./passport')

app.use(cookieSession({ name: "session", keys: ["key"], maxAge: 24 * 60 * 60 * 1000 }));

app.use(passport.initialize())
app.use(passport.session())
app.use(cors({
    origin: 'http://localhost:5173', // react app
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
}))

app.use("/auth", authRoute)
app.use("/api/database/", dbRoute)

app.listen("5000", () => {
    console.log('server running')
})
