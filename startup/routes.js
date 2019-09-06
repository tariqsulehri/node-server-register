const express = require('express');
const users   = require('../routes/users');  
const bodyParser =  require('body-parser');


module.exports =  function(app){
    app.use(express.json());
    // app.use(bodyParser.json({extended:true}));
    app.use(express.urlencoded({extended:true})); //to avoid body-parser depricated

    app.use('/', users);
}

