import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';
import BackButton from "../components/BackButton.jsx";

function NewGoal() {
    const [goalName, setGoalName] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (goalName.trim()) {
            const goals = JSON.parse(localStorage.getItem('goals')) || [];
            const newGoal = {
                id: crypto.randomUUID(),
                text: goalName,
                description: description,
                createdAt: new Date().toISOString(),
            };
            if (deadline !== '') {
                newGoal.deadline = Number(deadline);
            }
            goals.push(newGoal);
            localStorage.setItem('goals', JSON.stringify(goals));
            navigate('/');
        }
    };

    return (
        <div className="app">
            <div className="toolbar">
                <BackButton />
                <h1>New goal</h1>
            </div>
            <form onSubmit={handleSubmit} className="goal-form">
                <input
                    type="text"
                    value={goalName}
                    onChange={(e) => setGoalName(e.target.value)}
                    placeholder="Goal name"
                    required
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Goal description (optional)"
                    rows="4"
                />
                <input
                    type="number"
                    min="0"
                    step="1"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    placeholder="Deadline (days)"
                />
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default NewGoal;