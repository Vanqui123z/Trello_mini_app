import { Router } from "express";
import repositoriesController from "../controllers/repositoriesController"
const route = Router()

// Lấy danh sách GitHub attachments
route.post("/github-attach", repositoriesController.attachToTask);
// Xóa GitHub attachment
route.get("/github-attachments", repositoriesController.getAttachments);
route.delete("/github-attachments/:attachmentId", repositoriesController.deleteAttachment);

export default route;
