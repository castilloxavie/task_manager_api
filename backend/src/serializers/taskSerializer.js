export const serializeTask = (task) => {
    return {
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        user_id: task.user_id,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt
    };
};

export const serializeTasks = (tasks) => {
    return tasks.map(task => serializeTask(task));
};
