import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import '../css/editBlog.css';
import NavigationBar from './navigationBar';
import { useNavigate } from 'react-router-dom';

function EditBlog() {
    const { loggedInUser,blogId } = useParams();
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/blog/${blogId}/`)
            .then(response => {
                const blog = response.data;
                setName(blog.name);
                setTitle(blog.title);
                setContent(blog.content);
            })
            .catch(error => console.error(error));
    }, [blogId]);
    // get cookies
    function getCookie(name) {
        const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : '';
    }

    const handleSave = async () => {
        try {
            const csrfToken = getCookie('csrftoken');
            const response = await axios.put(`/api/edit_blog/${blogId}/`, {
                name,
                title,
                content,
            }, {
                headers: {
                    'X-CSRFToken': csrfToken, // Include the CSRF token in the request headers
                },
            });
            console.log(response.data); // Handle successful update
            // Redirect to home page after successful update
            navigate(`/user-blogs/${loggedInUser}`);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancel = () => {
        // Redirect to home page without making any changes
        navigate(`/user-blogs/${loggedInUser}`);
    };

    const handleHome = () => {
        navigate('/');
    };

    const navButtons = [{ label: 'Home', onClick: handleHome }];

    return (
        <div>
            <NavigationBar buttons={navButtons} />
            <div className="edit-blog-container">
                <div className="edit-blog-form">
                    <h2>Edit Blog</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <div className="edit-blog-buttons">
                        <button onClick={handleSave} id='blog-save-button'>Save</button>
                        <button onClick={handleCancel} id='blog-cancel-button'>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditBlog;
