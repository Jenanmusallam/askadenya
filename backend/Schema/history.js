const mongoose = require('mongoose');
var express = require('express');

const base = new mongoose.Schema({
    p: {
        type: Array,
        required: true
    },
  },
  {
      timestamps:{ createdAt: 'created_at' }
  }
  
  );
  

  module.exports=base