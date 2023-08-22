import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserBlogList from './userBlogs';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState('');

    useEffect(() => {
        // Check if the user is logged in
        axios.get('/api/current_user/')
            .then(response => {
                setIsLoggedIn(response.data.is_authenticated);
                setLoggedInUser(response.data.username);
            })
            .catch(error => {
                setIsLoggedIn(false); // Set to false if not authenticated
                console.error(error);
            });
    }, []);

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/login/', {
                username,
                password,
            });
            console.log(response.data); // Handle successful login
            setIsLoggedIn(true);
        } catch (error) {
            console.error(error); // Handle login error
        }
    };
    // get cookies
    function getCookie(name) {
        const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : '';
    }
    const handleLogout = async () => {
        try {
            const csrfToken = getCookie('csrftoken');
            const response = await axios.post('/api/logout/', {}, {
                headers: {
                    'X-CSRFToken': csrfToken, // Get CSRF token function
                },
            });
            // console.log('CSRF Token:', csrfToken);
            console.log(response.data); // Handle successful logout
            setIsLoggedIn(false);
            setLoggedInUser('');
        } catch (error) {
            console.log('CSRF Token:', getCookie('csrftoken'));
            console.error(error); // Handle logout error
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {isLoggedIn ? (
                <div>
                    <p>Welcome, {loggedInUser}!</p>
                    <p>Your Blogs</p>
                    <UserBlogList loggedInUser={loggedInUser}/>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin}>Login</button>
                </div>
            )}
        </div>
    );
}

export default Login;
