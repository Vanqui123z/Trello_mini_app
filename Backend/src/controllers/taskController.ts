import { Request, Response } from "express";
import { addDoc,getDoc,doc, collection, serverTimestamp,setDoc, deleteDoc, getDocs} from "firebase/firestore";
import db from "../config/firebaseConfig";


const collectionRef = collection(db,"Tasks");


  function fitterData (doc:any,data:any){
    return {
        title: data.title||"",
        description: data.description||"",
        status: data.status||"",             
        createdAt: data.createdAt|| null,
        ownerId: data.ownerId||"",
        numbers: Array.isArray(data.members)?data.members.map((ref:any)=>{return ref}):[]  
    }
}


class TaskController {
   
  async create(req: Request, res: Response) {
    try {
      const {title, description, status, ownerId, numbers=[]}= req.body;
      const task = {
        title,
        description,
        status,             
        ownerId,
        numbers,   
        createdAt: serverTimestamp
    }
    const newTask = await addDoc(collectionRef,task)
    res.status(200).json({message:"success",newTask})
    } catch (error) {
    res.status(500).json({message:"faile",error})
    }
  }
  async getAll(req: Request, res: Response) {
    try {
      const getAllTasks = await getDocs(collectionRef);
      const tasks=  getAllTasks.docs.map((tasks)=>{return fitterData(tasks,tasks.data())})
      res.status(200).json({message:"succes",tasks})
    } catch (error) {
      res.status(500).json({message:"failed!"})
    }
  }
  async getById(req: Request, res: Response) {
     try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ status: "failed", message: "Missing id" });

            const docSnap = await getDoc(doc(db, "Tasks", id));
            if (!docSnap.exists()) return res.status(404).json({ status: "failed", message: "task not found" });

            res.status(200).json({ status: "success", board: fitterData(docSnap, docSnap.data()) });
        } catch (error) {
            res.status(500).json({ status: "failed", message: "getById failed", error });
        }
  }
  async update(req: Request, res: Response) {
   try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ status: "failed", message: "Missing id" });
            await setDoc(doc(db, "Tasks", id),{contents:"some-data"},{merge:true});
            res.status(200).json({ status: "success"});
        } catch (error) {
            res.status(500).json({ status: "failed", message: "getById failed", error });
        }
  }
  async delete(req: Request, res: Response) {
     try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ status: "failed", message: "Missing id" });
            await deleteDoc(doc(db, "Tasks", id));
            res.status(200).json({ status: "success"});
        } catch (error) {
            res.status(500).json({ status: "failed", message: "getById failed", error });
        }
  }
  // Gán thành viên vào task
  assignMember(req: Request, res: Response) {
    const { boardId, id, taskId } = req.params;
    res.send(`Assign member to task ${taskId} in task ${id} of board ${boardId}`);
  }

  // Lấy thành viên của task
  getMembers(req: Request, res: Response) {
    const { boardId, id, taskId } = req.params;
    res.send(`Get members of task ${taskId} in task ${id} of board ${boardId}`);
  }

  // Xóa thành viên khỏi task
  removeMember(req: Request, res: Response) {
    const { boardId, id, taskId, memberId } = req.params;
    res.send(`Remove member ${memberId} from task ${taskId} in task ${id} of board ${boardId}`);
  }
}

export default new TaskController();
