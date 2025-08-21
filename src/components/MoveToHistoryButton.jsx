import React from 'react';
import { useNavigate } from 'react-router-dom';

function MoveToHistoryButton({ goal }) {
    const navigate = useNavigate();

    const handleMoveToHistory = () => {
        if (!goal) return;
        const confirmed = window.confirm('Переместить эту цель в историю?');
        if (!confirmed) return;

        const savedGoals = JSON.parse(localStorage.getItem('goals')) || [];
        const historyGoals = JSON.parse(localStorage.getItem('historyGoals')) || [];

        const historyGoal = {
            ...goal,
            createdAt: goal.createdAt || new Date().toISOString(),
            movedToHistoryAt: new Date().toISOString()
        };

        const updatedHistory = [
            ...historyGoals.filter(g => g.id !== historyGoal.id),
            historyGoal
        ];
        localStorage.setItem('historyGoals', JSON.stringify(updatedHistory));

        if (savedGoals.some(g => g.id === goal.id)) {
            const updatedGoals = savedGoals.filter(g => g.id !== goal.id);
            localStorage.setItem('goals', JSON.stringify(updatedGoals));
        } else if (goal.id.startsWith('initial-')) {
            const deletedInitialGoals = JSON.parse(localStorage.getItem('deletedInitialGoals')) || [];
            if (!deletedInitialGoals.includes(goal.id)) {
                deletedInitialGoals.push(goal.id);
                localStorage.setItem('deletedInitialGoals', JSON.stringify(deletedInitialGoals));
            }
        }

        navigate('/');
    };

    return (
        <button
            className="edit-button"
            onClick={handleMoveToHistory}
        >
            Переместить в историю
        </button>
    );
}

export default MoveToHistoryButton;
