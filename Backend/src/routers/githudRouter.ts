import { Router } from "express";
import repositoriesController from "../controllers/repositoriesController"
const route = Router()


route.post("/github-attach", repositoriesController.attachToTask);// 3. Lấy danh sách GitHub attachments
route.get("/github-attachments", repositoriesController.getAttachments);// 4. Xóa GitHub attachment
route.delete("/github-attachments/:attachmentId", repositoriesController.deleteAttachment);

export default route;
