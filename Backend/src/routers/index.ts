import { Router } from "express";
import boardsRouter  from "./boardsRoute"
import authRouter  from "./authRouter"

import repositoriesController from "../controllers/repositoriesController";
const router = Router()

router.use("/boards",boardsRouter)
router.use("/auth",authRouter)


router.get("/repositories/:repositoryId/github-info",repositoriesController.attachToTask)

export default router;