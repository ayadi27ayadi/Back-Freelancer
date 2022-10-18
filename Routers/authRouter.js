import express from "express";
import bcrypt from "bcryptjs";
import PasswordReset from "../Models/Passwordreset.js";
import User from "../Models/User.js";
import { usersservices } from "../services/userService.js";
import { sendResetEmail } from "../SendResetMail.js";
const router = express.Router();

router.post("/signup", usersservices.createuser);

router.get("/confirm/:token", usersservices.verifeteuser);
//create singin router
router.post("/signin", usersservices.signin);

router.post("/forget", async (req, res) => {
  const { email, redicectUrl } = req.body;
  //chercher si l'email existe
  User.find({ email })
    .then((data) => {
      if (data.length) {
        //user existe
        //proceesd with email
        sendResetEmail(data[0], redicectUrl, res);
      }
    })
    .catch((error) => {
      res.status(500).json(error)
    });
});

router.post("/resetpassword", async (req, res) => {
  let { userId, resetString, newPassword } = req.body;
  PasswordReset.find({ userId })
    .then((result) => {
      if (result.length > 0) {
        const { expiresAt } = result[0];
        const hashedResetString = result[0].resetString;
        //chek for expireRset
        if (expiresAt < Date.now()) {
          PasswordReset.deleteOne({ userId })
            .then(
              //delet succuss
              res.json({
                status: "SUCCESS",
                message: "mot de passe reinitialisée !",
              })
            )
            .catch((error) => {
              res.status(500).json(error)
            });
        } else {
          //void reset record existe
          //compare the hash
          bcrypt
            .compare(resetString, hashedResetString)
            .then((result) => {
              if (result) {
                const saltRounds = 10;
                bcrypt
                  .hash(newPassword, saltRounds)
                  .then((hashedNewPassword) => {
                    //update pass
                    User.updateOne(
                      { _id: userId },
                      { password: hashedNewPassword }
                    )
                      .then(() => {
                        //update complete
                        PasswordReset.deleteOne({ userId })
                          .then(() => {
                            res.json({
                              status: "SUCCESS",
                              message: "Password changed suuceccfuly",
                            });
                          })
                          .catch((error) => {
                            res.status(500).json(error)
                          });
                      })
                      .catch((error) => {
                        res.status(500).json(error)
                      });
                  })
                  .catch((error) => {
                    res.status(500).json(error)
                  });
              } else {
                //record in correct
                res.json({
                  status: "FAILED",
                  message: "cheking password reset failed",
                });
              }
            })
            .catch((error) => {
              res.status(500).json(error)
            });
        }
      } else {
        res.json({
          status: "SUCCESS",
          message: "Password changed suuceccfuly",
        });
      }
    })
    .catch((error) => {
      res.status(500).json(error)
    });
});
router.get("/:id", usersservices.getUserById);



export default router;
