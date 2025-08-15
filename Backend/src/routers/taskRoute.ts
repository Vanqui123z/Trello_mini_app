import { Router } from "express";
import taskController from "../controllers/taskController"
import githudRouter from "./GithudRouter"
const route = Router()

route.get("/", taskController.getAll);
route.post("/", taskController.create);
route.get("/:taskId", taskController.getById);
route.put("/:taskId", taskController.update);
route.delete("/:taskId", taskController.delete);
route.post("/:taskId/assign", taskController.assignMember);
route.get("/:taskId/assign", taskController.getMembers);
route.delete("/:taskId/assign/:memberId", taskController.removeMember);

route.use("/:taskId",githudRouter)


export default route;
