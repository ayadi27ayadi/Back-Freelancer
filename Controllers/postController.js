 import postservices from "../services/postService.js"

 const postcontroller={

 addPost : async(req,res)=>{
    
    let postdata=req.body
    // console.log('postdata', postdata)
    let finisheddata = await postservices.addPost(postdata);
    res.send(finisheddata);
   
    },
    getOnePost : async(req,res)=>{
    
        let postdata=req.params.id
        // console.log('postdata', postdata)
        let finisheddata = await postservices.getOnePost(postdata);
        res.send(finisheddata);
       
        },
    listPost : async(req,res)=>{
        let finisheddata = await postservices.listPost();
        res.send(finisheddata);
           
            },
            
    updatePost : async(req,res)=>{
        let postdata=req.params.id
        let dataID = req.body
        let finisheddata = await postservices.updatePost({postdata,dataID});
        res.send(finisheddata);
           
            },

                       
    deleteOnePost : async(req,res)=>{
        let postdata=req.params.id
        let finisheddata = await postservices.deleteOnePost(postdata);
        res.send(finisheddata);
           
            },

     deleteAllPost : async(req,res)=>{
         let postdata=req.params.id
         let finisheddata = await postservices.deleteAllPost(postdata);
         res.send(finisheddata);
                   
             },

    getCategories  : async(req,res)=>{
        let finisheddata = await postservices.getCategories();
        res.send(finisheddata);
               
                }
}

export default postcontroller