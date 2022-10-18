import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        require: true,
        min:3,
        max: 20,
        unique: true,
    },
    lastName:{
        type: String,
        require: true,
        min:3,
        max: 20,
        unique: true,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  phoneNumber: {type: Number},
  img: {type: String, required: false},
  freelancerUser: { type: Boolean,default: false },
  verified: {type: Boolean, default: false, },
},
{
    timestamps: true,
  }
);

export default  mongoose.model('User', userSchema )


