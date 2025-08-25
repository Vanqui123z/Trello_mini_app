// CardDetail.tsx
import React, { useState, useEffect } from "react";
import { Button, Form, Card, Row, Col, Modal, ListGroup } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/tasks.scss";
import tasksService from "../services/tasksService";
import cardsService from "../services/cardsService";

interface Task {
    id?: string;
    title: string;
    description: string;
    status: string;
    createdAt?: any;
    ownerId: string;
    assignedMembers: string[];
}

interface CardData {
    id: string;
    name: string;
    description?: string;
    ownerId: string;
    list_member: string[];
    tasks_count: number;
    tasks: Task[];
}

const Tasks = () => {
    const { boardId, cardId, taskId } = useParams<{ boardId: string; cardId: string; taskId?: string }>();
    const navigate = useNavigate();
    const [card, setCard] = useState<CardData | null>(null);
    const [task, setTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState(true);
    const [description, setDescription] = useState("");
    const [comment, setComment] = useState("");
    const [showMembersModal, setShowMembersModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    useEffect(() => {
        const fetchCardAndTask = async () => {
            if (!boardId || !cardId) {
                console.error("BoardId or CardId not provided");
                return;
            }

            try {
                setLoading(true);
                
                // Fetch card data first
                const dataCard = await cardsService.getById(boardId, cardId);
                setCard(dataCard.cards);

                if (taskId) {
                    // If taskId is provided, fetch the specific task
                    try {
                        const dataTask = await tasksService.getById(boardId, cardId, taskId);
                        console.log(dataTask)
                        if (dataTask.task) {
                            setTask(dataTask.task);
                            setDescription(dataTask.task.description || "");
                        } else {
                            console.error("Task not found");
                        }
                    } catch (taskError) {
                        console.error("Failed to fetch task:", taskError);
                        // If task fetch fails, we might still want to show card info
                    }
                } else {
                    // If no taskId, create a default task from card data
                    if (dataCard.cards) {
                        const defaultTask: Task = {
                            title: dataCard.cards.name,
                            description: dataCard.cards.description || "",
                            status: "todo",
                            ownerId: dataCard.cards.ownerId,
                            assignedMembers: dataCard.cards.list_member || []
                        };
                        setTask(defaultTask);
                        setDescription(defaultTask.description);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCardAndTask();
    }, [boardId, cardId, taskId]);

    const handleBack = () => {
        navigate(`/boards/${boardId}/cards`);
    };

    const handleDescriptionSave = async () => {
        if (!task || !boardId || !cardId) return;

        try {
            // Update task description
            // You might need to implement an update method in tasksService
            console.log("Saving description:", description);
        } catch (error) {
            console.error("Failed to update description:", error);
        }
    };

    if (loading) {
        return <div className="loading">Loading task...</div>;
    }

    if (!task) {
        return <div className="error">Task not found</div>;
    }
    return (
        <div className="tasks-modal-overlay">
            <Card className="tasks-card">
                <Card.Header className="tasks-header d-flex justify-content-between align-items-center">
                    <div>
                        <Card.Title className="tasks-title text-dark">
                            📝
                            {task.title}
                        </Card.Title>
                        <Card.Subtitle className="tasks-subtitle mt-2">
                            in list {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                        </Card.Subtitle>
                    </div>
                    <Button className="close-btn" onClick={handleBack}>
                        ×
                    </Button>
                </Card.Header>

                <Card.Body className="tasks-body">
                    <Row>
                        {/* Left Column - Main Content */}
                        <Col md={8}>
                            {/* Members and Notifications */}
                            <div className="members-section">
                                <div className="section-tabs">
                                    <span className="tab-active">Members</span>
                                    <span className="tab-inactive">Notifications</span>
                                </div>
                                <div className="members-controls">
                                    {task.assignedMembers && task.assignedMembers.length > 0 ? (
                                        task.assignedMembers.map((member, index) => (
                                            <div key={index} className="member-avatar">
                                                {member.substring(0, 2).toUpperCase()}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="member-avatar">
                                            {task.ownerId.substring(0, 2).toUpperCase()}
                                        </div>
                                    )}
                                    <Button
                                        className="add-member-btn"
                                        onClick={() => setShowMembersModal(true)}
                                    >
                                        +
                                    </Button>
                                    <Button className="watch-btn">
                                        👁️ Watch
                                    </Button>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="description-section">
                                <div className="section-header">
                                    📄
                                    <strong>Description</strong>
                                </div>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Add a more detailed description"
                                    className="description-textarea"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    onBlur={handleDescriptionSave}
                                />
                            </div>

                            {/* Activity */}
                            <div className="activity-section">
                                <div className="activity-header">
                                    <div className="activity-title">
                                        ⚡
                                        <strong>Activity</strong>
                                    </div>
                                    <Button
                                        className="show-details-btn"
                                        onClick={() => setShowDetailsModal(true)}
                                    >
                                        Show details
                                    </Button>
                                </div>
                                <div className="comment-input-wrapper">
                                    <div className="comment-avatar">
                                        {task.ownerId.substring(0, 2).toUpperCase()}
                                    </div>
                                    <Form.Control
                                        type="text"
                                        placeholder="Write a comment"
                                        className="comment-input"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                console.log("Adding comment:", comment);
                                                setComment("");
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </Col>

                        {/* Right Column - Sidebar */}
                        <Col md={4} className="sidebar pb-3">
                            {/* Add to card */}
                            <div className="add-to-card-section">
                                <strong className="section-title">Add to card</strong>
                                <Button
                                    className="members-btn"
                                    onClick={() => setShowMembersModal(true)}
                                >
                                    👥 Members
                                </Button>
                            </div>

                            {/* Power-Ups */}
                            <div className="power-ups-section">
                                <strong className="section-title">Power-Ups</strong>
                                <div className="github-container">
                                    <div className="github-header">
                                        🐙
                                        <strong className="text-white">GitHub</strong>
                                    </div>
                                    <div className="github-actions">
                                        <Button className="github-btn">
                                            Attach Branch
                                        </Button>
                                        <Button className="github-btn">
                                            Attach Commit
                                        </Button>
                                        <Button className="github-btn">
                                            Attach Issue
                                        </Button>
                                        <Button className="github-btn">
                                            Attach Pull Request...
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Archive */}
                            <Button className="archive-btn">
                                🗃️ Archive
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {/* Members Modal */}
            <Modal
                show={showMembersModal}
                onHide={() => setShowMembersModal(false)}
                centered
                className="members-modal"
            >
                <Modal.Header closeButton className="members-modal-header">
                    <Modal.Title className="members-modal-title">
                        👥 Assigned Members
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="members-modal-body">
                    {task && task.assignedMembers && task.assignedMembers.length > 0 ? (
                        <ListGroup variant="flush">
                            {task.assignedMembers.map((member, index) => (
                                <ListGroup.Item
                                    key={index}
                                    className="member-list-item"
                                >
                                    <div className="member-info-container">
                                        <div className="member-avatar-large">
                                            {member.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div className="member-details">
                                            <div className="member-name">{member}</div>
                                            <div className="member-email">{member}</div>
                                            <div className="member-role">Member</div>
                                        </div>
                                        <div className="member-actions">
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                className="remove-member-btn"
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : (
                        <div className="no-members-message">
                            <div className="no-members-icon">👥</div>
                            <h5>No members assigned</h5>
                            <p>Add members to this task to help collaborate and track progress.</p>
                        </div>
                    )}

                    <div className="add-member-section">
                        <Button
                            variant="primary"
                            className="add-new-member-btn"
                        >
                            + Add Member
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Details Modal */}
            <Modal
                show={showDetailsModal}
                onHide={() => setShowDetailsModal(false)}
                centered
                size="lg"
                className="details-modal"
            >
                <Modal.Header closeButton className="details-modal-header">
                    <Modal.Title className="details-modal-title">
                        📋 Task & Card Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="details-modal-body">
                    {task && card && (
                        <div className="details-content">
                            {/* Task Details Section */}
                            <div className="details-section">
                                <h5 className="section-title">
                                    <span className="section-icon">📝</span>
                                    Task Information
                                </h5>
                                <div className="details-grid">
                                    <div className="detail-item">
                                        <label>Task ID:</label>
                                        <span>{taskId || 'N/A'}</span>
                                    </div>
                                    <div className="detail-item">
                                        <label>Title:</label>
                                        <span>{task.title}</span>
                                    </div>
                                    <div className="detail-item">
                                        <label>Status:</label>
                                        <span className={`status-badge status-${task.status}`}>
                                            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                                        </span>
                                    </div>
                                    <div className="detail-item">
                                        <label>Owner ID:</label>
                                        <span>{task.ownerId}</span>
                                    </div>
                                    <div className="detail-item">
                                        <label>Created At:</label>
                                        <span>{task.createdAt ? new Date(task.createdAt).toLocaleString() : 'N/A'}</span>
                                    </div>
                                    <div className="detail-item full-width">
                                        <label>Description:</label>
                                        <div className="description-content">
                                            {task.description || 'No description provided'}
                                        </div>
                                    </div>
                                    <div className="detail-item full-width">
                                        <label>Assigned Members:</label>
                                        <div className="members-list">
                                            {task.assignedMembers && task.assignedMembers.length > 0 ? (
                                                task.assignedMembers.map((member, index) => (
                                                    <span key={index} className="member-tag">
                                                        {member}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="no-data">No members assigned</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card Details Section */}
                            {card && (
                                <div className="details-section">
                                    <h5 className="section-title">
                                        <span className="section-icon">🗂️</span>
                                        Card Information
                                    </h5>
                                    <div className="details-grid">
                                        <div className="detail-item">
                                            <label>Card ID:</label>
                                            <span>{card.id}</span>
                                        </div>
                                        <div className="detail-item">
                                            <label>Name:</label>
                                            <span>{card.name}</span>
                                        </div>
                                        <div className="detail-item">
                                            <label>Owner ID:</label>
                                            <span>{card.ownerId}</span>
                                        </div>
                                        <div className="detail-item">
                                            <label>Tasks Count:</label>
                                            <span>{card.tasks_count}</span>
                                        </div>
                                        <div className="detail-item full-width">
                                            <label>Card Description:</label>
                                            <div className="description-content">
                                                {card.description || 'No description provided'}
                                            </div>
                                        </div>
                                        <div className="detail-item full-width">
                                            <label>Card Members:</label>
                                            <div className="members-list">
                                                {card.list_member && card.list_member.length > 0 ? (
                                                    card.list_member.map((member, index) => (
                                                        <span key={index} className="member-tag">
                                                            {member}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="no-data">No members in card</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Board & Navigation Info */}
                            <div className="details-section">
                                <h5 className="section-title">
                                    <span className="section-icon">🎯</span>
                                    Navigation Information
                                </h5>
                                <div className="details-grid">
                                    <div className="detail-item">
                                        <label>Board ID:</label>
                                        <span>{boardId}</span>
                                    </div>
                                    <div className="detail-item">
                                        <label>Current Path:</label>
                                        <span className="path-info">
                                            Board → Card → Task
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Tasks;
