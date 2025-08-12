import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GoalDetails from './pages/GoalDetails';
import NewGoal from './pages/NewGoal.jsx';
import Settings from './pages/Settings.jsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/goal/:id" element={<GoalDetails />} />
                <Route path="/new-goal" element={<NewGoal />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </Router>
    );
}

export default App;
