import mongoose from "mongoose";

const panierSchema = new mongoose.Schema({
    freelanceId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    apayer: {type: Boolean},
    prixTotale: {type: String},
    panierItems: [
        {
         userId: { type: String},
         img: { type: String},
         desc: {type: String, max: 500,},
         competence: {type: String, max: 500,},
         categories: {type: String, max: 500,},
         evaluation: {type: String, max: 500,},
         postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },

        },
      ],
},
{
    timestamps: true,
  }
);

export default  mongoose.model('Panier', panierSchema )

