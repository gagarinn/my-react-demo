import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles.css';

const INITIAL_GOALS = Array.from({ length: 10 }, (_, i) => ({
    id: `initial-${i}`,
    text: `Goal ${i + 1}`,
    description: `Description for Goal ${i + 1}`
}));

function Home() {
    const [goals, setGoals] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const savedGoals = JSON.parse(localStorage.getItem('goals')) || [];
        setGoals([...INITIAL_GOALS, ...savedGoals]);
    }, []);

    const addGoal = (newGoal) => {
        const updatedGoals = [...goals, newGoal];
        setGoals(updatedGoals);
        // Сохраняем ТОЛЬКО пользовательские цели
        localStorage.setItem('goals',
            JSON.stringify(updatedGoals.filter(g => !g.id.startsWith('initial-')))
        );
    };

    return (
        <div className="app">
            <div className="toolbar">
                <h1>My Goals</h1>
            </div>
            <div className="goal-list">
                {goals.map((goal) => (
                    <Link
                        to={`/goal/${goal.id}`}
                        key={goal.id}
                        className="goal-item"
                    >
                        {goal.text}
                    </Link>
                ))}
            </div>
            <button className="fab" onClick={() => navigate('/new-goal')}>
                +
            </button>
        </div>
    );
}

export default Home;