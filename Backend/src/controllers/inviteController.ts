import { Request, Response } from "express";
import { addDoc, doc, setDoc, collection, serverTimestamp, getDoc, arrayUnion, updateDoc } from "firebase/firestore";
import { Invite } from "./interface";
import db from "../config/firebaseConfig";

function fitterData(doc: any, data: any) {
    return {
        id: doc.id,
        name: data.name || "",
        description: data.description || "",
        ownerId: data.ownerId || "",
        createdAt: data.createdAt || null,
        members: Array.isArray(data.members) ? data.members.map((ref: any) => ref.id) : [],
        invites: Array.isArray(data.invites) ? data.invites.map((ref: any) => ref.id) : []
    };

}

const inviteRef = doc(collection(db, "Invitations"));
class inviteController {
    // /boards/:boardId/invite
    async invite(req: Request, res: Response) {
        try {
            const  {boardId}  = req.params ;
            const { memberId, emailMember, boardOwnerId } = req.body;

            if (!boardId || !boardOwnerId || !memberId || !emailMember) {
                return res.status(400).json({ success: false, message: "Missing params" });
            }
            const boardSnap =await getDoc(doc(db, "Boards", boardId));
            const boardOwner =  fitterData( boardSnap,  boardSnap.data())

            const invite: Invite = {
                boardId,
                boardOwnerId:boardOwner.ownerId,
                memberId,
                emailMember,
                status: "pending",
                createdAt: serverTimestamp(),
            };

            await setDoc(inviteRef, invite);

            return res.status(201).json({ success: true, invite });
        } catch (error) {
            return res.status(500).json({ success: false, message: "Server error", error });
        }
    }


    // Nhận / từ chối lời mời
    // /boards/:boardId/cards/:id/invite/accept
    async acceptInvite(req: Request, res: Response) {
        try {
            const { boardId, inviteId,cardId, } = req.params;
            const { action } = req.body;

            if (!boardId || !inviteId || !action|| !cardId) {
                return res.status(400).json({ success: false, message: "Missing params" });
            }

            const inviteRef = doc(db, "Invitations", inviteId);
            const inviteSnap = await getDoc(inviteRef);

            if (!inviteSnap.exists()) {
                return res.status(404).json({ success: false, message: "Invite not found" });
            }

            const inviteData: any = inviteSnap.data();

            if (action === "accepted") {
                // add board members
                const boardRef = doc(db, "Boards", boardId,"Cards",cardId);
                await setDoc(boardRef, {
                    list_member: arrayUnion(inviteData.memberId)
                }, { merge: true });

                // Update invite status
                await updateDoc(inviteRef, { status: "accepted" });
            } else if (action === "declined") {
                await updateDoc(inviteRef, { status: "declined" });
            }

            return res.status(200).json({ success: true, action });
        } catch (error) {
            return res.status(500).json({ success: false, message: "Server error", error });
        }
    }

}
export default new inviteController();