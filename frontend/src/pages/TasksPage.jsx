import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const TasksPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app-container">
      {/* Header */}
      <div className="dashboard">
        <div className="dashboard-header">
          <div className="flex items-center gap-10">
            <div className="dashboard-header-icon">
              <svg width="24" height="24" fill="none" stroke="white" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="brand">
                TaskFlow
              </h1>
              <p className="brand-subtitle">Panel de Control</p>
            </div>
          </div>
          <div className="user-info">
            <div className="user-avatar">
              <span className="user-avatar-text">
                {user?.name?.charAt(0)?.toUpperCase()}
              </span>
            </div>
            <div className="user-details">
              <h3>Hola, {user?.name}</h3>
              <p>{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="btn-logout"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="btn-logout-icon">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div>
          <div className="tasks-section-header">
            <h2 className="tasks-section-title">Mis Tareas</h2>
            <p className="tasks-section-subtitle">
              Gestiona y organiza todas tus tareas de manera eficiente
            </p>
          </div>

          <TaskForm />
          <TaskList />
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
