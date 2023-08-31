const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()



app.use(cors())
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Working in Port 3000')
})


app.listen('3000', ()=>{
    console.log('listening')
})