import { useState } from 'react';
import { useTasks } from '../context/TaskContext';

const TaskList = () => {
  const { tasks, loading, updateTask, deleteTask } = useTasks();
  const [editingTask, setEditingTask] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '', status: '' });

  const handleEdit = (task) => {
    setEditingTask(task.id);
    setEditForm({
      title: task.title,
      description: task.description,
      status: task.status,
    });
  };

  const handleSave = async () => {
    const result = await updateTask(editingTask, editForm);
    if (result.success) {
      setEditingTask(null);
    } else {
      alert(result.error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      const result = await deleteTask(id);
      if (!result.success) {
        alert(result.error);
      }
    }
  };

  if (loading) {
    return (
      <div className="task-list-loading">
        <div className="task-list-loading-spinner"></div>
        <span className="task-list-loading-text">Cargando tareas...</span>
      </div>
    );
  }

  return (
    <div className="tasks-list">
      {tasks.length === 0 ? (
        <div className="task-list-empty">
          <div className="task-list-empty-icon">
            📋
          </div>
          <h3 className="task-list-empty-title">No tienes tareas aún</h3>
          <p className="task-list-empty-text">
            ¡Crea tu primera tarea para comenzar!
          </p>
        </div>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className={`task-card ${editingTask === task.id ? 'editing' : ''}`}>
            {editingTask === task.id ? (
              <div>
                <div className="task-list-edit-header">
                  <div className="task-list-edit-icon">
                    ✏️
                  </div>
                  <h3 className="task-list-edit-title">Editando tarea</h3>
                </div>

                <div className="task-list-edit-grid">
                  <div className="task-list-edit-full">
                    <label className="task-list-edit-label">Título</label>
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="edit-input"
                      placeholder="Título de la tarea"
                    />
                  </div>

                  <div className="task-list-edit-full">
                    <label className="task-list-edit-label">Descripción</label>
                    <textarea
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      className="edit-textarea"
                      placeholder="Descripción de la tarea"
                      rows="3"
                    />
                  </div>

                  <div>
                    <label className="task-list-edit-label">Estado</label>
                    <select
                      value={editForm.status}
                      onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                      className="edit-select"
                    >
                      <option value="pendiente">📋 Pendiente</option>
                      <option value="en_progreso">⚡ En Progreso</option>
                      <option value="completada">✅ Completada</option>
                    </select>
                  </div>
                </div>

                <div className="task-list-edit-actions">
                  <button
                    onClick={() => setEditingTask(null)}
                    className="btn-cancel"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSave}
                    className="btn-save"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="task-list-header">
                  <div className="task-list-header-flex">
                    <h3 className="task-list-title">{task.title}</h3>
                    <div className={`task-list-status status-${task.status}`}>
                      <span className="task-list-status-icon">
                        {task.status === 'pendiente' ? '📋' :
                         task.status === 'en_progreso' ? '⚡' : '✅'}
                      </span>
                      {task.status === 'pendiente' ? 'Pendiente' :
                       task.status === 'en_progreso' ? 'En Progreso' : 'Completada'}
                    </div>
                  </div>
                  <div className="task-list-actions">
                    <button
                      onClick={() => handleEdit(task)}
                      className="btn-edit"
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="btn-delete"
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>

                <p className="task-list-description">{task.description}</p>

                <div className="task-list-footer">
                  <div className="task-list-footer-left">
                    🕒 Creada: {new Date(task.createdAt).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="task-list-footer-id">
                    ID: {task.id}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
