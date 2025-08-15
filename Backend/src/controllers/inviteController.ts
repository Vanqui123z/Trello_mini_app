import { Request, Response } from "express";
import { addDoc, getDoc, doc, collection, serverTimestamp, setDoc, deleteDoc, getDocs } from "firebase/firestore";
import { Invite } from "./interface";
import db from "../config/firebaseConfig";


//     boardId: string
//     boardOwnerId: string
//     memberId: string           // Người được mời
//     emailMember: string        // Email người được mời (nếu chưa có tài khoản)
//     status: string             // "pending" | "accepted" | "declined"
//     createdAt: timestamp

class inviteController {
    async invite(req: Request, res: Response) {
        try {
            const { boardId } = req.params;
            const { memberId, emailMember } = req.body;
            const boardOwnerId = req.params.boardOwnerId;

            const invite: Invite = {
                boardId,
                boardOwnerId,
                memberId,
                emailMember,
                status: "pending",
                createdAt: serverTimestamp()
            }
            return res.status(200).json({ success: true, invite });
        } catch (error) {
            return res.status(500).json({ success: false, message: "Server error" });

        }
    }

    // Nhận / từ chối lời mời
    acceptInvite(req: Request, res: Response) {
        const { boardId, id } = req.params;
        res.send(`Accept or reject invite for card ${id} in board ${boardId}`);
    }
}
export default new inviteController();