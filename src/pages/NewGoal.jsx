import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';
import BackButton from "../components/BackButton.jsx";

function NewGoal() {
    const [goalName, setGoalName] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [steps, setSteps] = useState('');
    const [subGoals, setSubGoals] = useState([]);
    const navigate = useNavigate();

    // синхронизация массива подцелей с числом steps
    React.useEffect(() => {
        const count = parseInt(steps, 10);
        if (isNaN(count) || count <= 0) {
            setSubGoals([]);
        } else {
            setSubGoals(prev => {
                const copy = [...prev];
                // увеличиваем или укорачиваем массив до нужной длины
                while (copy.length < count) copy.push('');
                while (copy.length > count) copy.pop();
                return copy;
            });
        }
    }, [steps]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (goalName.trim()) {
            const goals = JSON.parse(localStorage.getItem('goals')) || [];
            const newGoal = {
                id: crypto.randomUUID(),
                text: goalName,
                description: description,
                createdAt: new Date().toISOString(),
            };
            if (deadline !== '') {
                newGoal.deadline = Number(deadline);
            }
            if (steps !== '') {
                newGoal.steps = Number(steps);
            }
            const filteredSubGoals = subGoals.filter(s => s.trim() !== '');
            if (filteredSubGoals.length) {
                newGoal.subGoals = filteredSubGoals;
            }
            goals.push(newGoal);
            localStorage.setItem('goals', JSON.stringify(goals));
            navigate('/');
        }
    };

    return (
        <div className="app">
            <div className="toolbar">
                <BackButton />
                <h1>New goal</h1>
            </div>
            <form onSubmit={handleSubmit} className="goal-form">
                <input
                    type="text"
                    value={goalName}
                    onChange={(e) => setGoalName(e.target.value)}
                    placeholder="Goal name"
                    required
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Goal description (optional)"
                    rows="4"
                />
                <input
                    type="number"
                    min="0"
                    step="1"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    placeholder="Deadline (days)"
                />
                <input
                    type="number"
                    min="0"
                    step="1"
                    value={steps}
                    onChange={(e) => setSteps(e.target.value)}
                    placeholder="Steps"
                />

                {subGoals.map((val, idx) => (
                    <input
                        key={idx}
                        type="text"
                        value={val}
                        onChange={e => {
                            const next = [...subGoals];
                            next[idx] = e.target.value;
                            setSubGoals(next);
                        }}
                        placeholder={`Step ${idx + 1}`}
                    />
                ))}
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default NewGoal;