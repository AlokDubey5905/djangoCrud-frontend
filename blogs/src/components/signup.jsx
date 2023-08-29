import React, { useState } from 'react';
import axios from 'axios';
import '../css/signup.css';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [first_name, setfirstname] = useState('');
    const [last_name, setlastname] = useState('');
    const [erroMessage,setErrorMessage]=useState('');
    const navigate = useNavigate();

    // get cookies
    function getCookie(name) {
        const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : '';
    }

    const handleSignup = async () => {
        try {
            const csrfToken = getCookie('csrftoken');
            const response = await axios.post('/api/signup/', {
                username,
                password,
                first_name,
                last_name,
            }, {
                headers: {
                    'X-CSRFToken': csrfToken, // Include the CSRF token in the request headers
                },
            });
            console.log(response.data);
            window.location.href = '/'; // Handle successful signup
        } catch (error) {
            setErrorMessage(error.response.data.message);
            console.error(error); // Handle signup error
        }
    };

    const handleLoginAccount = () => {
        navigate(`/signin`);
    }

    return (
        <div className="signup-page">
            <div className='signup-container'>
                <h2>Signup</h2>
                <p>{erroMessage}</p>
                <input
                    type="text"
                    placeholder="Enter first name"
                    value={first_name}
                    onChange={(e) => setfirstname(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Enter last name"
                    value={last_name}
                    onChange={(e) => setlastname(e.target.value)}
                />
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
                <p>Already have an account? <b onClick={handleLoginAccount}>Login</b></p>
            </div>
        </div>
    );
}

export default Signup;
