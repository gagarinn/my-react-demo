        // Return to home page after deletion
        import goal from "./components/Goal.jsx";
        import {formatDeadline} from "./utils/dateUtils.js";

        navigate('/');
    };

    const handleMoveToHistory = () => {
        if (!goal) return;
        const confirmed = window.confirm('Переместить эту цель в историю?');
        if (!confirmed) return;

        const savedGoals = JSON.parse(localStorage.getItem('goals')) || [];
        const abandonedGoals = JSON.parse(localStorage.getItem('abandonedGoals')) || [];

        // Формируем запись в истории
        const historyGoal = {
            ...goal,
            createdAt: goal.createdAt || new Date().toISOString(),
            movedToHistoryAt: new Date().toISOString()
        };

        // Добавляем/обновляем в abandonedGoals (история)
        const updatedAbandoned = [
            ...abandonedGoals.filter(g => g.id !== historyGoal.id),
            historyGoal
        ];
        localStorage.setItem('abandonedGoals', JSON.stringify(updatedAbandoned));

        // Удаляем из активных сохранённых целей либо помечаем стартовую как скрытую
        if (savedGoals.some(g => g.id === goal.id)) {
            const updatedGoals = savedGoals.filter(g => g.id !== goal.id);
            localStorage.setItem('goals', JSON.stringify(updatedGoals));
        } else if (goal.id.startsWith('initial-')) {
            const deletedInitialGoals = JSON.parse(localStorage.getItem('deletedInitialGoals')) || [];
            if (!deletedInitialGoals.includes(goal.id)) {
                deletedInitialGoals.push(goal.id);
                localStorage.setItem('deletedInitialGoals', JSON.stringify(deletedInitialGoals));
            }
        }

        // Возврат на главную после перемещения
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
                        <button
                            className="move-to-history-button"
                            onClick={handleMoveToHistory}
                        >
                            Move to history
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
