import React, { useEffect, useState } from 'react';
import '../styles.css';
import BackButton from '../components/BackButton';
import Goal from '../components/Goal';

function AbandonedGoals() {
    const [abandonedGoals, setAbandonedGoals] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('abandonedGoals')) || [];
        setAbandonedGoals(stored);
    }, []);

    return (
        <div className="app">
            <div className="toolbar">
                <BackButton />
                <h1>Abandoned Goals</h1>
            </div>
            <div className="goal-list">
                {abandonedGoals.length > 0 ? (
                    abandonedGoals.map(goal => (
                        <Goal key={goal.id} goal={goal} />
                    ))
                ) : (
                    <p style={{ textAlign: 'center', marginTop: '20px' }}>
                      You have no abandoned goals.
                    </p>
                )}
            </div>
        </div>
    );
}

export default AbandonedGoals;