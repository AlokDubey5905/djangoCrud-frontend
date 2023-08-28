import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavigationBar from './navigationBar';

function BlogSearch() {
    const { searchQuery } = useParams();
    // const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        // console.log(searchQuery)
        axios.get(`/api/search/?query=${searchQuery}`)
            .then(response => {
                setSearchResults(response.data);
                console.log(response.data);
            })
            .catch(error => console.error(error));
    }, [searchQuery]);

    const handleBlog = (blogId) => {
        window.location.href = `/handle-blog/${blogId}`;
        // navigate(`/handle-blog/${blogId}`);
    };

    const handleHome = () => {
        window.location.href = '/';
    };

    const navButtons = [{ label: 'Home', onClick: handleHome }];

    return (
        <div>
            <NavigationBar buttons={navButtons} />
            <p>Search result(s) for "{searchQuery}"</p>
            <div className='container'>
                {searchResults.length === 0 ? (
                    <p>No results found for "{searchQuery}"</p>
                ) : (
                    searchResults.map(blog => {
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
                                    <button onClick={() => handleBlog(blog.id)} id='read-blog-button'>Read Blog</button>
                                </div>
                            </div>
                        );
                    }))}
            </div>
        </div>
    );
}

export default BlogSearch;