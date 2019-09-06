const mongoose = require('mongoose');
const winston  = require('winston');

module.exports = function(){

    mongoose.connect('mongodb://localhost/vidly',{useCreateIndex:true, useFindAndModify: false ,useNewUrlParser:true})
    .then(()=> winston.info("Connected to MongoDB"));
    
    let db =  mongoose.connection;
     db.once('open', ()=> winston.error('DB READY TO USE'));
     db.on('error', () => winston.error('DB CONNECTION ERROR'));

}
