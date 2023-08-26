import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserBlogList from './userBlogs';
import BlogList from './allBlogs';
import AddBlog from './addBlog';
import { useNavigate } from 'react-router-dom';


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
    const handleToggleAllBlogs = () => {
        setShowAllBlogs(prevShowAllBlogs => !prevShowAllBlogs);
    };

    const handleSignInClick = () => {
        navigate(`/signin`);
    };

    const handleAdd=()=>{
        navigate(`/add-blog`);
    }


    return (
        <div>
            <h1>Welcome to Bloggers!!</h1>
            {isLoggedIn ? (
                <div>
                    <p>Welcome, {loggedInUser}!</p>
                    <h2>Your Blogs</h2>
                    <UserBlogList loggedInUser={loggedInUser} />
                    <button onClick={handleToggleAllBlogs} className='showblog-button'>{showAllBlogs ? 'Close Blogs' : 'Show All Blogs'}</button>
                    {showAllBlogs && <BlogList />}
                    <button onClick={handleAdd} id='addblog-button'>Add a blog</button>
                    {/* <AddBlog refreshBlogs={refreshBlogs} /> */}
                    <button onClick={handleLogout} id='logout-button'>Logout</button>
                </div>
            ) : (
                <div>
                    <p>Welcome!!</p>
                    <BlogList/>
                    <button onClick={handleSignInClick} id='signin-button'>SignIn</button>
                </div>
            )}
        </div>
    );
}

export default Home;
