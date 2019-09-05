const express = require('express');
const mongoose = require('mongoose');
const bodyParser =  require('body-parser');
const router   = express.Router();
const cors     = require('cors');
const app =  express();
const users = require('./routes/users');
const userModel =  require('./models/userModel');

const whitelist = [
  'http://localhost:3200',
  'http://localhost:3000'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(null, true)
      //callback('Not allowed')
      // callback(new Error('Not allowed by CORS'))
    }
  }, credentials: true
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost/vidly',{useCreateIndex:true ,useNewUrlParser:true})
.then(()=> console.log("Connected to MongoDB"));

let db =  mongoose.connection;
db.once('open', ()=> console.log('connected to the database'));
db.on('error',  console.error.bind(console,'MongoDB connection error'));

const port =  process.env.PORT || 3200;

app.listen(port,()=>{
    console.log(`Listening on Port with CORS : ${port}`);
});


app.get(function timeLog(){
     console.log('Time :', Date.now());
     next();
});

app.get('/', function(req,res){
   res.send("Home Page....");
});

app.get('/api/users', function(req,res){
     userModel.find((err,data)=>{
         if(err) return res.json({sucess : false, error: err})
         return res.json({ sucess:true ,data:data });
     })
 });

 app.post('/api/users', function(req,res){
 
    let {id, name, email, password} =  req.body;
    let _userModel =  new userModel();

    
    if(!id || !name || !email){
       return res.json({
          sucess : false,
          error  : 'INVALID INPUT',
          data   : req.body   
       });
    }

    _userModel.id = req.body.id;
    _userModel.name = req.body.name;
    _userModel.email = req.body.email;
    _userModel.password = req.body.password;

    _userModel.save((err)=>{
      if(err) return res.json({sucess:false, error : err});
      return res.json({sucess :  true});
    });

 });


