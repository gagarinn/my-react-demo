import React from 'react';
import { Link } from 'react-router-dom';

const HistoryButton = () => {
    return (
        <Link to="/history" className="settings-link">
            History
        </Link>
    );
};

export default HistoryButton;