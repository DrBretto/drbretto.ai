import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import AnimatedButton from '../tools/AnimatedButton';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setTokens } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('email', email);
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
      setTokens(data.authToken);
      console.log('Login success:', data.authtoken);
    } else {
      // handle error, e.g. show a message to the user
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center bg-dark text-light">
      <form onSubmit={handleSubmit} className="bg-secondary p-4 rounded">
        <div className="mb-3 row">
          <label htmlFor="emailInput" className="col-sm-2 col-form-label">
            Email:
          </label>
          <div className="col-sm-10">
            <input
              id="emailInput"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="passwordInput" className="col-sm-2 col-form-label">
            Password:
          </label>
          <div className="col-sm-10">
            <input
              id="passwordInput"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>
        </div>
         <AnimatedButton> 
          <button type="submit" className="btn btn-light">
            Log in
          </button>
         </AnimatedButton> 
      </form>
    </div>
  );
}

export default LoginForm;
