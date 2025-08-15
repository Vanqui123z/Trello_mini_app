import { Request, Response } from "express";
import{serverTimestamp} from "firebase/firestore"


  function fitterData (doc:any,data:any){
    return {
        title: data.title||"",
        description: data.description||"",
        status: data.status||"",             
        createdAt: data.createdAt|| null,
        ownerId: data.ownerId||"",
        members: Array.isArray(data.members)?data.members.map((ref:any)=>{return ref}):[]  
    }
}


class TaskController {
   
  async create(req: Request, res: Response) {
    try {
      const {title, description, status, createdAt, ownerId, assignedMembers}= req.body;
      const card = {
        title: string
        description: string
        status: string             
        createdAt: timestamp
        ownerId: string
        assignedMembers: [userId]   
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
  // Gán thành viên vào task
  assignMember(req: Request, res: Response) {
    const { boardId, id, taskId } = req.params;
    res.send(`Assign member to task ${taskId} in card ${id} of board ${boardId}`);
  }

  // Lấy thành viên của task
  getMembers(req: Request, res: Response) {
    const { boardId, id, taskId } = req.params;
    res.send(`Get members of task ${taskId} in card ${id} of board ${boardId}`);
  }

  // Xóa thành viên khỏi task
  removeMember(req: Request, res: Response) {
    const { boardId, id, taskId, memberId } = req.params;
    res.send(`Remove member ${memberId} from task ${taskId} in card ${id} of board ${boardId}`);
  }
}

export default new TaskController();
