const jwt     =  require('jsonwebtoken');
const bcrypt  =  require('bcrypt') 
const express =  require('express');
const router  =  express.Router(); // instead this will work.
const {User}  =  require('../models/userModel');

//const app =  express();

// app.get('/', function(req,res){
//     res.send("Home Page....");
//  });

 router.get('/api/users', (req,res)=>{
    console.log("/api/users ->>> Router Working"); 
    User.find((err,data)=>{
          if(err) return res.json({sucess : false, error: err})
          return res.json({ sucess:true ,data:data });
      })
  });

  router.get('/api/users/:id', (req,res)=>{
    console.log("/api/users/:id ->>> Router Working"); 
  });
  
 router.delete('/api/users', (req,res)=>{
     let id =  req.body._id; 
     User.findByIdAndDelete( id ,(err,data)=>{
         if(err) return res.json({sucess : false, error: err})
         return res.json({ sucess:true ,data:data });
     });
 });
 
 router.put('/api/users', (req,res)=> {
     
     let {_id } =  req.body;
     
     User.findByIdAndUpdate( _id, req.body ,(err , data)=>{
         if(err) return res.json({sucess : false, error: err})
         return res.json({ sucess:true , data: data });
     });
 });
 
 router.post('/api/users', async(req,res)=>{
     
     console.log(req.body);

     let {id, name, email, password} =  req.body;
     let _User =  new User();
 
     if(!id || !name || !email){
        return res.json({
           sucess : false,
           error  : 'INVALID INPUT',
           data   : req.body   
        });
     }

     let user =  await User.findOne({email : email});

     if(user){
        return res.json({
           sucess : false,
           error  : 'ERROR_ALLREADY_REGISTERED',
           data   : 'Same email address is alreadty registered....'  
        });
     }
     

     _User.id = id;
     _User.name = name;
     _User.email = email;
     _User.password = password;
 
     _User.save((err)=>{
       if(err) return res.json({sucess:false, error : err});
       return res.json({sucess :  true});
     });
 
  });

  module.exports =  router;