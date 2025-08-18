import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";


export interface AuthRequest extends Request {
  user?: { userId: string ,email:string}; 
}
function verifyToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        // return res.redirect("/auth/signin")
        return next()
    }

    const token = authHeader.replace("Bearer ", "").trim();
    if(token){
            next(); 
    }else{
      return res.json("no token ")
    }

  }


export default verifyToken;