const mongoose = require('mongoose');

const appliance_schema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  state:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'State'
  },
  
})