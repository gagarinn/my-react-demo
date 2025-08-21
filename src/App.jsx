import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import GoalDetails from './pages/GoalDetails.jsx';
import NewGoal from './pages/NewGoal.jsx';
import Settings from './pages/Settings.jsx';
import AbandonedGoals from './pages/AbandonedGoals.jsx';
import CompletedGoals from './pages/ComplitedGoals.jsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/goal/:id" element={<GoalDetails />} />
                <Route path="/new-goal" element={<NewGoal />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/abandoned-goals" element={<AbandonedGoals />} />
                <Route path="/complited-goals" element={<CompletedGoals />} />
            </Routes>
        </Router>
    );
}

export default App;

