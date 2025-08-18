export const BOARD_API = "http://localhost:3000/boards";


// /boards/:boardId/invite // /boards/:boardId/cards/:id/invite/accept
class InviteService {
  private getAuthHeaders() {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  async invite(
    boardId: string,
    memberId: string,
    emailMember: string,
    boardOwnerId: string
  ) {
    const res = await fetch(`${BOARD_API}/${boardId}/invite`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ memberId, emailMember, boardOwnerId }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to send invite");
    }

    return res.json();
  }

  async acceptInvite(
    boardId: string,
    cardId: string,
    inviteId: string,
    action: string
  ) {
    const res = await fetch(
      `${BOARD_API}/${boardId}/cards/${cardId}/invite/accept`,
      {
        method: "POST",
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ inviteId, action }),
      }
    );

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to accept invite");
    }

    return res.json();
  }
}

export default new InviteService();
