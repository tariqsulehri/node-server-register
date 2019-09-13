const express = require('express');
const winston = require('winston');
const app =  express();

require('./startup/routes')(app);
require('./startup/config')(app);
require('./startup/db')();

// app.get('/api/users',(req,res)=>{
//      res.send("Connected...");
// })


const port =  process.env.PORT || 3200;

app.listen(port,()=>{
    winston.info(`Listening on Port with CORS : ${port}`);
});







