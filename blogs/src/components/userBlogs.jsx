import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserBlogList({ loggedInUser }) {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axios.get('/api/user_blogs/')
            .then(response => {
                setBlogs(response.data);
                console.log(response.data)
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            {blogs.map(blog => (
                <div key={blog.id}>
                    <h3>{blog.title} by {blog.name}</h3>
                    <p>{blog.content}</p>
                    <p>{blog.created_at}</p>
                    {blog.author === loggedInUser ? (
                        <div>
                            <button>Edit</button>
                            <button>Delete</button>
                        </div>
                    ) : null}
                </div>
            ))}
        </div>
    );
}

export default UserBlogList;
