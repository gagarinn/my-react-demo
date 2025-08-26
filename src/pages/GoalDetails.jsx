import React, {useMemo, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles.css';
import BackButton from '../components/BackButton';
import {calculateDeadlineDate, formatDeadline} from "../utils/dateUtils.js";
import MoveToHistoryButton from '../components/MoveToHistoryButton';
import GoalAccomplishedButton from '../components/GoalAccomplishedButton';

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
    const [editDeadline, setEditDeadline] = useState('');
    const [editSteps, setEditSteps] = useState('');
    const [editSubGoals, setEditSubGoals] = useState([]);

    const deadlineDate = useMemo(
        () => calculateDeadlineDate(goal?.createdAt, goal?.deadline),
        [goal?.createdAt, goal?.deadline]
    );

    React.useEffect(() => {
        const savedGoals = JSON.parse(localStorage.getItem('goals')) || [];
        const completedGoals = JSON.parse(localStorage.getItem('completedGoals')) || [];
        const abandonedGoals = JSON.parse(localStorage.getItem('abandonedGoals')) || [];
        const historyGoals = JSON.parse(localStorage.getItem('historyGoals')) || [];
        const deletedInitialGoals = JSON.parse(localStorage.getItem('deletedInitialGoals')) || [];

        // Filter initial goals, excluding deleted ones
        const availableInitialGoals = INITIAL_GOALS.filter(
            g => !deletedInitialGoals.includes(g.id)
        );

        const allGoals = [
            ...savedGoals,
            ...completedGoals,
            ...abandonedGoals,
            ...historyGoals,
            ...availableInitialGoals
        ];
        const foundGoal = allGoals.find(g => g.id === id);

        if (foundGoal) {
            setGoal(foundGoal);
            setEditText(foundGoal.text);
            setEditDescription(foundGoal.description || '');
            setEditDeadline(foundGoal.deadline ?? '');
            setEditSteps(foundGoal.steps ?? '');
            setEditSubGoals(foundGoal.subGoals ?? []);
        } else {
            navigate('/');
        }
    }, [id, navigate]);

    // Устанавливаем длину массива подцелей при изменении количества шагов
    React.useEffect(() => {
        const count = parseInt(editSteps, 10);
        if (isNaN(count) || count <= 0) {
            setEditSubGoals([]);
        } else {
            setEditSubGoals(prev => {
                const next = [...prev];
                while (next.length < count) next.push('');
                while (next.length > count) next.pop();
                return next;
            });
        }
    }, [editSteps]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        if (editText.trim()) {
            const updatedGoal = {
                ...goal,
                text: editText.trim(),
                description: editDescription.trim(),
                createdAt: goal.createdAt || new Date().toISOString()
            };

            if (editDeadline === '') {
                delete updatedGoal.deadline;
            } else {
                updatedGoal.deadline = Number(editDeadline);
            }

            if (editSteps === '') {
                delete updatedGoal.steps;
            } else {
                updatedGoal.steps = Number(editSteps);
            }

            const filteredSubGoals = editSubGoals.filter(s => s.trim() !== '');
            if (filteredSubGoals.length) {
                updatedGoal.subGoals = filteredSubGoals;
            } else {
                delete updatedGoal.subGoals;
            }

            // функция-помощник для замены цели в массиве
            const replaceGoal = (arr) =>
                arr.some(g => g.id === updatedGoal.id)
                    ? arr.map(g => (g.id === updatedGoal.id ? updatedGoal : g))
                    : arr;

            const savedGoals       = replaceGoal(JSON.parse(localStorage.getItem('goals')          || '[]'));
            const completedGoals   = replaceGoal(JSON.parse(localStorage.getItem('completedGoals')  || '[]'));
            const abandonedGoals   = replaceGoal(JSON.parse(localStorage.getItem('abandonedGoals')  || '[]'));
            const historyGoals     = replaceGoal(JSON.parse(localStorage.getItem('historyGoals')    || '[]'));

            localStorage.setItem('goals',           JSON.stringify(savedGoals));
            localStorage.setItem('completedGoals',  JSON.stringify(completedGoals));
            localStorage.setItem('abandonedGoals',  JSON.stringify(abandonedGoals));
            localStorage.setItem('historyGoals',    JSON.stringify(historyGoals));

            setGoal(updatedGoal);
            setIsEditing(false);
            setEditSteps(updatedGoal.steps ?? '');
            setEditSubGoals(updatedGoal.subGoals ?? []);
        }
    };

    const handleCancel = () => {
        setEditText(goal.text);
        setEditDescription(goal.description || '');
        setEditDeadline(goal.deadline ?? '');
        setEditSteps(goal.steps ?? '');
        setEditSubGoals(goal.subGoals ?? []);
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
                    <input
                        type="number"
                        min="0"
                        step="1"
                        value={editDeadline}
                        onChange={(e) => setEditDeadline(e.target.value)}
                        placeholder="Deadline (days)"
                        className="edit-input"
                    />
                    <input
                        type="number"
                        min="0"
                        step="1"
                        value={editSteps}
                        onChange={(e) => setEditSteps(e.target.value)}
                        placeholder="Steps"
                        className="edit-input"
                    />

                    {editSubGoals.map((val, idx) => (
                        <input
                            key={idx}
                            type="text"
                            value={val}
                            onChange={e => {
                                const next = [...editSubGoals];
                                next[idx] = e.target.value;
                                setEditSubGoals(next);
                            }}
                            placeholder={`Step ${idx + 1}`}
                            className="edit-input"
                        />
                    ))}
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
                    <div className="goal-description">
                        <h3>Deadline:</h3>
                        <p>{formatDeadline(deadlineDate)}</p>
                    </div>
                    {goal.steps !== undefined && (
                        <div className="goal-description">
                            <h3>Steps:</h3>
                            <p>{goal.steps}</p>
                        </div>
                    )}
                    {goal.subGoals && goal.subGoals.length > 0 && (
                        <div className="goal-description">
                            <h3>Sub goals:</h3>
                            <ol>
                                {goal.subGoals.map((sg, i) => (
                                    <li key={i}>{sg}</li>
                                ))}
                            </ol>
                        </div>
                    )}

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
                        <GoalAccomplishedButton goal={goal} setGoal={setGoal} />
                        <MoveToHistoryButton goal={goal} />
                    </div>
                </>
            )}
        </div>
    );
}

export default GoalDetails;