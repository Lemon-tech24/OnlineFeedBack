const express = require('express');
const app = express()

app.get('/', (req, res)=>{
    res.send('Working in Port 3000')
})


app.listen('3000', ()=>{
    console.log('listening')
})