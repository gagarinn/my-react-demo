import React, { useEffect, useState } from 'react';
import BackButton from '../components/BackButton.jsx';
import Goal from '../components/Goal.jsx';
import '../styles.css';
import './History.css';

const History = () => {
    const [historyGoals, setHistoryGoals] = useState([]);

    useEffect(() => {
        const loadHistoryGoals = () => {
            const storedGoals = JSON.parse(localStorage.getItem('historyGoals')) || [];
            const sortedGoals = storedGoals.sort((a, b) => new Date(b.movedToHistoryAt) - new Date(a.movedToHistoryAt));
            setHistoryGoals(sortedGoals);
        };

        loadHistoryGoals();

        window.addEventListener('focus', loadHistoryGoals);

        return () => {
            window.removeEventListener('focus', loadHistoryGoals);
        };
    }, []);

    return (
        <div className="app">
            <div className="toolbar">
                <BackButton />
                <h1>History</h1>
            </div>
            <div className="goal-list">
                {historyGoals.length > 0 ? (
                    historyGoals.map(goal => (
                        <Goal key={goal.id} goal={goal} preventStatusRedirect={true} />
                    ))
                ) : (
                    <p style={{ textAlign: 'center', marginTop: '20px', color: '#aaa' }}>
                        Ваша история пуста.
                    </p>
                )}
            </div>
        </div>
    );
};

export default History;