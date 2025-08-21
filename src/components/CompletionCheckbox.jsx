import React from 'react';

function CompletionCheckbox({ goalId, checked, onToggle }) {
  const handleChange = (e) => {
    if (onToggle) {
      onToggle(goalId, e.target.checked);
    }
  };

  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        onClick={(e) => e.stopPropagation()}
        aria-label="Mark goal as completed"
      />
    </label>
  );
}

export default CompletionCheckbox;
