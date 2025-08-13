import React, { useEffect, useState } from 'react';
import '../styles.css';
import BackButton from '../components/BackButton';
import Goal from '../components/Goal';

function ComplitedGoals() {
  const [completedGoals, setCompletedGoals] = useState([]);

  useEffect(() => {
    const goals = JSON.parse(localStorage.getItem('goals')) || [];
    const completed = goals.filter(goal => goal.status === 'completed');
    setCompletedGoals(completed);
  }, []);

  return (
    <div className="app">
      <div className="toolbar">
        <BackButton />
        <h1>Завершённые цели</h1>
      </div>
      <div className="goal-list">
        {completedGoals.length > 0 ? (
          completedGoals.map(goal => (
            <Goal key={goal.id} goal={goal} />
          ))
        ) : (
          <p>Нет завершённых целей.</p>
        )}
      </div>
    </div>
  );
}

export default ComplitedGoals;
