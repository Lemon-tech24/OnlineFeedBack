const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
require('dotenv').config()



app.use(cors())
app.use(express.json());


//connection to db
//mongoose.connect(db_url)

app.get('/', (req, res)=>{
    res.send('Working in Port 3000')
})




app.listen('3000', ()=>{
    console.log('listening')
})