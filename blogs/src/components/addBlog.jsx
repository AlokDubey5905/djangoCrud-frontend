import React, { useState } from 'react';
import axios from 'axios';
import '../css/addBlog.css';

function AddBlog() {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [blogs, setBlogs] = useState([]);

    // get cookies
    function getCookie(name) {
        const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : '';
    }

    const refreshBlogs = async () => {
        try {
            const response = await axios.get('/api/blogs/');
            setBlogs(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddBlog = async () => {
        try {
            const csrfToken = getCookie('csrftoken');
            const response = await axios.post('/api/add_blog/', { name, title, content }, {
                headers: {
                    'X-CSRFToken': csrfToken, // Include the CSRF token in the request headers
                },
            }
            );
            console.log(response.data);
            setName('');
            setTitle('');
            setContent('');
            refreshBlogs(); // Refresh the blogs list after addition
            window.location.href = '/';
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="add-blog-container">
            <div className="add-blog-form">
                <h2>Add Blog</h2>
                <input
                    type="text"
                    placeholder="Author name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Title of the blog"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Content of the blog"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button onClick={handleAddBlog}>Add Blog</button>
            </div>
        </div>
    );
}

export default AddBlog;