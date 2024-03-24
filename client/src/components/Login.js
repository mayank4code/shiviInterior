// Login.js
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './css/login.css';

const Login = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({ mobile: '', password: '' });

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.id]: e.target.value });
    };

    const handleSubmit = async () => {
        const response = await fetch('http://localhost:5000/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': `${localStorage.getItem('token')}`
            },
            body: JSON.stringify(inputs)
        });
        const data = await response.json();
        if (data.success) {
            toast.success('You are Logged in successfully');
            localStorage.setItem('token', data.token);
            navigate('/');
        } else {
            toast.error('Unable to login. Please try again later.');
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <div>
                <label htmlFor="mobile">Mobile: </label>
                <input onChange={handleChange} type="text" id="mobile" placeholder="mobile" />
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <input onChange={handleChange} type="password" id="password" placeholder="Password" />
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default Login;
