import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

function AbandonedGoals() {
    const navigate = useNavigate();

    const abandonedGoals = [];

    return (
        <div className="app">
            <div className="toolbar">
                <button onClick={() => navigate(-1)} className="back-button" aria-label="Go back">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                    </svg>
                </button>
                <h1>Заброшенные цели</h1>
            </div>
            <div className="goal-list">
                {abandonedGoals.length > 0 ? (
                    abandonedGoals.map(goal => (
                        <div key={goal.id} className="goal-item">
                            {goal.text}
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: 'center', marginTop: '20px' }}>
                        У вас нет заброшенных целей.
                    </p>
                )}
            </div>
        </div>
    );
}

export default AbandonedGoals;