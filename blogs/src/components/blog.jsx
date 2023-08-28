import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import '../css/blog.css';
import NavigationBar from './navigationBar';
import { useNavigate } from 'react-router-dom';

function Blog() {

    const { blogId } = useParams();
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [created_at, setCreatedAt] = useState('');
    const navigate = useNavigate;

    useEffect(() => {
        axios.get(`/api/blog/${blogId}/`)
            .then(response => {
                const blog = response.data;
                setName(blog.name);
                setTitle(blog.title);
                setContent(blog.content);
                setCreatedAt(blog.created_at);
                name = blog.name;
                content = blog.content;
                title = blog.title;
                created_at = blog.created_at
            })
            .catch(error => console.error(error));
    }, [blogId]);

    const handleHome = () => {
        window.location.href = '/';
    };

    const navButtons = [{ label: 'Home', onClick: handleHome }];
    const createdAt = new Date(created_at);
    return (
        <div>
            <NavigationBar buttons={navButtons} />
            <div className="blog-container">
                <div className="blog-card-id">
                    <h1>{title}</h1>
                    <p>{name}</p>
                    <p>{content}</p>
                    <p>{`${createdAt.toLocaleDateString()}`}</p>
                </div>
            </div>
        </div>
    )
}

export default Blog