import React from 'react';
import { useNavigate } from 'react-router-dom';

const ComplitedButton = ({ goal }) => {
    const navigate = useNavigate();

    const handleComplete = () => {
        // Remove from active goals
        const savedGoals = JSON.parse(localStorage.getItem('goals')) || [];
        const updatedGoals = savedGoals.filter(g => g.id !== goal.id);
        localStorage.setItem('goals', JSON.stringify(updatedGoals));

        // Add to completed goals with normalized status
        const completedGoals = JSON.parse(localStorage.getItem('completedGoals')) || [];
        const updatedCompletedGoals = [...completedGoals, { ...goal, status: 'completed' }];
        localStorage.setItem('completedGoals', JSON.stringify(updatedCompletedGoals));

        alert('Goal marked as Completed!');
        navigate('/');
    };

    return (
        <button className="completed-button" onClick={handleComplete}>
            Completed
        </button>
    );
};

export default ComplitedButton;
