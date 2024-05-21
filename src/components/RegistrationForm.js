import React, { useState } from 'react';

function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(
      'http://localhost:8000/api/users', 
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
      // Do something, maybe redirect to login or whatever
      console.log('Registration successful:', data);
    } else {
      // Handle error, maybe show a message to the user
      console.log('Registration failed:', data);
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
              type="email"
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
        <button type="submit" className="btn btn-light">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
