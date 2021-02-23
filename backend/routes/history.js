var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const historybase = require('../Schema/history');


router.get('/:id', function(req, res, next) {
  if (req.params.id) {
    
    const historyModel = mongoose.model("history"+req.params.id, historybase);
    historyModel.find((e,r) => {
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

module.exports = router;
