const mongoose=require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({ //Schema for a new user 
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique: true,
  },
  password:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    default:Date.now,
  }
});

module.exports=mongoose.model('user',UserSchema)