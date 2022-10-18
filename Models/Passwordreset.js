import mongoose from 'mongoose';

const passwordResetSchema = new mongoose.Schema(
  {
    userId:String,
    resetString:String,
    createdAt:Date,
    expriresAt : Date,
  },
 
);
const PasswordReset = mongoose.model('PasswordReset', passwordResetSchema);

export default PasswordReset;