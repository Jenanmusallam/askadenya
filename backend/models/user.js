const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var express = require('express');

const base = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        default:"Add your Phone Number",
    },
    password: {
        type: String,
    },
    avatar:{
      type: String,
      default:'https://ramcotubular.com/wp-content/uploads/default-avatar.jpg'
    }
  });
  const UsersModel = mongoose.model('users', base);
  

  module.exports=UsersModel