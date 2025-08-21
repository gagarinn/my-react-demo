import React, { useEffect, useState } from 'react';
import '../styles.css';
import './Settings.css';
import BackButton from '../components/BackButton';
import { Link, useNavigate } from 'react-router-dom';
import {
  getExecutionStatusMode,
  toggleExecutionStatusMode,
  EXECUTION_MODE_CHECKBOX,
  EXECUTION_MODE_STRIKE
} from '../utils/executionStatusMode.js';

function Settings() {
  const [mode, setMode] = useState(EXECUTION_MODE_CHECKBOX);
  const navigate = useNavigate();

  useEffect(() => {
    setMode(getExecutionStatusMode());
  }, []);

  const handleToggle = () => {
    const next = toggleExecutionStatusMode();
    setMode(next);
    navigate('/'); // показать эффект сразу на главной
  };

  return (
    <div className="app">
      <div className="toolbar">
        <BackButton />
        <h1>Settings</h1>
      </div>
      <div className="settings-menu">
        <Link to="/complited-goals" className="settings-link">
          Complited Goals
        </Link>
        <Link to="/abandoned-goals" className="settings-link">
          Abandoned Goals
        </Link>
        <button
          type="button"
          className="settings-link"
          onClick={handleToggle}
          aria-pressed={mode === EXECUTION_MODE_STRIKE}
        >
          Execution status
        </button>
        <div style={{ textAlign: 'center', color: '#aaa', fontSize: 12 }}>
          Current: {mode === EXECUTION_MODE_CHECKBOX ? 'Checkbox' : 'Strike-through'}
        </div>
      </div>
    </div>
  );
}

export default Settings;