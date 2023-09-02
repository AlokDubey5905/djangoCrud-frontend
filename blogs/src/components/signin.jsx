import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/signin.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const areAllFieldsFilled = () => {
        return username !== '' && password !== '';
    }

    // get cookies
    function getCookie(name) {
        const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : '';
    }

    const handleLogin = async () => {
        try {
            const csrfToken = getCookie('csrftoken');
            const response = await axios.post('/api/login/', {
                username,
                password,
            }, {
                headers: {
                    'X-CSRFToken': csrfToken, // Include the CSRF token in the request headers
                },
            });
            console.log(response.data); // Handle successful login
            setIsLoggedIn(true);
            navigate('/');
        } catch (error) {
            setErrorMessage(error.response.data.message);
            console.error(error.response.data.message); // Handle login error
        }
    };

    const handleCreateAccount = () => {
        navigate(`/signup`);
    }

    return (
        <div className="signin-page">
            <div className="signin-container">
                <h2>Login</h2>
                {!areAllFieldsFilled() && <p id='error-message'>All fields are required.</p>}
                <p id='error-message'>{errorMessage}</p>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <div className="password-container">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {showPassword ? (
                        <FaEyeSlash className='eye-icon' onClick={() => setShowPassword(false)} />
                    ) : (
                        <FaEye className='eye-icon' onClick={() => setShowPassword(true)} />
                    )}
                </div>

                <button onClick={handleLogin} disabled={!areAllFieldsFilled()}>Login</button>
                <p>Don't have an account? <b onClick={handleCreateAccount}>Create Account</b></p>
            </div>
        </div>
    );
}

export default SignIn;