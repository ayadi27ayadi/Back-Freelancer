import mongoose from 'mongoose'


const postSchema = new mongoose.Schema({
    userId: {type: String, required: true, },
    img: { type: String,},
    desc: {type: String, max: 500,},
    competence: {type: String, max: 500,},
    categories: {type: String, max: 500, },
    evaluation: {type: Number, max:10},
},
{
    timestamps: true,
  }
);

export default  mongoose.model('Post', postSchema )


