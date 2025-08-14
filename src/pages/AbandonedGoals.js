import React from "react";

const AbandonedGoals = ({ abandonedGoals }) => {
  return (
    <div>
      <h1>Abandoned Goals</h1>
      {abandonedGoals.map((goal) => (
        <div key={goal.id}>{goal.title}</div>
      ))}
    </div>
  );
};

export default AbandonedGoals;
