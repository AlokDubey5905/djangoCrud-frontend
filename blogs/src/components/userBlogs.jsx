import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserBlogList({ loggedInUser }) {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

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
    const handleDeleteClick = (blogId) => {
        navigate(`/delete-blog/${blogId}`);
    };

    return (
        <div>
            {blogs.map(blog => (
                <div key={blog.id} className='blog-card'>
                    <h3>{blog.title} by {blog.name}</h3>
                    <p>{blog.content}</p>
                    <p>{blog.created_at}</p>
                    {blog.author_username === loggedInUser ? (
                        <div>
                            <button onClick={() => handleEditClick(blog.id)} id='edit-button'>Edit</button>
                            <button onClick={() => handleDeleteClick(blog.id)} id='delete-button'>Delete</button>
                        </div>
                    ) : null}
                </div>
            ))}
        </div>
    );
}

export default UserBlogList;
