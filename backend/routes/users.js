import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/users.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/checkauth", verifyToken, (req,res,next)=>{
    res.send("Đã đăng nhập")
})
router.get("/checkUser/:id", verifyUser, (req,res,next)=>{
    res.send("User nè")
})
router.get("/checkAdmin/:id", verifyAdmin, (req,res,next)=>{
    res.send("Admin nè")
})

//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

//GET ALL
router.get("/", verifyAdmin, getUsers);

export default router;
