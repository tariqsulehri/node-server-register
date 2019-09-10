const jwt     =  require('jsonwebtoken');
const mongoose =  require('mongoose');
const Schema =  mongoose.Schema;

const userSchema =  new Schema(
     { 
        id : String,
        name : String,
        email : String,
        password : String
     },
     {timestamps :  true}

);

userSchema.methods.generateAuthToken =  function(){
   const token =  jwt.sign({_id : this._id }, 'node_secureJwtKey');
   return token;
}

const User =  mongoose.model("userModel", userSchema);

exports.User =  User;


//echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
