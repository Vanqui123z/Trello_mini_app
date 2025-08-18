import express from "express";
import repositoriesController from "../controllers/repositoriesController"
const taskRouter = express.Router({ mergeParams: true }); 


// Lấy danh sách GitHub attachments
taskRouter.post("/github-attach", repositoriesController.attachToTask);
// Xóa GitHub attachment
taskRouter.get("/github-attachments", repositoriesController.getAttachments);
taskRouter.delete("/github-attachments/:attachmentId", repositoriesController.deleteAttachment);

export default taskRouter;
