import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import EditBlog from './components/editBog';
import DeleteBlog from './components/deleteBlog';
import SignIn from './components/signin';
import AddBlog from './components/addBlog';
import Blog from './components/blog';
import Signup from './components/signup';
import BlogSearch from './components/search';
import UserBlogsPage from './components/userBlogsPage';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/edit-blog/:loggedInUser/:blogId" element={<EditBlog />} />
                <Route path="/delete-blog/:blogId" element={<DeleteBlog />} />
                <Route path="/add-blog/:loggedInUser" element={<AddBlog />} />
                <Route path="/handle-blog/:blogId" element={<Blog />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/search/:searchQuery" element={<BlogSearch />} />
                <Route path="/user-blogs/:currentUser" element={<UserBlogsPage/>} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
