export function calculateDeadlineDate(createdAt, deadlineDays) {
    if (typeof deadlineDays !== 'number' || !createdAt) {
        return null;
    }
    const startDate = new Date(createdAt);
    startDate.setDate(startDate.getDate() + deadlineDays);
    return startDate;
}

export function formatDeadline(date) {
    if (!date) {
        return 'Not set';
    }
    return new Intl.DateTimeFormat("ru-RU", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(date);
}
