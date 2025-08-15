import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

function verifyToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.redirect("/auth/signin")
    }

    const token = authHeader.replace("Bearer ", "").trim();

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { email: string };

        if (!decoded || !decoded.email) {
            return res.status(401).json({ redirect: "/auth/signin" });
        }
        else { 
            (req as any).user= decoded;
            next(); }

    } catch (error) {
        return res.status(401).json({ redirect: "/auth/signin" });
    }
}

export default verifyToken; 
