var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const historybase = require('../Schema/history');

const base = new mongoose.Schema({
  name: {
      type: String,
      required: true
  }, 
  pid: {
      type: String,
      required: true
  },
  number: {
      type: Number,
  },
  adds:{
    type: [Object],
  },
  imgUrl:{
    type:String,
  }
  ,
  price:{
    type:Number,
  }
});

router.get('/:id', function(req, res, next) {
  if (req.params.id) {
    
    const CartModel = mongoose.model("cart-"+req.params.id, base);
    CartModel.find((e,r) => {
      if(e){
          console.log(e)
      }
      else{
          res.send(r);
      }
  })
  }else{
    res.status(404)
  }
});

router.post('/:id', function(req, res) {
  const CartModel = mongoose.model("cart-"+req.params.id, base);
  const newData = new CartModel (req.body)
  newData.save(function(err){
      if (err) {
      res.send("data not saved");
      return handleError(err);
  }
});
res.send("data saved");
});

router.put('/update/:userid/:oid', function(req, res) {
  const CartModel = mongoose.model("cart-"+req.params.userid, base);
  CartModel.updateOne({_id: req.params.oid},{number: req.body.number,adds: req.body.adds, },function (err, docs) { 
      if (err){ 
          console.log(err) 
      } 
      else{ 
          res.send("data updated");
      } 
  })
// res.send("data saved");
});

router.delete('/all/:userid', function(req, res) {
    const CartModel = mongoose.model("cart-"+req.params.userid, base);
    const historyModel = mongoose.model("history"+req.params.userid, historybase);
    CartModel.find((e,r) => {
      if(e){
        res.status(500).json(err)
      }
      else{
            const newData = new historyModel ({p: r})
            newData.save().then(()=>{
                CartModel.deleteMany().then(()=>{
          res.send("all done");

                })
            })
      }
  })
  });

router.delete('/:userid/:oid', function(req, res) {
  const UserModel = mongoose.model("cart-"+req.params.userid, base);
  UserModel.findByIdAndDelete(req.params.oid)
  .then(()=>{
    res.send("data delete");
  })
// res.send("data saved");
});



module.exports = router;
