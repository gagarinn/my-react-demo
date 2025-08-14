import React from 'react';

const AbandonedButton = ({ goal, setGoal }) => {
    const handleAbandon = () => {
        const updatedGoal = { ...goal, status: 'Abandoned' };
        const savedGoals = JSON.parse(localStorage.getItem('goals')) || [];
        const updatedGoals = [
            ...savedGoals.filter(g => g.id !== updatedGoal.id),
            updatedGoal
        ];
        localStorage.setItem('goals', JSON.stringify(updatedGoals));
        setGoal(updatedGoal);
        alert('Goal marked as Abandoned.');
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
