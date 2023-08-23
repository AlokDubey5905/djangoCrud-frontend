import React, { useState } from 'react';
import axios from 'axios';

function AddBlog({ refreshBlogs }) {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleAddBlog = async () => {
        try {
            const response = await axios.post('/api/add_blog/', {name, title, content });
            console.log(response.data);
            setName('');
            setTitle('');
            setContent('');
            refreshBlogs(); // Refresh the blogs list after addition
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Add Blog</h2>
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
            <button onClick={handleAddBlog}>Add Blog</button>
        </div>
    );
}

export default AddBlog;