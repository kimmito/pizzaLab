import React, { useState } from 'react';
import PropTypes from 'prop-types';
import "../css/loginForm.css";

const LoginForm = ({ onLogin, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onLogin(email, password);
    if (!success) {
      setError('Неверный email или пароль');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="login-modal">
        <div className="login-content">
          <button className="login-close-button" onClick={onClose}>×</button>
          <h3 className="title-text login-title">Вход в админку</h3>
          {error && <div className="error-message">{error}</div>}
          <form className='login-form' onSubmit={handleSubmit}>
            <input
              type="email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              type="password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль"
              required
            />
            <button type="submit" className="login-submit-button">Войти</button>
          </form>
        </div>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default LoginForm;