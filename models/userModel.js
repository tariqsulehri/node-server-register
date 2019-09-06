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

const User =  mongoose.model("userModel",DataSchema);

exports.User =  User;
