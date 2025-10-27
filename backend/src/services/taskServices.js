import Task from '../models/taskModel.js';

export const createTask = async (taskData) => {
    try {
        const task = await Task.create(taskData);
        return task;
    } catch (error) {
        throw new Error('Error al crear la tarea: ' + error.message);
    }
};

export const getTasksByUser = async (userId) => {
    try {
        const tasks = await Task.findAll({
            where: { user_id: userId },
            order: [['createdAt', 'DESC']]
        });
        return tasks;
    } catch (error) {
        throw new Error('Error al obtener las tareas: ' + error.message);
    }
};

export const getTaskById = async (taskId, userId) => {
    try {
        const task = await Task.findOne({
            where: { id: taskId, user_id: userId }
        });
        return task;
    } catch (error) {
        throw new Error('Error al obtener la tarea: ' + error.message);
    }
};

export const updateTask = async (taskId, userId, updateData) => {
    try {
        const [updatedRowsCount] = await Task.update(updateData, {
            where: { id: taskId, user_id: userId }
        });
        if (updatedRowsCount === 0) {
            throw new Error('Tarea no encontrada o no autorizada');
        }
        const updatedTask = await Task.findOne({
            where: { id: taskId, user_id: userId }
        });
        return updatedTask;
    } catch (error) {
        throw new Error('Error al actualizar la tarea: ' + error.message);
    }
};

export const deleteTask = async (taskId, userId) => {
    try {
        const deletedRowsCount = await Task.destroy({
            where: { id: taskId, user_id: userId }
        });
        if (deletedRowsCount === 0) {
            throw new Error('Tarea no encontrada o no autorizada');
        }
        return { message: 'Tarea eliminada correctamente' };
    } catch (error) {
        throw new Error('Error al eliminar la tarea: ' + error.message);
    }
};
