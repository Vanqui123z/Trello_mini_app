import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/boards.scss";
import boardsService from "../services/boardsService";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";



interface Board {
    id: string;
    name: string;
    description?: string;
    color?: "white";

}

const Boards: React.FC = () => {
    const [boards, setBoards] = useState<Board[]>([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newBoardName, setNewBoardName] = useState("");
    const [newBoardDescription, setNewBoardDescription] = useState("");
    const navigate = useNavigate();


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
            setBoards([...boards, newBoard]);
            setNewBoardName("");
            setNewBoardDescription("");
            setShowCreateForm(false);
        } catch (error) {
            console.error("Failed to create board:", error);
        }
    };



    return (
        <div className="boards-container">
            <TopBar showAppsMenu={true} />
            <Sidebar type="boards" />

            {/* Main Content */}
            <div className="main-content">
                <div className="p-4">
                    <div className="mb-4">
                        <h6 className="workspace-title">YOUR WORKSPACES</h6>
                    </div>

                    {/* Boards Grid */}
                    <div className="boards-grid">
                        {boards.map((board, index) => (
                            <div key={index} className="board-card" onClick={() => { return navigate(`/boards/${board.id}/cards`); }} >
                                <div className="p-3">
                                    <div className="board-title">{board.name}</div>
                                    <div className="board-description">{board.description}</div>
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
                                                setNewBoardDescription("");
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
