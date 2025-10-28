import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);

    if (result.success) {
      navigate('/tasks');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="form-container">
      <div className="form-card">
        {/* Logo/Brand Section */}
        <div className="login-brand-container">
          <div className="login-brand-icon">
            <svg width="32" height="32" fill="none" stroke="white" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="login-brand-title">
            TaskFlow
          </h2>
          <p className="login-brand-subtitle">
            Gestiona tus tareas de manera eficiente
          </p>
        </div>

        {/* Login Form */}
        <div className="login-form-section">
          <div className="login-text-center">
            <h3 className="login-form-title">
              Iniciar Sesión
            </h3>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="login-error-message">
                <div className="login-error-content">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20" className="login-error-icon">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              </div>
            )}

            <div>
              <div className="login-input-group">
                <label htmlFor="email" className="login-form-label">
                  Correo electrónico
                </label>
                <div className="login-input-container">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="input-field"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="login-input-group">
                <label htmlFor="password" className="login-form-label">
                  Contraseña
                </label>
                <div className="login-input-container">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="input-field"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading ? (
                <div className="login-loading-content">
                  <svg className="login-loading-spinner" fill="none" viewBox="0 0 24 24">
                    <circle style={{opacity: 0.25}} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path style={{opacity: 0.75}} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Iniciando sesión...
                </div>
              ) : (
                'Iniciar Sesión'
              )}
            </button>

            <div className="login-text-center">
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="btn-secondary"
              >
                ¿No tienes cuenta? <span className="login-link-text">Regístrate</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
