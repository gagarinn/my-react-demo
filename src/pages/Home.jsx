import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles.css';

function Home() {
    const [goals, setGoals] = useState(
        Array.from({ length: 10 }, (_, i) => `Цель ${i + 1}`)
    );
    const navigate = useNavigate();

    const addGoal = (newGoal) => {
        setGoals([...goals, newGoal]);
    };

    return (
        <div className="app">
            <div className="toolbar">
                <h1>Мои цели</h1>
            </div>
            <div className="goal-list">
                {goals.map((goal, index) => (
                    <div
                        key={index}
                        className="goal-item"
                        onClick={() => navigate(`/goal/${index}`)}
                    >
                        {goal}
                    </div>
                ))}
            </div>
            <button
                className="fab"
                onClick={() => navigate('/new-goal')}
            >
                +
            </button>
        </div>
    );
}

export default Home;