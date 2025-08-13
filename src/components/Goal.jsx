import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const Goal = ({ goal }) => {
  return (
    <Link to={`/goal/${goal.id}`} className="goal-item">
      {goal.text}
    </Link>
  );
};

export default Goal;
