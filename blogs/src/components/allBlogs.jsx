import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('/api/blogs/')
      .then(response => {
        setBlogs(response.data);
        console.log(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      {blogs.map(blog => (
        <div key={blog.id}>
          <h3>{blog.title} by {blog.name}</h3>
          <p>{blog.content}</p>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
