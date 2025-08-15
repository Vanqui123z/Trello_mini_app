import { Request, Response } from "express";

class GitHubController {
  // 1. Lấy thông tin repo
  getRepoInfo(req: Request, res: Response) {
    const { repositoryId } = req.params;
    res.send(`Get GitHub info for repository ${repositoryId}`);
  }

  // 2. Gắn PR / commit / issue vào task
  attachToTask(req: Request, res: Response) {
    const { boardId, cardId, taskId } = req.params;
    res.send(`Attach PR/commit/issue to task ${taskId} in card ${cardId} of board ${boardId}`);
  }

  // 3. Lấy danh sách GitHub attachments của task
  getAttachments(req: Request, res: Response) {
    const { boardId, cardId, taskId } = req.params;
    res.send(`Get GitHub attachments for task ${taskId} in card ${cardId} of board ${boardId}`);
  }

  // 4. Xóa GitHub attachment
  deleteAttachment(req: Request, res: Response) {
    const { boardId, cardId, taskId, attachmentId } = req.params;
    res.send(`Delete GitHub attachment ${attachmentId} from task ${taskId} in card ${cardId} of board ${boardId}`);
  }
}

export default new GitHubController();
