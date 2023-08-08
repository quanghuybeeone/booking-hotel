import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token){
        return next(createError(401,"Bạn chưa được xác thực!"))
    }

    jwt.verify(token, process.env.JWT, (err, user)=>{
        if(err) return next(createError(403,"Token không tồn tại!"))
        req.user = user;
        next()
    })
}

export const verifyUser = (req, res, next)=>{
    verifyToken(req, res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            return next(createError(403,"Bạn chưa được xác thực"))
        }
    })
}

export const verifyAdmin = (req, res, next)=>{
    verifyToken(req, res,()=>{
        if(req.user.isAdmin){
            next()
        }else{
            return next(createError(403,"Bạn chưa được xác thực"))
        }
    })
}