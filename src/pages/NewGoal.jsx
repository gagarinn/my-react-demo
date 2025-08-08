import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';
import BackButton from "../components/BackButton.jsx";

function NewGoal() {
    const [goalName, setGoalName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (goalName.trim()) {
            const goals = JSON.parse(localStorage.getItem('goals')) || [];
            goals.push(goalName);
            localStorage.setItem('goals', JSON.stringify(goals));
            navigate('/', { state: { newGoal: goalName } });
        }
    };

    return (
        <div className="app">
            <div className="toolbar">
                <BackButton />
                <h1>Новая цель</h1>
            </div>
            <form onSubmit={handleSubmit} className="goal-form">
                <input
                    type="text"
                    value={goalName}
                    onChange={(e) => setGoalName(e.target.value)}
                    placeholder="Название цели"
                    required
                />
                <button type="submit">Создать</button>
            </form>
        </div>
    );
}

export default NewGoal;