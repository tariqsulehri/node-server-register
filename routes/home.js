const auth    =  require('../middleware/auth');
const bcrypt  =  require('bcrypt'); 
const express =  require('express');
const _       = require('lodash');
const router  =  express.Router(); // instead this will work.
const {User}  =  require('../models/userModel');
const mysql    = require('mysql');
const mysqlConfig = require('../startup/mysqlConfig');
const uuid  = require('uuid');


const mysqlDB =  mysql.createConnection({
     host : 'localhost',
     user : 'root',
     password : '123',
     database : 'register' 
});

router.get('/', (req,res)=>{

    
    mysqlDB.connect((err)=>{
        if(err){
             console.log('Error connecting backend');
             return;
        }
        console.log('connected with mysql database');
    });

    let stmt = `INSERT INTO registered_users (user_id, first_name, last_name, email, password ,isadmin )
                                        VALUES(?, ?, ?, ?, ?, ?)`; 
    let vals = [uuid() ,'Muhammad', 'BinTariq', 'muhammad@hotmail.com','pwd123', true]

    mysqlDB.query(stmt, vals,(err, results,fields)=>{
            if(err){
                console.error(uuid(),err.message);
                return res.send(err.message);
            }else{
                return res.send(results);                
            }   
    });

    mysqlDB.end();

    // mysqlDB.query("SELECT * FROM registered_users ", 
    // function(err, rows, fields){
    //     if(!err){
    //         console.log('The Solution is :', rows);
    //     }else{
    //         console.log('Error while quering data..');
    //     }
    // });



});

module.exports =  router;