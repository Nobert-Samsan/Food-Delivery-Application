import express from "express"
import { addCart,removeFromCart,getCart } from "../controllers/cartControllers.js"
import authMiddleware from "../middleware/auth.js";


const cartRouter = express.Router();

cartRouter.post("/add",authMiddleware,addCart)
cartRouter.post("/remove",authMiddleware,removeFromCart)
cartRouter.post("/get",authMiddleware,getCart)


export default cartRouter;