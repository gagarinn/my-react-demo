import React from 'react';
import '../styles.css';
import './Settings.css';
import BackButton from '../components/BackButton';
import { Link } from 'react-router-dom';

function Settings() {
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
      </div>
    </div>
  );
}

export default Settings;