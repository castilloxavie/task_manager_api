import { useState } from 'react';
import { useTasks } from '../context/TaskContext';

const TaskForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pendiente',
  });
  const [loading, setLoading] = useState(false);
  const { createTask } = useTasks();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await createTask(formData);

    if (result.success) {
      setFormData({
        title: '',
        description: '',
        status: 'pendiente',
      });
    } else {
      alert(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="task-form">
      <div className="task-form-header">
        <div className="task-form-header-icon">
          <svg width="24" height="24" fill="none" stroke="white" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <div>
          <h2 className="task-form-header-title">Crear Nueva Tarea</h2>
          <p className="task-form-header-subtitle">
            Agrega una nueva tarea a tu lista
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="task-form-grid">
          <div className="task-form-full">
            <label htmlFor="title" className="task-form-label">
              Título de la tarea
            </label>
            <div className="task-form-input-container">
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="task-input"
                placeholder="¿Qué tarea necesitas completar?"
              />
              <svg className="task-form-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
          </div>

          <div className="task-form-full">
            <label htmlFor="description" className="task-form-label">
              Descripción detallada
            </label>
            <div className="task-form-input-container">
              <textarea
                id="description"
                name="description"
                required
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className="task-textarea"
                placeholder="Describe los detalles de tu tarea..."
              />
              <svg className="task-form-icon-top" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </div>
          </div>

          <div>
            <label htmlFor="status" className="task-form-label">
              Estado inicial
            </label>
            <div className="task-form-input-container">
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="task-select"
              >
                <option value="pendiente">📋 Pendiente</option>
                <option value="en_progreso">⚡ En Progreso</option>
                <option value="completada">✅ Completada</option>
              </select>
              <svg className="task-form-icon-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="task-form-submit">
          <button
            type="submit"
            disabled={loading}
            className="task-form-button"
          >
            {loading ? (
              <>
                <svg className="task-form-loading-spinner" fill="none" viewBox="0 0 24 24">
                  <circle style={{opacity: 0.25}} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path style={{opacity: 0.75}} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creando tarea...
              </>
            ) : (
              <>
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="task-form-button-icon">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Crear Tarea
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
