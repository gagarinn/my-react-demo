import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles.css';
import BackButton from '../components/BackButton';

function GoalDetails() {
    const { id } = useParams();
    const goals = JSON.parse(localStorage.getItem('goals')) || [];

    return (
        <div className="app">
            <div className="toolbar">
                <BackButton />
                <h1>{goals[id] || `Цель ${id}`}</h1>
            </div>
        </div>
    );
}

export default GoalDetails;