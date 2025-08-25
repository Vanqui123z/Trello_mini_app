import React from "react";

interface TopBarProps {
    showAppsMenu?: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ showAppsMenu = false }) => {
    return (
        <div className={showAppsMenu ? "top-bar" : "topbar"}>
            <div className={showAppsMenu ? "top-bar-inner" : "topbar-content"}>
                <div className={showAppsMenu ? "d-flex align-items-center" : "topbar-left"}>
                    {/* Apps menu - only show on boards page */}
                    {showAppsMenu && (
                        <div className="apps-menu">
                            <div className="apps-grid">
                                <div></div><div></div><div></div><div></div>
                            </div>
                        </div>
                    )}

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
                    <div className={showAppsMenu ? "notification" : "icon"}>🔔</div>

                    {/* User avatar */}
                    <div className={showAppsMenu ? "user-avatar" : "avatar"}>S</div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
