import React, { useEffect, useState } from 'react';
import '../styles.css';
import BackButton from '../components/BackButton';
import Goal from '../components/Goal';

function ComplitedGoals() {
  const [completedGoals, setCompletedGoals] = useState([]);

  useEffect(() => {
    const completed = JSON.parse(localStorage.getItem('completedGoals')) || [];
    setCompletedGoals(completed);
  }, []);

  return (
    <div className="app">
      <div className="toolbar">
        <BackButton />
        <h1>Completed Goals</h1>
      </div>
      <div className="goal-list">
        {completedGoals.length > 0 ? (
          completedGoals.map(goal => (
            <Goal key={goal.id} goal={goal} />
          ))
        ) : (
          <p>No goals achieved.</p>
        )}
      </div>
    </div>
  );
}

export default ComplitedGoals;
