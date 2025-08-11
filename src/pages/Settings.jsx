import React from 'react';
import '../styles.css';
import BackButton from '../components/BackButton';

function Settings() {
  return (
    <div className="app">
      <div className="toolbar">
        <BackButton />
        <h1>Settings</h1>
      </div>
      {/* Settings content goes here */}
    </div>
  );
}

export default Settings;