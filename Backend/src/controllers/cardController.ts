import { Request, Response } from "express";
import { addDoc,getDoc,doc, collection, serverTimestamp,setDoc, deleteDoc, getDocs} from "firebase/firestore";
import db from "../config/firebaseConfig";


const collectionRef= collection(db, "Tasks")

function fitterData (doc:any,data:any){
    return {
        name: data.name||"",
        description: data.description||"",
        createdAt: data.createdAt|| null,
        ownerId: data.ownerId|| "",          
        members: Array.isArray(data.members)?data.members.map((ref:any)=>{ref.id}):[],         
        tasks_count: data.tasks_count,
    }
}

class CardController {
  
  async create(req: Request, res: Response) {
    try {
      const {name,description,ownerId,members,tasks_count}= req.body;
      const card = {
        name,
        description,
        createdAt:serverTimestamp,
        ownerId,
        members,
        tasks_count,  
    }
    const newCard = await addDoc(collectionRef,card)
    res.status(200).json({message:"success",newCard})
    } catch (error) {
    res.status(500).json({message:"faile",error})
    }
  }
  async getAll(req: Request, res: Response) {
    try {
      const getAllCards = await getDocs(collectionRef);
      const cards=  getAllCards.docs.map((cards)=>{return fitterData(cards,cards.data())})
      res.status(200).json({message:"succes",cards})
    } catch (error) {
      res.status(500).json({message:"failed!"})
    }
  }
  async getById(req: Request, res: Response) {
     try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ status: "failed", message: "Missing id" });

            const docSnap = await getDoc(doc(db, "Cards", id));
            if (!docSnap.exists()) return res.status(404).json({ status: "failed", message: "Card not found" });

            res.status(200).json({ status: "success", board: fitterData(docSnap, docSnap.data()) });
        } catch (error) {
            res.status(500).json({ status: "failed", message: "getById failed", error });
        }
  }
  async update(req: Request, res: Response) {
   try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ status: "failed", message: "Missing id" });
            await setDoc(doc(db, "Cards", id),{contents:"some-data"},{merge:true});
            res.status(200).json({ status: "success"});
        } catch (error) {
            res.status(500).json({ status: "failed", message: "getById failed", error });
        }
  }
  async delete(req: Request, res: Response) {
     try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ status: "failed", message: "Missing id" });
            await deleteDoc(doc(db, "Cards", id));
            res.status(200).json({ status: "success"});
        } catch (error) {
            res.status(500).json({ status: "failed", message: "getById failed", error });
        }
  }
  invite(req: Request, res: Response) {
    const { boardId } = req.params;
    res.send(`Invite user to board ${boardId}`);
  }
  
  // Lấy card theo user
  getByUser(req: Request, res: Response) {
    const { boardId, userId } = req.params;
    res.send(`Get cards in board ${boardId} for user ${userId}`);
  }
  // Nhận / từ chối lời mời
  acceptInvite(req: Request, res: Response) {
    const { boardId, id } = req.params;
    res.send(`Accept or reject invite for card ${id} in board ${boardId}`);
  }

}

export default new CardController();
