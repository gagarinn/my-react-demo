import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles.css';

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
        
        // Фильтруем initial goals, исключая удаленные
        const availableInitialGoals = INITIAL_GOALS.filter(
            goal => !deletedInitialGoals.includes(goal.id)
        );
        
        const allGoals = [...availableInitialGoals, ...savedGoals];
        setGoals(allGoals);
    };

    useEffect(() => {
        loadGoals();
        
        // Обновляем список при изменении маршрута (возврат на главную страницу)
        const handleFocus = () => {
            loadGoals();
        };
        
        window.addEventListener('focus', handleFocus);
        
        return () => {
            window.removeEventListener('focus', handleFocus);
        };
    }, []);

    // Обновляем список при изменении маршрута (возврат на главную страницу)
    useEffect(() => {
        if (location.pathname === '/') {
            loadGoals();
        }
    }, [location.pathname]);

    const addGoal = (newGoal) => {
        const savedGoals = JSON.parse(localStorage.getItem('goals')) || [];
        const updatedSavedGoals = [...savedGoals, newGoal];
        localStorage.setItem('goals', JSON.stringify(updatedSavedGoals));
        
        // Обновляем состояние
        const updatedGoals = [...goals, newGoal];
        setGoals(updatedGoals);
    };

    return (
        <div className="app">
            <div className="toolbar">
                <h1>My Goals</h1>
            </div>
            <div className="goal-list">
                {goals.map((goal) => (
                    <div key={goal.id} className="goal-item-container">
                        <Link
                            to={`/goal/${goal.id}`}
                            className="goal-item"
                        >
                            {goal.text}
                        </Link>
                    </div>
                ))}
            </div>
            <button className="fab" onClick={() => navigate('/new-goal')}>
                +
            </button>
        </div>
    );
}

export default Home;