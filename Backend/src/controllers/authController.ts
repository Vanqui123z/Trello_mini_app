import { Request, Response } from "express";
import { collection, query, where, getDocs, setDoc, addDoc, serverTimestamp, Timestamp, doc, and } from "firebase/firestore"
import db from "../config/firebaseConfig";
import jwt from "jsonwebtoken";
import { EmailVerificationCodes, User } from "./interface";
import { sendVerificationCode } from "../utils/email";


function fitterData(doc: any, data: any) {
    return {
        email: data.email || undefined,
        code: data.code,
        expiresAt: data.expiresAt || null,
        createdAt: data.createdAt || null,


    };

}

const usersCollection = collection(db, "Users");
const OTPCollection = collection(db, "emailVerificationCodes");
const JWT_SECRET = process.env.JWT_SECRET || "secret";

class authController {


    async signup(req: Request, res: Response) {

        try {
            const { email } = req.body

            //tạo code  
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            const expires = Timestamp.fromDate(new Date(Date.now() + 5 * 60 * 1000));
            await sendVerificationCode(email, code);

            const otpData: EmailVerificationCodes = {
                email: email,
                code: code,
                createdAt: serverTimestamp(),
                expiresAt: expires
            }
            await addDoc(OTPCollection, otpData);

            return res.status(200).json({ message: "thanh cong", otpData });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: (error as Error).message });
        }
    }


    // Signin: check code and return JWT
    async signin(req: Request, res: Response) {
        try {
            const { email, code } = req.body;
            if (!email || !code) return res.status(400).json({ error: "Email and code required" });
            // querry for check otp
            const q = query(OTPCollection,
                where("email", "==", email),
                where("code", "==", code)
            );
            const snapshot = await getDocs(q);
            if (snapshot) { res.status(200).json("thanh cong") }
            const otpDoc = snapshot.docs.map((ref) => { return fitterData(ref, ref.data()) });

            // new user
                // get email in Users table
                let idUser;
                const qUser = query(usersCollection, where("email", "==", email));
                const snapshotUser = await getDocs(qUser);
                const userDoc = snapshotUser.docs.map((ref) => {idUser=ref.id; return fitterData(ref, ref.data()) });
                // if email of Users match email of  emailVerificationCodes 
                if (userDoc[0]?.email == otpDoc[0]?.email) {
                    return  res.redirect("/auth/signin")
                } else {
                    const newUser: User = {
                        
                        boardId: "",
                        email: email, 
                        createdAt: serverTimestamp(),
                        boards:[],
                    }
                    await setDoc(doc(usersCollection), newUser)
                }
                console.log("dUser",idUser)
                // // Generate JWT
                const token = jwt.sign({idUser, email }, JWT_SECRET, { expiresIn: "20m" });
                return res.status(200).json({ token: token });


        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: (error as Error).message });
        }
    }
}

export default new authController();