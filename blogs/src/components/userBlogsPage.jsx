import React, { useState} from 'react'
import UserBlogList from './userBlogs'
import NavigationBar from './navigationBar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UserBlogsPage() {

    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState('');
    const { currentUser } = useParams();
    console.log(currentUser);

    // get cookies
    function getCookie(name) {
        const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : '';
    }

    const handleHome = () => {
        navigate('/');
    }
    const handleAdd = () => {
        console.log(currentUser);
        navigate(`/add-blog/${currentUser}`);
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
            navigate('/');
        } catch (error) {
            console.log('CSRF Token:', getCookie('csrftoken'));
            console.error(error); // Handle logout error
        }
    };

    const navButtons = [
        { label: 'Add a Blog', onClick: handleAdd },
        { label: 'Log Out', onClick: handleLogout },
        { label: 'Home', onClick: handleHome }
    ];
    return (
        <div>
            <NavigationBar buttons={navButtons} />
            <h1>Your Blogs</h1>
            <UserBlogList loggedInUser={currentUser}  />
        </div>
    )
}

export default UserBlogsPage