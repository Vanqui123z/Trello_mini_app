import { Router } from "express";
import boardsRouter  from "./boardsRoute"
import authRouter  from "./authRouter"

import repositoriesController from "../controllers/repositoriesController";
import verifyToken from "../middlewares/auth";
const router = Router()

router.use("/boards",verifyToken,boardsRouter)
router.use("/auth",authRouter)


router.get("/repositories/:repositoryId/github-info",repositoriesController.attachToTask)

export default router;