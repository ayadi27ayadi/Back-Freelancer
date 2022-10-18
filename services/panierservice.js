import Panier from "../Models/Panier.js";
import Post from "../Models/Post.js";
import User from "../Models/User.js";

const panierservices={

addPanier: async (panierdata) =>{
    console.log('panieerrrrrr',panierdata.userId)
    const newPanier = new Panier(panierdata)
  
        const userdata =  await User.findOne({
            _id: panierdata.freelanceId
        })
        console.log('userData', userdata)
        const postdata = await Post.findOne({
            _id: panierdata.postId

        })
        console.log('panierData',postdata)

        
        const savedPanier = await newPanier.save()
        const newdataPanier = [userdata,postdata,savedPanier]
        // console.log('newData', newdataPanier )
        return newdataPanier
},


listPanier: async (panierdata) => {
    console.log(panierdata)
      const paniers = await Panier.find();
      return paniers;
},

getallPanier: async(postdata) => {
console.log('postdata', postdata)
const data = await Panier.find({freelanceId:postdata});
return data
 
}



}
export default panierservices;