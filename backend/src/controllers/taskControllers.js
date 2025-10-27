import { createTask, getTasksByUser, getTaskById, updateTask, deleteTask } from '../services/taskServices.js';
import { serializeTask, serializeTasks } from '../serializers/taskSerializer.js';
import { handleError } from '../utils/handleError.js';

// Crear una nueva tarea
export const crearTarea = async (req, res) => {
    try {
        const { title, description, status = 'pendiente' } = req.body;
        const userId = req.user.id;

        const taskData = {
            title,
            description,
            status,
            user_id: userId
        };

        const task = await createTask(taskData);
        const serializedTask = serializeTask(task);

        res.status(201).json({
            message: 'Tarea creada correctamente',
            task: serializedTask
        });
    } catch (error) {
        handleError(res, 500, error.message);
    }
};

// Obtener todas las tareas del usuario
export const obtenerTareas = async (req, res) => {
    try {
        const userId = req.user.id;
        const tasks = await getTasksByUser(userId);
        const serializedTasks = serializeTasks(tasks);

        res.status(200).json({
            message: 'Tareas obtenidas correctamente',
            tasks: serializedTasks
        });
    } catch (error) {
        handleError(res, 500, error.message);
    }
};

// Obtener una tarea específica
export const obtenerTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const task = await getTaskById(id, userId);
        if (!task) {
            return handleError(res, 404, 'Tarea no encontrada');
        }

        const serializedTask = serializeTask(task);
        res.status(200).json({
            message: 'Tarea obtenida correctamente',
            task: serializedTask
        });
    } catch (error) {
        handleError(res, 500, error.message);
    }
};

// Actualizar una tarea
export const actualizarTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const updateData = req.body;

        const task = await updateTask(id, userId, updateData);
        const serializedTask = serializeTask(task);

        res.status(200).json({
            message: 'Tarea actualizada correctamente',
            task: serializedTask
        });
    } catch (error) {
        if (error.message.includes('no encontrada')) {
            handleError(res, 404, error.message);
        } else {
            handleError(res, 500, error.message);
        }
    }
};

// Eliminar una tarea
export const eliminarTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const result = await deleteTask(id, userId);
        res.status(200).json(result);
    } catch (error) {
        if (error.message.includes('no encontrada')) {
            handleError(res, 404, error.message);
        } else {
            handleError(res, 500, error.message);
        }
    }
};
