import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles.css';
import SettingsButton from '../components/SettingsButton.jsx';
import {calculateDeadlineDate, formatDeadline} from "../utils/dateUtils.js";


const INITIAL_GOALS = Array.from({ length: 10 }, (_, i) => ({
    id: `initial-${i}`,
    text: `Goal ${i + 1}`,
    description: `Description for Goal ${i + 1}`
}));

function Home() {
    const [goals, setGoals] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const loadGoals = () => {
        const savedGoals = JSON.parse(localStorage.getItem('goals')) || [];
        const deletedInitialGoals = JSON.parse(localStorage.getItem('deletedInitialGoals')) || [];
        
        // Filter initial goals, excluding deleted ones
        const availableInitialGoals = INITIAL_GOALS.filter(
            goal => !deletedInitialGoals.includes(goal.id)
        );

        const allGoals = [...availableInitialGoals, ...savedGoals];
        setGoals(allGoals);
    };

    useEffect(() => {
        loadGoals();

        // Update the list when the window gets focus
        const handleFocus = () => {
            loadGoals();
        };

        window.addEventListener('focus', handleFocus);

        return () => {
            window.removeEventListener('focus', handleFocus);
        };
    }, []);

    // Update the list on route change (e.g., when returning to the main page)
    useEffect(() => {
        if (location.pathname === '/') {
            loadGoals();
        }
    }, [location.pathname]);

    return (
        <div className="app">
            <div className="toolbar">
                <h1>My Goals</h1>
                <SettingsButton/>
            </div>
            <div className="goal-list">
                {goals.map((goal) => {
                    const deadlineDate = calculateDeadlineDate(goal.createdAt, goal.deadline);
                    return (
                        <div key={goal.id} className="goal-item-container">
                            <Link
                                to={`/goal/${goal.id}`}
                                className="goal-item"
                            >
                                <span className="goal-title">{goal.text}</span>
                                {deadlineDate && (
                                    <span className="goal-deadline-badge">
                                        {formatDeadline(deadlineDate)}
                                    </span>
                                )}
                            </Link>
                        </div>
                    );
                })}
            </div>
            <button className="fab" onClick={() => navigate('/new-goal')}>
                +
            </button>
        </div>
    );
}

export default Home;