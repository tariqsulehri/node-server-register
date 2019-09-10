const auth    =  require('../middleware/auth');
const bcrypt  =  require('bcrypt'); 
const express =  require('express');
const _       = require('lodash');
const router  =  express.Router(); // instead this will work.
const {User}  =  require('../models/userModel');

router.get('/api/users', (req,res)=>{
    console.log("/api/users ->>> Router Working"); 
    User.find((err,data)=>{
          if(err) return res.json({sucess : false, error: err})
          return res.json({ sucess:true ,data:data });
      })
});

router.get('/api/users', (req,res)=>{
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
       
    const {name, email, password} =  req.body;

       if(!name || !email || !password){
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
                
        const salt     =  await  bcrypt.genSalt(10);
        user =  new User( _.pick(req.body,['name', 'email','password']))
        user.password =  await  bcrypt.hash(req.body.password, salt);
     
        await user.save();

        //await user.save((err)=>{
          //   if(err) return res.json({sucess:false, error : err});
        //     const token =  jwt.sign({_id : user._id }, 'node_secureJwtKey');
         //    return res.send(user);  
            //  return res.json(_.pick(user,['_id' ,'name', 'email','password']));
        //});

        const token = user.generateAuthToken();
          res
            .header("x-auth-token",token)
            .header("access-control-expose-headers","x-auth-token")
            .send(_.pick(user,['_id' ,'name', 'email'])); 

    });

  router.get('/me',auth,(req, res)=>{
     const user = User.findById(req.user._id).select('-password');
     res.send(user);
  });

  module.exports =  router;