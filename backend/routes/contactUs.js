var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const base = new mongoose.Schema({
    msg: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
  },
  {
      timestamps:{ createdAt: 'created_at' }
  }
  
  );
  

  module.exports=base

  const Model = mongoose.model("contactUs", base);

router.post('/', function(req, res, next) {
    const newData = new Model (req.body)
    newData.save(function(err){
        if (err) {
        res.send("data not saved");
        return handleError(err);
    }
  });
  res.send("data saved");
});

module.exports = router;
