import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import EditBlog from './components/editBog';
import DeleteBlog from './components/deleteBlog';
import SignIn from './components/signin';
import AddBlog from './components/addBlog';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/edit-blog/:blogId" element={<EditBlog />} />
                <Route path="/delete-blog/:blogId" element={<DeleteBlog />} />
                <Route path="/add-blog" element={<AddBlog />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
