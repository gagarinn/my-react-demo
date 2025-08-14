import React from 'react';

const CompletedButton = ({ goal, setGoal }) => {
    const handleComplete = () => {
        const updatedGoal = { ...goal, status: 'Completed' };
        const savedGoals = JSON.parse(localStorage.getItem('goals')) || [];
        const updatedGoals = [
            ...savedGoals.filter(g => g.id !== updatedGoal.id),
            updatedGoal
        ];
        localStorage.setItem('goals', JSON.stringify(updatedGoals));
        setGoal(updatedGoal);
        alert('Goal marked as Completed!');
    };

    return (
        <button
            className="completed-button"
            onClick={handleComplete}
        >
            Completed
        </button>
    );
};

export default CompletedButton;
