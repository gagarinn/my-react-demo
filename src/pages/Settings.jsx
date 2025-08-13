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
        <h1>Настройки</h1>
      </div>
      <div className="settings-menu">
        <Link to="/complited-goals" className="settings-link">
          Завершённые цели
        </Link>
        <Link to="/abandoned-goals" className="settings-link">
          Брошенные цели
        </Link>
      </div>
    </div>
  );
}

export default Settings;