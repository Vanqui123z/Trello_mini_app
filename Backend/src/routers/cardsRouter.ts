import { Router } from "express";
import cardController from "../controllers/cardController";
import inviteController from "../controllers/inviteController";
import taskRouter from "./taskRoute"

const route = Router({ mergeParams: true });
route.get("/", cardController.getAll);
route.post("/", cardController.create);
route.get("/:id", cardController.getById);
route.get("/user/:userId", cardController.getByUser);
route.put("/:id", cardController.update);
route.post("/invite", inviteController.invite);
route.post("/:id/invite/accept", inviteController.acceptInvite);
route.delete("/:id", cardController.delete);

route.use("/:id/tasks", taskRouter)

export default route;
