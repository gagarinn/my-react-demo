import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import '../styles.css';
import BackButton from '../components/BackButton';

function GoalDetails() {
    const { id } = useParams();
    const [goal, setGoal] = useState(null);

    React.useEffect(() => {
        const savedGoals = JSON.parse(localStorage.getItem('goals')) || [];
        const allGoals = [...INITIAL_GOALS, ...savedGoals];
        setGoal(allGoals.find(g => g.id === id));
    }, [id]);

    if (!goal) return <div>Loading...</div>;

    return (
        <div className="app">
            <div className="toolbar">
                <BackButton />
                <h1>{goal.text}</h1>
            </div>
            <div className="goal-description">
                <h3>Description:</h3>
                <p>{goal.description || 'No description available'}</p>
            </div>
        </div>
    );
}

const INITIAL_GOALS = Array.from({ length: 10 }, (_, i) => ({
    id: `initial-${i}`,
    text: `Goal ${i + 1}`
}));

export default GoalDetails;