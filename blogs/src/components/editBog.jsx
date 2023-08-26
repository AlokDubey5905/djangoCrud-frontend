import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'

function EditBlog() {
    const { blogId } = useParams();
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

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
            window.location.href = '/';
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancel = () => {
        // Redirect to home page without making any changes
        window.location.href = '/';
    };

    return (
        <div>
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
            <button onClick={handleSave} id='save-button'>Save</button>
            <button onClick={handleCancel} id='cancel-button'>Cancel</button>
        </div>
    );
}

export default EditBlog;
