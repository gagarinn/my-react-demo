import React, {useState, useEffect} from 'react';
import BackButton from '../components/BackButton.jsx';
import '../styles.css';
import './History.css';

const History = () => {
    const [historyGoals, setHistoryGoals] = useState([]);

    useEffect(() => {
        const storedGoals = JSON.parse(localStorage.getItem('historyGoals')) || [];
        const sortedGoals = storedGoals.sort((a, b) => new Date(b.movedToHistoryAt) - new Date(a.movedToHistoryAt));
        setHistoryGoals(sortedGoals);
    }, []);
  return (
        <div className="app">
            <div className="toolbar">
                <BackButton />
                <h1>History</h1>
            </div>
            <div className="history-list">
                {historyGoals.length > 0 ? (
                    historyGoals.map(goal => (
                        <div key={goal.id} className="history-goal-item">
                            <span className="goal-text">{goal.text}</span>
                            <small className="goal-date">
                                Перемещено: {new Date(goal.movedToHistoryAt).toLocaleDateString()}
                            </small>
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: 'center', color: '#aaa' }}>
                        Ваша история пуста.
                    </p>
                )}
            </div>
        </div>
    );
};

export default History;