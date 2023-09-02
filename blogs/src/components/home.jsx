import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserBlogList from './userBlogs';
import BlogList from './allBlogs';
import AddBlog from './addBlog';
import { useNavigate } from 'react-router-dom';
import NavigationBar from './navigationBar';
import '../css/home.css';


function Home() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState('');
    const [showAllBlogs, setShowAllBlogs] = useState(false);

    // Initialize blogs state and setBlogs setter
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is logged in
        axios.get('/api/current_user/')
            .then(response => {
                console.log(response.data)
                setIsLoggedIn(response.data.is_authenticated);
                setLoggedInUser(response.data.username);
            })
            .catch(error => {
                setIsLoggedIn(false); // Set to false if not authenticated
                console.error(error);
            });
    }, []);

    const refreshBlogs = async () => {
        try {
            const response = await axios.get('/api/blogs/');
            setBlogs(response.data);
        } catch (error) {
            console.error(error);
        } 
    };

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

    const handleSignInClick = () => {
        navigate(`/signin`);
    };

    const handleSignUpClick = () => {
        navigate(`/signup`);
    };

    const handleAdd = () => {
        console.log(loggedInUser);
        navigate(`/add-blog/${loggedInUser}`);
    }

    const handleuserPage=()=>{
        console.log(loggedInUser);
        navigate(`/user-blogs/${loggedInUser}`);
    }

    const navButtonsWithAuth = [
        { label: 'Add a Blog', onClick: handleAdd },
        { label: 'Log Out', onClick: handleLogout },
        { label:'Your Blogs', onClick:handleuserPage}
    ];

    const navButtonsWithoutAuth = [
        { label: 'Login', onClick: handleSignInClick },
        { label: 'Sign Up', onClick: handleSignUpClick }
    ];


    return (
        <div className='homepage'>
            {isLoggedIn ? (
                <div>
                    <NavigationBar buttons={navButtonsWithAuth} />
                    <p id='welcome-text'>Welcome, {loggedInUser}</p>
                    <BlogList />
                </div>
            ) : (
                <div>
                    <NavigationBar buttons={navButtonsWithoutAuth} />
                    <BlogList />
                </div>
            )}
        </div>
    );
}

export default Home;
