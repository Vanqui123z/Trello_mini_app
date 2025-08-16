import { Request, Response } from "express";

class GitHubController {
  //--get    repositories/:repositoryId/github-info 
  getRepoInfo(req: Request, res: Response) {
    const { repositoryId } = req.params;
    res.send(`Get GitHub info for repository ${repositoryId}`);
  }

  //  attach `/boards/:boardId/cards/:cardId/tasks/:taskId/github-attach`
  attachToTask(req: Request, res: Response) {
    const { boardId, cardId, taskId } = req.params;
    res.send(`Attach PR/commit/issue to task ${taskId} in card ${cardId} of board ${boardId}`);
  }

  // getList `/boards/:boardId/cards/:cardId/tasks/:taskId/github-attachments
  getAttachments(req: Request, res: Response) {
    const { boardId, cardId, taskId } = req.params;
    res.send(`Get GitHub attachments for task ${taskId} in card ${cardId} of board ${boardId}`);
  }

  // 
  deleteAttachment(req: Request, res: Response) {
    const { boardId, cardId, taskId, attachmentId } = req.params;
    res.send(`Delete GitHub attachment ${attachmentId} from task ${taskId} in card ${cardId} of board ${boardId}`);
  }
}

export default new GitHubController();
