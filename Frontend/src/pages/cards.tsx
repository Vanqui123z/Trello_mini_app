import React, { useState, useEffect } from "react";
import "../styles/cards.scss";
import { useNavigate, useParams } from "react-router-dom";
import cardsService from "../services/cardsService";
import inviteService from "../services/inviteService";
interface Task {
    title: string;
    description: string;
    status: string;
    ownerId: string;
    assignedMembers: string[];
}

interface Card {
    id?: string;
    name: string;
    description?: string;
    ownerId: string;
    list_member: string[];
    tasks_count: number;
    tasks: Task[];
}

interface List {
    title: string;
    cards: Card[];
}

const Cards: React.FC = () => {
    const { boardId } = useParams<{ boardId: string }>();
    const [cards, setCards] = useState<Card[]>([]);
    const [lists, setLists] = useState<List[]>([]);
    const [newCardInputs, setNewCardInputs] = useState<{ [key: string]: string }>({});
    const [showAddList, setShowAddList] = useState(false);
    const [newListTitle, setNewListTitle] = useState("");
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [inviteEmail, setInviteEmail] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCards = async () => {
            if (!boardId) {
                console.error("No boardId provided");
                return;
            }
            try {
                const data = await cardsService.getAll(boardId);
                console.log("Fetched data:", data);
                setCards(data.cards || []);
            } catch (error) {
                console.error("Failed to fetch cards:", error);
            }
        };
        fetchCards();
    }, [boardId]);

    useEffect(() => {
        const mapLists: { [title: string]: Card[] } = {};

        cards.forEach((card) => {
            if (card.list_member.length === 0) {
                ["Unassigned", "todo", "pending"].forEach(title => {
                    mapLists[title] = mapLists[title] || [];
                    mapLists[title].push({ ...card });
                });
            } else {
                card.list_member.forEach((member) => {
                    mapLists[member] = mapLists[member] || [];
                    mapLists[member].push({ ...card });
                });
            }
        });

        const groupedLists: List[] = Object.keys(mapLists).map((title) => ({
            title,
            cards: mapLists[title],
        }));

        setLists(groupedLists);
    }, [cards]);

    const addCard = async (listTitle: string, index: number) => {
        const cardTitle = newCardInputs[listTitle]?.trim();
        if (!cardTitle || !boardId) return;

        try {
            const newCard: Card = {
                name: cardTitle,
                description: "new task",
                ownerId: "user01",
                list_member: listTitle === "Unassigned" ? [] : [listTitle],
                tasks_count: 10,
                tasks: [],
            };

            setCards([...cards, newCard]);
            setNewCardInputs((prev) => ({ ...prev, [listTitle]: "" }));
            console.log("Adding card:", !newCard.ownerId);
            if (!boardId || !newCard.name || !newCard.description || !newCard.ownerId || !newCard.list_member || !newCard.tasks_count) { return console.error("Invalid card data"); }
            await cardsService.create(boardId, newCard.name, newCard.description, newCard.ownerId, newCard.list_member, newCard.tasks_count);
        } catch (error) {
            console.error("Failed to add card:", error);
            setCards(cards); // Revert on error
        }
    };

    const addList = () => {
        const trimmedTitle = newListTitle.trim();
        if (!trimmedTitle) return;

        // Add new list to local state (no API call)
        setLists([...lists, { title: trimmedTitle, cards: [] }]);
        setNewListTitle("");
        setShowAddList(false);
    };

    const toggleCardInput = (listId: string) => {
        setNewCardInputs((prev) => ({
            ...prev,
            [listId]: prev[listId] !== undefined ? "" : "",
        }));
    };
    const deleteCard = async (cardId: string|undefined) => {
        try {
            console.log(cardId)
            if(!boardId||!cardId){return console.error("No cardId provided");}
            await cardsService.delete(boardId,cardId);
            setCards(cards.filter((card) => card.id !== cardId));
        } catch (error) {
            console.error("Failed to delete card:", error);
        }
    };

    const toBoards = () => {
        navigate("/boards");
    };

    const handleInvite = async () => {
        if (!inviteEmail.trim() || !boardId) return;
        
        try {
           
            const currentUserId = "user01"; 
            await inviteService.invite(boardId, inviteEmail, inviteEmail, currentUserId);
            setInviteEmail("");
            setShowInviteModal(false);
            alert("Invitation sent successfully!");
        } catch (error) {
            console.error("Failed to send invitation:", error);
            alert("Failed to send invitation. Please try again.");
        }
    };

    const copyInviteLink = () => {
        const inviteLink = `${window.location.origin}/boards/${boardId}/invite`;
        navigator.clipboard.writeText(inviteLink).then(() => {
            alert("Invite link copied to clipboard!");
        }).catch(err => {
            console.error('Failed to copy link: ', err);
        });
    };

    const openTask = (cardId: string | undefined) => {
        if (cardId && boardId) {
            navigate(`/boards/${boardId}/cards/${cardId}/task`);
        }
    };

    return (
        <div className="boards-container">
            {/* Top bar */}
            <div className="topbar">
                <div className="topbar-content">
                    <div className="topbar-left">
                        <div className="logo">S</div>
                    </div>
                    <div className="topbar-right">
                        <div className="icon">🔔</div>
                        <div className="avatar">S</div>
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            <div className="sidebar">
                <div className="p-3">
                    <h6 className="sidebar-title">Your boards</h6>
                    <div className="board-item">
                        <div className="board-icon">
                            <img src="/assets/logo.png" alt="logo" height={36} width={36} />
                        </div>
                        <span>My Trello board</span>
                    </div>

                    <div className="sidebar-members">
                        <div className="sidebar-members-title">Members</div>
                        {["S1", "S2", "S3", "S4"].map((s, i) => (
                            <div className="member" key={i}>
                                <div className="member-avatar">{s}</div>
                                <span>User {i + 1}</span>
                            </div>
                        ))}
                    </div>

                    <div className="sidebar-footer">
                        <div className="note">
                            You can't find and reopen closed boards if close the board
                        </div>
                        <button className="btn-close" onClick={() => toBoards()}>Close</button>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="main-content">
                <div className="board-header">
                    <h5>My Trello board</h5>
                    <button className="btn-invite" onClick={() => setShowInviteModal(true)}>⚡ Invite member</button>
                </div>

                <div className="lists-container">
                    {lists.map((list, index) => (
                        <div key={index} className="list">
                            <div className="list-header">
                                <h6>{list.title}</h6>
                                <div className="list-menu">⋯</div>
                            </div>

                            {/* Cards */}
                            {list.cards.map((card, index) => (
                                <div 
                                    key={index} 
                                    className="card card-wrapper"
                                    onClick={() => openTask(card.id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <span>{card.name}</span>
                                    <button 
                                        className="btn-delete" 
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent card click when delete button is clicked
                                            deleteCard(card.id);
                                        }}
                                    >
                                        ❌
                                    </button>
                                </div>
                            ))}

                            {/* Add card input */}
                            {newCardInputs[list.title] !== undefined ? (
                                <div className="add-card-area">
                                    <textarea
                                        placeholder="Enter a title for this card..."
                                        value={newCardInputs[list.title]}
                                        onChange={(e) =>
                                            setNewCardInputs({
                                                ...newCardInputs,
                                                [list.title]: e.target.value,
                                            })
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" && !e.shiftKey) {
                                                e.preventDefault();
                                                addCard(list.title, index);
                                            }
                                        }}
                                        autoFocus
                                    />
                                    <div className="add-card-actions">
                                        <button className="btn btn-primary" onClick={() => addCard(list.title, index)}>Add card</button>
                                        <div className="close" onClick={() => toggleCardInput(list.title)}>✕</div>
                                    </div>
                                </div>
                            ) : (
                                <div className="add-card" onClick={() => toggleCardInput(list.title)}>
                                    <span>+ Add a card</span>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Add another list */}
                    <div className="add-list">
                        {!showAddList ? (
                            <div
                                className="add-list-btn"
                                onClick={() => setShowAddList(true)}
                            >
                                + Add another list
                            </div>
                        ) : (
                            <div className="add-list-area">
                                <input
                                    type="text"
                                    placeholder="Enter list title..."
                                    value={newListTitle}
                                    onChange={(e) => setNewListTitle(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") addList();
                                        if (e.key === "Escape") {
                                            setShowAddList(false);
                                            setNewListTitle("");
                                        }
                                    }}
                                    autoFocus
                                />
                                <div className="add-list-actions ">
                                    <button className="btn btn-primary" onClick={addList}>Add list</button>
                                    <div
                                        className="close"
                                        onClick={() => {
                                            setShowAddList(false);
                                            setNewListTitle("");
                                        }}
                                    >
                                        ✕
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Invite Modal */}
            {showInviteModal && (
                <div className="modal-overlay" onClick={() => setShowInviteModal(false)}>
                    <div className="invite-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h4>Invite to Board</h4>
                            <button className="modal-close" onClick={() => setShowInviteModal(false)}>✕</button>
                        </div>
                        <div className="modal-body">
                            <input
                                type="email"
                                className="invite-input"
                                placeholder="Email address or name"
                                value={inviteEmail}
                                onChange={(e) => setInviteEmail(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleInvite();
                                    if (e.key === "Escape") setShowInviteModal(false);
                                }}
                                autoFocus
                            />
                            <div className="invite-link-section">
                                <div className="invite-text">Invite someone to this Workspace with a link:</div>
                                <button className="copy-link-btn" onClick={copyInviteLink}>
                                    💲 Copy link
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cards;
