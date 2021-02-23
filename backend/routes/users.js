var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UsersModel = require('../models/user');
var gravatar = require('gravatar');


/* GET users listing. */
/* هاي بنستعملها بالبروفايل بيج لنجيب معلومات اليوزير */
router.get('/:id', function(req, res) {
  UsersModel.findById(req.params.id, (err, r)=>{
    if (err) throw err;
    if (r){
      res.send(r);
    }
  })
});

/* login */

router.post('/login', function(req, res) {
  if(req.body.email && req.body.password){
    UsersModel.findOne({email : req.body.email}, (err, r)=>{
      if (err) res.status(500).json(err);
      if (!r){
        res.send("user not found");
      }
      else if (r.password) {
        bcrypt.compare(req.body.password, r.password, function(err, result) {
          if (result){
            res.json(r);
          }
          else{
            res.send("wrong password");
          }
      });
      }

      
    })
  }
  else{
    res.status(404).send("Bad request")
  }


});


router.post('/signup',  function(req, res, next) {
  if(req.body.email && req.body.password && req.body.fullName){
  
    UsersModel.findOne({email : req.body.email},  async(err, r)=>{
      if (err)res.status(500).json(err)
      ;
      if (r){
        res.send("user already registered");
      }
      else{
        //هاي لتشفير الباسورد
         bcrypt.hash(req.body.password, 10, function(err, hash) {
           if (err) {
             res.status(500).json(err)
           }
               // const img = await gravatar.url("a@a.com",{s:"200", d:"mp"});
        const user =  new UsersModel({
          fullName: req.body.fullName,
          email: req.body.email,
          password: hash,
          // phone: req.body.phone,
          // avatar: img
      });
      user.save()
      .then(data =>{
        res.json(data)
      })
      });
  
      }
  
    })
  }
  else{
    res.send("Bad request")
  }
});


router.post('/facebook', function(req, res, next) {
  UsersModel.findOne({email : req.body.email}, (err, r)=>{
    if (err) res.status(500).json(err);
    if (r){
      res.json(r);
    }
    else{
      const user = new UsersModel({
        fullName: req.body.fullName,
        email: req.body.email,
        avatar: req.body.avatar
    });
    user.save()
    .then(data =>{
      res.json(data)
    })
    }
  })
});
/* هاي لتعديل معلومات اليوزر بصفحة البروفايل */

router.put('/update/:id',  function(req, res, next) {
  UsersModel.findByIdAndUpdate(req.params.id,{fullName: req.body.fullName,
    phone: req.body.phone,},  (err, r)=>{
    if (err) res.status(500).json(err);
    if (r){
      res.json(r);
    }
  })
});

module.exports = router;
