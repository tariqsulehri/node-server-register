const mongoose =  require('mongoose');
const Schema =  mongoose.Schema;

const DataSchema =  new Schema(
     { 
        id : String,
        name : String,
        email : String,
        password : String
     },
     {timestamps :  true}

);

module.exports =  mongoose.model("userModel",DataSchema);