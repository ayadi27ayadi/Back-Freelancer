import User from "../Models/User.js";
import sendEmail, { generateToken } from "../utils.js";
import bcrypt from "bcryptjs";
import Token from "../Models/Token.js";
import crypto from "crypto"

export const usersservices={
  /* création de compte*/
  createuser:async (req,res)=>{

    // Insert the new user if they do not exist yet.
    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).send("User with given email already exist!");

    user = await new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        img: req.body.img,
        freelancerUser: req.body.freelancerUser,
    }).save();

    // Hash the password before saving into database.
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      email: createdUser.email,
      phoneNumber:createdUser.phoneNumber,
      freelancerUser: createdUser.freelancerUser,
      token: generateToken(createdUser),
    });
    // Generating the token for user verification
    const veriftoken=crypto.randomBytes(16).toString('hex');
    const token = new Token({ userId: user._id, veriftoken });
    await token.save();
   
    console.log(token)

    // Send varification email
    const redicectUrl="http://localhost:3000/users/confirm";
    await sendEmail(user.email,redicectUrl,veriftoken);
    console.log(veriftoken)
    res.status(200).send({
        message: "Email Verification link sent to your email",
    });
  },
  /*géneration de token de verification*/
  verifeteuser:async (req, res) => {
    
    try {
      const token = await Token.findOne({
        token: req.params.token,
      });
      console.log(token.userId);
      if (!token) return res.status(400).send("Invalid link");
  
      await User.updateOne({ _id: token.userId }, { $set: { verified: true } });
      await Token.findByIdAndRemove(token._id);
  
      res.send("email verified sucessfully");
    } catch (error) {
      res.status(400).send("An error occured");
    }
  },
/*connection au compte */
  signin:async(req, res)=>{
    const user= await User.findOne({email:req.body.email });
    if(user && user.verified== false)
    {
      res.status(401).send({message:'you have to activate your compte'});
        return;
    }
    
    if(user && user.verified){
      if(bcrypt.compareSync(req.body.password, user.password)){
        res.send(
          {
            _id:user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email:user.email,
            password:user.password,
            freelancerUser:user.freelancerUser,
            verified:user.verified,
            token:generateToken(user),
  
          }
        );
       
      }
    
      return;
    }
    res.status(401).send({message:'invalid user or password'});
  },
  getUserById: async(req, res) => {
    const id = req.params.id;
  
    User.findById({id})
      .then(data => {
        if (!data)
          res.status(404);
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500);
      });
  },


}


