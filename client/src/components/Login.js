import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission, e.g., send data to backend
    console.log('Username:', username);
    console.log('Password:', password);
    // Reset form fields after submission
    setUsername('');
    setPassword('');
  };

  return (
    <form className="sign-in-form" onSubmit={handleSubmit}>
      <h2 className="title">Sign in</h2>
      <div className="input-field">
        <i className="fas fa-user"></i>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <input type="submit" value="Login" className="btn solid" />
      <p className="social-text">Or Sign in with social platforms</p>
      <div className="social-media">
        {/* Add social media login options if necessary */}
      </div>
    </form>
  );
};

export default Login;
