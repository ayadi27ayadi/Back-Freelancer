import mongoose from "mongoose";

const panierSchema = new mongoose.Schema({
    freelanceId: { type:String,
      ref: "User",
      required: true},
    postId: {  type:String,
      ref: "Post",
      required: true },
},
{
    timestamps: true,
  }
);

export default  mongoose.model('Panier', panierSchema )

