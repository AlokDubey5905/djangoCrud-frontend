import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/userBlogs.css';

function UserBlogList({ loggedInUser }) {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();
    const [deleteBlogId, setDeleteBlogId] = useState(null);

    // get cookies
    function getCookie(name) {
        const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : '';
    }

    useEffect(() => {
        axios.get('/api/user_blogs/')
            .then(response => {
                setBlogs(response.data);
                console.log(response.data)
            })
            .catch(error => console.error(error));
    }, []);

    // Redirect to EditBlog component with blogId as parameter
    const handleEditClick = (blogId) => {
        navigate(`/edit-blog/${blogId}`);
    };

    // Redirect to DeleteBlog component with blogId as parameter
    const handleDelete = async () => {
        try {
            const csrfToken = getCookie('csrftoken');
            const response = await axios.delete(`/api/delete_blog/${deleteBlogId}/`, {
                headers: {
                    'X-CSRFToken': csrfToken, // Include the CSRF token in the request headers
                },
            });
            console.log(response.data); // Handle successful deletion
            // Redirect to home page after successful deletion
            window.location.href = '/';
        } catch (error) {
            console.error(error);
        }
    };

    const handleBlog = (blogId) => {
        navigate(`/handle-blog/${blogId}`);
    };

    const handleDeleteClick = (blogId) => {
        setDeleteBlogId(blogId);
    };

    return (
        <div className='container'>
            {blogs.map(blog => {
                const createdAt = new Date(blog.created_at); // Convert to Date object

                return (
                    <div key={blog.id} className='blog-card'>
                        <div className="blog-content">
                            <h3 id='title'>{blog.title}</h3>
                            <div className="published">
                                <p id='name'>{blog.name}</p>
                                <p id='time'>{`${createdAt.toLocaleDateString()}`}</p>
                            </div>
                            <p id='content'>{blog.content}</p>
                            <button onClick={() => handleBlog(blog.id)} id='read-blog-button'>Read Full Blog</button>
                        </div>
                        {blog.author_username === loggedInUser ? (
                            <div className='action-buttons'>
                                <button onClick={() => handleEditClick(blog.id)} id='edit-button'>Edit</button>
                                <button onClick={() => handleDeleteClick(blog.id)} id='delete-button'>Delete</button>
                            </div>
                        ) : null}

                        {deleteBlogId === blog.id && (
                            <div className='delete-popup'>
                                <p>Are you sure you want to delete this blog?</p>
                                <button onClick={() => handleDelete(blog.id)}>Yes</button>
                                <button onClick={() => setDeleteBlogId(null)}>No</button>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default UserBlogList;
