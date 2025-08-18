import React, { useState, useEffect } from "react";
import "../styles/boards.scss";
import boardsService from "../services/boardsService";



interface Board {
    id: number;
    name: string;
    description?: string;
    color?: "white";

}

const Boards: React.FC = () => {
    const [boards, setBoards] = useState<Board[]>([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newBoardName, setNewBoardName] = useState("");
    const [newBoardDescription, setNewBoardDescription] = useState("");


    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const data = await boardsService.getAll();
                setBoards(data.boards);
            } catch (error) {
                console.error("Failed to fetch boards:", error);
            }
        };
        fetchBoards();
    }, []);

    const handleCreateBoard = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        if (!newBoardName.trim()) return;

        try {
            const newBoard = await boardsService.create(newBoardName, newBoardDescription, []);
            console.log("test",newBoardName, newBoardDescription)
            setBoards([...boards, newBoard]);
            setNewBoardName("");
            setNewBoardDescription("");
            setShowCreateForm(false);
        } catch (error) {
            console.error("Failed to create board:", error);
        }
    };
    const deleteBoards= async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        if (!newBoardName.trim()) return;

        try {
            const newBoard = await boardsService.delete("s");
        } catch (error) {
            console.error("Failed to create board:", error);
      
    }
}




    return (
        <div className="boards-container">
            {/* Top bar */}
            <div className="top-bar">
                <div className="top-bar-inner">
                    <div className="d-flex align-items-center">
                        {/* Apps menu */}
                        <div className="apps-menu">
                            <div className="apps-grid">
                                <div></div><div></div><div></div><div></div>
                            </div>
                        </div>

                        {/* Logo */}
                        <div className="logo">
                            <img src="/assets/logo.png" alt="logo" height={36} width={36} />
                        </div>
                    </div>

                    <div className="d-flex align-items-center">
                        {/* Notification */}
                        <div className="notification">🔔</div>

                        {/* User avatar */}
                        <div className="user-avatar">S</div>
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            <div className="sidebar">
                <div className="p-3">
                    <nav>
                        <div className="mb-2">
                            <div className="nav-item active">
                                <div className="icon">
                                    <svg width="17" height="17" viewBox="0 0 17 17">
                                        <rect width="17" height="17" fill="#1e3a5f" rx="1" />
                                        <rect x="0.5" y="0.5" width="16" height="16" fill="none" stroke="#4a9eff" strokeWidth="1" rx="1" />
                                        <rect x="3" y="10" width="2.5" height="4" fill="#4a9eff" rx="0.3" />
                                        <rect x="7.25" y="5" width="2.5" height="9" fill="#4a9eff" rx="0.3" />
                                        <rect x="11.5" y="8" width="2.5" height="6" fill="#4a9eff" rx="0.3" />
                                    </svg>
                                </div>
                                <span>Boards</span>
                            </div>
                        </div>

                        <div className="mb-2">
                            <div className="nav-item">
                                <div className="icon">👥</div>
                                <span>All Members</span>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
                <div className="p-4">
                    <div className="mb-4">
                        <h6 className="workspace-title">YOUR WORKSPACES</h6>
                    </div>

                    {/* Boards Grid */}
                    <div className="boards-grid">
                        {boards.map((board,index) => (
                            <div key={index} className="board-card" >
                                <div className="p-3">
                                    <div className="board-title">{board.name}</div>
                                    <div className="board-description">{board.description}</div>
                                    <button className="btn btn-danger" onClick={()=>deleteBoards()}>Delete</button>
                                </div>
                            </div>
                        ))}

                        {/* Create New Board */}
                        <div>
                            {!showCreateForm ? (
                                <div className="create-board" onClick={() => setShowCreateForm(true)}>
                                    <div className="text-center">
                                        <div className="text">+ Create a new board</div>
                                    </div>
                                </div>
                            ) : (
                                <form className="card p-3 shadow-sm" onSubmit={handleCreateBoard}>
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        placeholder="Add board title"
                                        name="name"
                                        value={newBoardName}
                                        onChange={(e) => setNewBoardName(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Escape") {
                                                setShowCreateForm(false);
                                                setNewBoardName("");
                                                setNewBoardDescription("");
                                            }
                                        }}
                                        autoFocus
                                    />

                                    <br />

                                    <label>Description</label>
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        placeholder="Add board description"
                                        name="description"
                                        value={newBoardDescription}
                                        onChange={(e) => setNewBoardDescription(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Escape") {
                                                setShowCreateForm(false);
                                                setNewBoardName("");
                                                setNewBoardDescription("");
                                            }
                                        }}
                                    />
                                    <div className="d-flex justify-content-end gap-2">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={!newBoardName.trim()}
                                        >
                                            Create
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={() => {
                                                setShowCreateForm(false);
                                                setNewBoardName("");
                                            }}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Boards;
