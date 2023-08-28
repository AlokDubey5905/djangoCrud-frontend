import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/userBlogs.css';

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate;

  useEffect(() => {
    axios.get('/api/blogs/')
      .then(response => {
        setBlogs(response.data);
        console.log(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  const handleBlog = (blogId) => {
    window.location.href = `/handle-blog/${blogId}`;
    // navigate(`/handle-blog/${blogId}`);
  };

  return (
    <div>
      <h2>All Blogs!!</h2>
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
                <button onClick={() => handleBlog(blog.id)} id='read-blog-button'>Read Blog</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BlogList;
