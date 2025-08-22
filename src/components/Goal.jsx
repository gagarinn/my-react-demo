import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';
import { getExecutionStatusMode, EXECUTION_MODE_STRIKE } from '../utils/executionStatusMode.js';

const Goal = ({ goal }) => {
  const mode = getExecutionStatusMode();

  const classes = ['goal-item'];
  if (goal.completed && mode === EXECUTION_MODE_STRIKE) {
    classes.push('completed');
  }
  if (goal.completed && mode !== EXECUTION_MODE_STRIKE) {
    classes.push('done-checkbox');
  }

  return (
    <Link
      to={`/goal/${goal.id}`}
      className={classes.join(' ')}
    >
      {goal.completed && mode !== EXECUTION_MODE_STRIKE ? '✓ ' : ''}
      {goal.text}
    </Link>
  );
};

export default Goal;
