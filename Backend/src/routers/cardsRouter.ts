import { Router } from "express";
import cardController from "../controllers/cardController";
import taskRouter from "./taskRoute"

const route = Router({ mergeParams: true });
route.get("/", cardController.getAll);
route.post("/", cardController.create);
route.get("/:id", cardController.getById);
route.get("/user/:userId", cardController.getByUser);
route.put("/:id", cardController.update);
route.post("/invite", cardController.invite);
route.post("/:id/invite/accept", cardController.acceptInvite);
route.delete("/:id", cardController.delete);

route.use("/:id/tasks", taskRouter)

export default route;
