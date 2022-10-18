import mongoose from "mongoose";

const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  userId: {
    type:String,
    ref: "user",
    required: true,
  },
  veriftoken: {
    type: String,
    required: true,
  },
});

const Token = mongoose.model("token", tokenSchema);
export default Token;
