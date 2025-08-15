import { Router } from "express";
import boardController from "../controllers/boardController"
import cardsRouter from "./cardsRouter"
const route = Router()

route.post("/", boardController.create);
route.get("/", boardController.getAll);
route.get("/:id", boardController.getById);
route.put("/:id", boardController.update);
route.delete("/:id", boardController.delete);
route.use("/:id/cards",cardsRouter)

export default route;
