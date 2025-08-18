export const API_URL = "http://localhost:3000/boards";

class boardsService {
    async create(name: string, description: string, ownerId: any, invites: any) {
        const res = await fetch(`${API_URL}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description, ownerId, invites }),
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || "Failed to create board");
        }

        return res.json();
    }

    async getAll(boardId: string) {
        const res = await fetch(`${API_URL}/${boardId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || "Failed to get boards");
        }

        return res.json();
    }

    async getById(boardsId: string) {
        const res = await fetch(`${API_URL}/${boardsId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || "Failed to get board by id");
        }

        return res.json();
    }

    async update(boardsId: string, data: any) {
        const res = await fetch(`${API_URL}/${boardsId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || "Failed to update board");
        }

        return res.json();
    }

    async delete(boardsId: string) {
        const res = await fetch(`${API_URL}/${boardsId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || "Failed to delete board");
        }

        return res.json();
    }
}

export default new boardsService();
