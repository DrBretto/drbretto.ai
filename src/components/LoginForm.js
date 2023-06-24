import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import '../css/LoginForm.css'; // make sure to create this file

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setAuthTokens, setIsAuthenticated } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(
      'https://api-x0xg.onrender.com/api/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setAuthTokens(data.tokens);
      setIsAuthenticated(true);
    } else {
      // handle error, e.g. show a message to the user
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 animate">
      <form onSubmit={handleSubmit} className="form-inline">
        <div className="form-group mb-2">
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="form-group mx-sm-3 mb-2">
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary mb-2">
          Log in
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
