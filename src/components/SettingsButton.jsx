import React from 'react';
import { Link } from 'react-router-dom';
import './SettingsButton.css';

const SettingsButton = () => {
    return (
        <Link to="/settings" className="settings-button">
            Settings
        </Link>
    );
};

export default SettingsButton;