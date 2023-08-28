import React, { useState } from 'react';
import axios from 'axios';
import '../css/signup.css';

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        try {
            const response = await axios.post('/api/signup/', {
                username,
                password,
            });
            console.log(response.data);
            window.location.href = '/'; // Handle successful signup
        } catch (error) {
            console.error(error); // Handle signup error
        }
    };

    return (
        <div className="signup-page">
            <div className='signup-container'>
                <h2>Signup</h2>
                <input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleSignup}>Signup</button>
            </div>
        </div>
    );
}

export default Signup;
