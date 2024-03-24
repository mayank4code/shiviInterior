import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

require('./css/register.css');

const Register = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobile: '',
        city: '',
        age: '',
        gender: '',
        pincode: '',
        country: ''
    });
    const [passwordMatch, setPasswordMatch] = useState(true);

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.id]: e.target.value });
    };

    const handleConfirmPasswordChange = (event) => {
        setInputs({ ...inputs, confirmPassword: event.target.value });
        setPasswordMatch(event.target.value === inputs.password);
    };

    const handleRegister = async () => {
        if (!passwordMatch) {
            toast.error('Passwords do not match.');
            return;
        }

        // Exclude confirmPassword from data sent to the backend
        const { confirmPassword, ...dataToSend } = inputs;

        const response = await fetch('http://localhost:5000/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend)
        });
        const data = await response.json();
        if (data.success) {
            toast.success('You are registered successfully');
            navigate('/');
        } else {
            toast.error('Unable to register. Please try again later.');
        }
    };

    return (
        <div className="register-container">
            <h1>Register</h1>
            <div className="input-group-row">
                <div className="input-group">
                    <label htmlFor="name">Name</label>
                    <input onChange={handleChange} id="name" type="text" placeholder="Enter your name" />
                </div>
                <div className="input-group">
                    <label htmlFor="mobile">Mobile</label>
                    <input onChange={handleChange} id="mobile" type="text" placeholder="Enter your mobile number" />
                </div>
            </div>
            <div className="input-group-row">
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input onChange={handleChange} id="password" type="password" placeholder="Enter your password" />
                </div>
                <div className="input-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input onChange={handleConfirmPasswordChange} id="confirmPassword" type="password" placeholder="Re-enter your password" />
                </div>
                {!passwordMatch && <p className="error-text">Passwords do not match.</p>}
            </div>
            <div className="input-group-row">
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input onChange={handleChange} id="email" type="email" placeholder="Example@email.com" />
                </div>
                <div className="input-group">
                    <label htmlFor="city">City</label>
                    <input onChange={handleChange} id="city" type="text" placeholder="Enter your city" />
                </div>
            </div>
            <div className="input-group-row">
                <div className="input-group">
                    <label htmlFor="age">Age</label>
                    <input onChange={handleChange} id="age" type="number" placeholder="Enter your age" />
                </div>
                <div className="input-group">
                    <label htmlFor="gender">Gender</label>
                    <select onChange={handleChange} id="gender">
                        <option value="">Select Gender</option>
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                        <option value="3">Other</option>
                    </select>
                </div>
            </div>
            <div className="input-group-row">
                <div className="input-group">
                    <label htmlFor="pincode">Pincode</label>
                    <input onChange={handleChange} id="pincode" type="text" placeholder="Enter your pincode" />
                </div>
                <div className="input-group">
                    <label htmlFor="country">Country</label>
                    <input onChange={handleChange} id="country" type="text" placeholder="Enter your country" />
                </div>
            </div>
            <div id='submit-button'>
                <button onClick={handleRegister}>Register</button>
            </div>
        </div>
    );
};

export default Register;
