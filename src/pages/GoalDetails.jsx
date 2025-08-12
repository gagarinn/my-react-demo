import React, {useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles.css';
import BackButton from '../components/BackButton';

const INITIAL_GOALS = Array.from({ length: 10 }, (_, i) => ({
    id: `initial-${i}`,
    text: `Goal ${i + 1}`
}));

function GoalDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [goal, setGoal] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState('');
    const [editDescription, setEditDescription] = useState('');

    React.useEffect(() => {
        const savedGoals = JSON.parse(localStorage.getItem('goals')) || [];
        const deletedInitialGoals = JSON.parse(localStorage.getItem('deletedInitialGoals')) || [];
        
        // Filter initial goals, excluding deleted ones
        const availableInitialGoals = INITIAL_GOALS.filter(
            g => !deletedInitialGoals.includes(g.id)
        );
        
        const allGoals = [...savedGoals, ...availableInitialGoals];
        const foundGoal = allGoals.find(g => g.id === id);
        
        if (foundGoal) {
            setGoal(foundGoal);
            setEditText(foundGoal.text);
            setEditDescription(foundGoal.description || '');
        } else {
            navigate('/');
        }
    }, [id, navigate]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        if (editText.trim()) {
            const updatedGoal = {
                ...goal,
                text: editText.trim(),
                description: editDescription.trim()
            };

            // Update a custom goal (without creating a new entry)
            const savedGoals = JSON.parse(localStorage.getItem('goals')) || [];
            const updatedGoals = [
                ...savedGoals.filter(g => g.id !== updatedGoal.id),
                updatedGoal
            ];
            localStorage.setItem('goals', JSON.stringify(updatedGoals));

            setGoal(updatedGoal);
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setEditText(goal.text);
        setEditDescription(goal.description || '');
        setIsEditing(false);
    };

    const handleDelete = () => {
        if (!goal) return;
        const confirmed = window.confirm('Удалить эту цель? Это действие нельзя отменить.');
        if (!confirmed) return;

        const savedGoals = JSON.parse(localStorage.getItem('goals')) || [];

        // If there is a custom version of the target with the same id, we delete it from the saved ones.
        const hadSavedVersion = savedGoals.some(g => g.id === goal.id);
        if (hadSavedVersion) {
            const updatedGoals = savedGoals.filter(g => g.id !== goal.id);
            localStorage.setItem('goals', JSON.stringify(updatedGoals));
        } else if (goal.id.startsWith('initial-')) {
            // Otherwise, mark the initial target as deleted
            const deletedInitialGoals = JSON.parse(localStorage.getItem('deletedInitialGoals')) || [];
            if (!deletedInitialGoals.includes(goal.id)) {
                deletedInitialGoals.push(goal.id);
                localStorage.setItem('deletedInitialGoals', JSON.stringify(deletedInitialGoals));
            }
        }

        // Return to home page after deletion
        navigate('/');
    };

    if (!goal) {
        return <div>Loading...</div>;
    }

    return (
        <div className="app">
            <div className="toolbar">
                <BackButton />
                <h1>{goal.text}</h1>
            </div>
            
            {isEditing ? (
                <div className="goal-edit-form">
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        placeholder="Goal name"
                        className="edit-input"
                    />
                    <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        placeholder="Goal description (optional)"
                        rows="4"
                        className="edit-textarea"
                    />
                    <div className="edit-actions">
                        <button className="save-button" onClick={handleSave}>
                            Save
                        </button>
                        <button className="cancel-button" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="goal-description">
                        <h3>Description:</h3>
                        <p>{goal.description || 'No description available'}</p>
                    </div>

                    <div className="goal-actions">
                        <button 
                            className="edit-button" 
                            onClick={handleEdit}
                        >
                            Edit Goal
                        </button>
                        <button
                            className="delete-button"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default GoalDetails;