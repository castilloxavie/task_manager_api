import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchTasks = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/tasks');
      setTasks(response.data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  const createTask = async (taskData) => {
    try {
      const response = await axios.post('http://localhost:3000/api/tasks', taskData);
      setTasks(prev => [response.data.task, ...prev]);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al crear tarea' };
    }
  };

  const updateTask = async (id, updateData) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/tasks/${id}`, updateData);
      setTasks(prev => prev.map(task =>
        task.id === id ? response.data.task : task
      ));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al actualizar tarea' };
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${id}`);
      setTasks(prev => prev.filter(task => task.id !== id));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Error al eliminar tarea' };
    }
  };

  const value = {
    tasks,
    loading,
    createTask,
    updateTask,
    deleteTask,
    fetchTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
