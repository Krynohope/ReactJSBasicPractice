import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UserMenu.css';

interface UserMenuProps {
    username: string;
    avatar: string;
    onLogout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ username, avatar, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="user-menu-container" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <div className="user-menu-trigger">
                <img src={avatar} alt={username} className="user-avatar" />
                <span className="username">{username}</span>
            </div>
            {isOpen && (
                <div className="user-menu-dropdown">
                    <Link to="/profile" className="menu-item">
                        <i className="fas fa-user"></i> Profile
                    </Link>
                    <button onClick={onLogout} className="menu-item logout-button">
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserMenu;