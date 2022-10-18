import express from "express";
import paniercontroller from "../Controllers/panierController.js";
const router = express.Router();


/* Add au panier */
router.post("/addpanier", paniercontroller.addPanier);
/* Get all Panier */
router.get("/listpanier", paniercontroller.listPanier);
/* Get all Panier in the user */
router.get("/getallPanier/:id", paniercontroller.getallPanier)




export default router;
