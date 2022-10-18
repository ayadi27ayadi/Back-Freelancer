import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import PasswordReset from "./Models/Passwordreset.js";
 //send password reset
 const user = "diamellepfe@gmail.com";
const pass = "oznumkplfnyqwjte";
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: user,
        pass: pass,
    },
});
export const sendResetEmail= ({_id,email},redictUrl,res)=>{
    const resetString = uuidv4() + _id;
    //clear existing reset record
    PasswordReset
    .deleteMany({userId:_id})
    .then(
      result=>{
        //delete success
        //send email
        const sendForgotPassword = {
        
              from: user,
              to: email,
              subject: "Lien pour réinitialiser le mot de passe",
              html: `<div>
              'Vous recevez ceci parce que vous (ou quelqu'un d'autre) avez demandé la réinitialisation du mot de passe de votre compte.\n\n
              Veuillez cliquer sur le lien suivant ou collez-le dans votre navigateur pour terminer le processus dans l'heure suivant sa réception :\n\n 
              <a href=${redictUrl + "/" + _id +"/"+ resetString}>ici</a>
            Si vous ne l'avez pas demandé, veuillez ignorer cet e-mail et votre mot de passe restera inchangé.\n'
              </div>`,
          
      };
      //hash reset string
      const saltRounds=10;
      bcrypt
      .hash(resetString, saltRounds)
      .then(
        hashedResetString=>{
          //set value in password reset 
          const newPasswordResetString = new PasswordReset({
            userId:_id,
            resetString:hashedResetString,
            createdAt:Date.now(),
            expiresAt:Date.now()+360000
          });
          newPasswordResetString
          .save()
          .then(
            ()=>{
              transporter
              .sendMail(sendForgotPassword)
              .then( 
                ()=>
                {
                  //reset email and pass
                  res.json({
                    status:"PENDING",
                    message:"Un message de verification d'identité est envoyer a votre mail",
                  })
                }
              )
              .catch(error=>{
                console.log(error)
                res.json({
                  status:"FAILED",
                  message:"error"
                })
              })
            }
          )
          .catch(error=>{
            console.log(error)
            res.json({
              status:"FAILED",
              message:"error"
            })
          })
          
        }
      )
      .catch(error=>{
        console.log(error);
        res.json({
         status:"FAILED",
         message:"error"
        });
      })
      
      }
    )
    .catch(error=>{
      console.log(error);
      res.json({
        status:"FAILED",
        message:"can not clear existing records!",
      });
     } )
  
    
  }