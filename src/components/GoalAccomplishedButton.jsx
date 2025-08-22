import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Кнопка, переводящая цель в список выполненных (completedGoals)
 * и возвращающая пользователя на главную страницу.
 */
const GoalAccomplishedButton = ({ goal, setGoal }) => {
    const navigate = useNavigate();

    const handleAccomplished = () => {
        if (!goal) return;

        const willComplete = !goal.completed;
        const confirmMsg = willComplete
            ? 'Отметить эту цель как выполненную?'
            : 'Снять отметку о выполнении этой цели?';

        if (!window.confirm(confirmMsg)) return;

        // Формируем обновлённый объект цели
        const updatedGoal = { ...goal };
        if (willComplete) {
            updatedGoal.completed = true;
            updatedGoal.completedAt = new Date().toISOString();
        } else {
            delete updatedGoal.completed;
            delete updatedGoal.completedAt;
        }
        updatedGoal.createdAt = updatedGoal.createdAt || new Date().toISOString();

        // Сохраняем в localStorage
        const savedGoals = JSON.parse(localStorage.getItem('goals')) || [];
        const updatedGoals = [
            ...savedGoals.filter(g => g.id !== goal.id),
            updatedGoal
        ];
        localStorage.setItem('goals', JSON.stringify(updatedGoals));

        // Обновляем состояние родительского компонента, если передан setGoal
        if (typeof setGoal === 'function') {
            setGoal(updatedGoal);
        }

        // Остаёмся на текущей странице
    };

    return (
        <button className="edit-button" onClick={handleAccomplished}>
            {goal.completed ? 'Mark as not completed' : 'Goal accomplished'}
        </button>
    );
};

export default GoalAccomplishedButton;
