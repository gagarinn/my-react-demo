import React from 'react';
import { useNavigate } from 'react-router-dom';

const AbandonedButton = ({ goal, setGoal: _setGoal }) => {
    const navigate = useNavigate();

    const handleAbandon = () => {
        // Remove from active goals
        const savedGoals = JSON.parse(localStorage.getItem('goals')) || [];
        const updatedGoals = savedGoals.filter(g => g.id !== goal.id);
        localStorage.setItem('goals', JSON.stringify(updatedGoals));

        // Add to abandoned goals with normalized status
        const abandonedGoals = JSON.parse(localStorage.getItem('abandonedGoals')) || [];
        const updatedAbandonedGoals = [...abandonedGoals, { ...goal, status: 'abandoned' }];
        localStorage.setItem('abandonedGoals', JSON.stringify(updatedAbandonedGoals));

        alert('Goal marked as Abandoned.');
        navigate('/');
    };

    return (
        <button
            className="abandoned-button"
            onClick={handleAbandon}
        >
            Abandoned
        </button>
    );
};

export default AbandonedButton;
