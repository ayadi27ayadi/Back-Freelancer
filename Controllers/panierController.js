import panierservices from "../services/panierservice.js";

const paniercontroller={

addPanier : async(req,res)=>{
   
   let panierdata=req.body
   let finisheddata = await panierservices.addPanier(panierdata);
   res.send(finisheddata);
  
   },


   listPanier : async(req,res)=>{
    let finisheddata = await panierservices.listPanier();
    res.send(finisheddata);
       
        },

  getallPanier : async(req,res)=>{
    let panierdata =  req.params.id
    // console.log(panierdata)
    let finisheddata = await panierservices.getallPanier(panierdata);
    res.send(finisheddata);
               
                },
}

export default paniercontroller