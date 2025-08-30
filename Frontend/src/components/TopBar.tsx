import React, { useState, useEffect, useRef } from "react";
import inviteService from "../services/inviteService";

interface Invite {
    id: string;
    boardId: string;
    boardOwnerId: string;
    memberId: string;
    emailMember: string;
    status: "pending" | "accepted" | "declined";
    createdAt: any;
}

interface TopBarProps {
    showAppsMenu?: boolean;
    boardId?: string;
}

const TopBar: React.FC<TopBarProps> = ({ showAppsMenu = false, boardId }) => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [invites, setInvites] = useState<Invite[]>([]);
    const [loading, setLoading] = useState(false);
    const notificationRef = useRef<HTMLDivElement>(null);

    // Fetch invites for current user
    const fetchInvites = async () => {
        if (!boardId) return;

        setLoading(true);
        try {
            const response = await inviteService.getInvite(boardId, "");
            setInvites(response.invites || []);
        } catch (error) {
            console.error("Failed to fetch invites:", error);
            setInvites([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (boardId) {
            fetchInvites();
        }
    }, [boardId]);

    const handleNotificationClick = () => {
        setShowNotifications(!showNotifications);
        if (!showNotifications && boardId) {
            fetchInvites();
        }
    };

    const handleStatusInvite = async (inviteId: string, boardId: string, status: "accepted" | "declined") => {
        try {
            await inviteService.acceptInvite(boardId, inviteId, status);
            alert(`Invite ${status}!`);
            fetchInvites();
        } catch (error) {
            console.error(`Failed to ${status} invite:`, error);
            alert(`Failed to ${status} invite`);
        }
    };

   
    return (
        <div className={"topbar"}>
            <div className={"topbar-content"}>
                <div className={showAppsMenu ? "d-flex align-items-center" : "topbar-left"}>
                    {/* Logo */}
                    <div className="logo">
                        {showAppsMenu ? (
                            <img src="/assets/logo.png" alt="logo" height={36} width={36} />
                        ) : (
                            "S"
                        )}
                    </div>
                </div>

                <div className={showAppsMenu ? "d-flex align-items-center" : "topbar-right"}>
                    {/* Notification */}
                    <div
                        className={showAppsMenu ? "notification" : "icon notification-bell"}
                        onClick={handleNotificationClick}
                        ref={notificationRef}
                    >
                        🔔
                        {invites.length > 0 && (
                            <span className="notification-badge">{invites.length}</span>
                        )}

                        {/* Notifications Dropdown */}
                        {showNotifications && (
                            <div className="notifications-dropdown">
                                <div className="notifications-header">
                                    <h4>Notifications</h4>
                                </div>
                                <div className="notifications-list">
                                    {loading ? (
                                        <div className="notification-item">Loading...</div>
                                    ) : invites.length === 0 ? (
                                        <div className="notification-item">No new notifications</div>
                                    ) : (
                                        invites.map((invite) => (
                                            <div key={invite.id} className="notification-item">
                                                <div className="notification-content">
                                                    <div className="notification-text">
                                                        Board invitation for <strong>{invite.emailMember}</strong>
                                                    </div>
                                                    <div className="notification-status">
                                                        Status: <span className={`status-${invite.status}`}>{invite.status}</span>
                                                    </div>
                                                    {invite.status === "pending" && (
                                                        <div className="notification-actions">
                                                            <button
                                                                className="accept-btn"
                                                                onClick={() => handleStatusInvite(invite.id, invite.boardId, "accepted")}
                                                            >
                                                                Accept
                                                            </button>
                                                            <button
                                                                className="decline-btn"
                                                                onClick={() => handleStatusInvite(invite.id, invite.boardId, "declined")}
                                                            >
                                                                Decline
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    {/* User avatar */}
                    <div className={showAppsMenu ? "user-avatar" : "avatar"}>S</div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
