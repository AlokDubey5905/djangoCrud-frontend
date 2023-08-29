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
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingCommentText, setEditingCommentText] = useState('');
    const navigate = useNavigate();


    function getCookie(name) {
        const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : '';
    }

    const isCommentAuthor = (comment) => {
        return comment.author === loggedInUser;
    };

    const csrfToken = getCookie('csrftoken');

    useEffect(() => {
        axios.get(`/api/blog/${blogId}/`)
            .then(response => {
                const blog = response.data;
                setName(blog.name);
                setTitle(blog.title);
                setContent(blog.content);
                setCreatedAt(blog.created_at);
            })
            .catch(error => console.error(error));

        axios.get(`/api/public-blogs/${blogId}/comments/`)
            .then(response => {
                console.log(response.data)
                setComments(response.data);
            })
            .catch(error => console.error(error));
    }, [blogId]);

    useEffect(() => {
        // Check if the user is logged in
        axios.get('/api/current_user/')
            .then(response => {
                setIsLoggedIn(response.data.is_authenticated);
                setLoggedInUser(response.data.username);
            })
            .catch(error => {
                setIsLoggedIn(false); // Set to false if not authenticated
                console.error(error);
            });
    }, []);

    const handlePostComment = () => {

        if (!isLoggedIn) {
            // Redirect to signup page
            navigate('/signup');
            return;
        }
        if (newComment.trim() === '') return;

        // Post new comment to the backend
        axios.post(`/api/blogs/${blogId}/comments/`, { blog: blogId, text: newComment }, {
            headers: {
                'X-CSRFToken': csrfToken,
            }
        })
            .then(response => {
                setComments([...comments, response.data]);
                setNewComment('');
            })
            .catch(error => console.error(error));
    };

    const handleHome = () => {
        navigate('/');
    };

    const handleReplyClick = (commentId) => {
        const updatedComments = comments.map(comment => {
            if (comment.id === commentId) {
                return {
                    ...comment,
                    showReplyInput: !comment.showReplyInput,
                };
            }
            return comment;
        });
        setComments(updatedComments);
    };

    const handleReplyChange = (commentId, value) => {
        const updatedComments = comments.map(comment => {
            if (comment.id === commentId) {
                return {
                    ...comment,
                    newReply: value,
                };
            }
            return comment;
        });
        setComments(updatedComments);
    };

    const handlePostReply = (commentId) => {
        const comment = comments.find(comment => comment.id === commentId);
        if (!comment.newReply.trim()) return;

        axios.post(`/api/blogs/${blogId}/comments/`, {
            blog: blogId,
            text: comment.newReply,
            parent_comment: comment.id,
        }, {
            headers: {
                'X-CSRFToken': csrfToken,
            }
        })
            .then(response => {
                const updatedComments = comments.map(comment => {
                    if (comment.id === commentId) {
                        return {
                            ...comment,
                            replies: [...comment.replies, response.data],
                            newReply: '',
                            showReplyInput: false,
                        };
                    }
                    return comment;
                });
                setComments(updatedComments);
            })
            .catch(error => console.error(error));
    };

    const handleEditClick = (commentId, commentText) => {
        setEditingCommentId(commentId);
        setEditingCommentText(commentText);
    };

    const handleDeleteClick = (commentId) => {
        // Send a DELETE request to the backend to delete the comment
        axios.delete(`/api/comments/${commentId}/`, {
            headers: {
                'X-CSRFToken': csrfToken,
            }
        })
            .then(response => {
                // Remove the deleted comment from the state
                const updatedComments = comments.filter(comment => comment.id !== commentId);
                setComments(updatedComments);
            })
            .catch(error => console.error(error));
    };
    const handleSaveClick = (commentId) => {
        // Send PUT request to update the comment
        console.log(editingCommentText);
        console.log(commentId)
        axios.put(`/api/comments/${commentId}/`, { blog: blogId, text: editingCommentText }, {
            headers: {
                'X-CSRFToken': csrfToken,
            }
        })
            .then(response => {
                const updatedComments = comments.map(comment => {
                    if (comment.id === commentId) {
                        return { ...comment, text: editingCommentText };
                    }
                    return comment;
                });
                setComments(updatedComments);
                setEditingCommentId(null); // Clear editing mode
                setEditingCommentText('');
            })
            .catch(error => console.error(error.response.data));
    };

    const handleCancelClick = () => {
        setEditingCommentId(null); // Clear editing mode
    };

    const navButtons = [{ label: 'Home', onClick: handleHome }];
    const createdAt = new Date(created_at);
    return (
        <div>
            <NavigationBar buttons={navButtons} />
            <div className="blog-container">
                <div className="blog-card-id">
                    <h1>{title}</h1>
                    <p>{name} | {`${createdAt.toLocaleDateString()}`}</p>
                    <p>{content}</p>
                </div>
                <div className="comment-list">
                    <h2>Comments</h2>
                    {comments && Array.isArray(comments) && comments.length > 0 ? (
                        comments.map(comment => (
                            <div key={comment.id} className="comment-card">
                                <p><strong>{comment.author}</strong> | {comment.created_at}</p>
                                {editingCommentId === comment.id ? (
                                    <div className='edit-comment'>
                                        <textarea
                                            value={editingCommentText}
                                            onChange={(e) => setEditingCommentText(e.target.value)}
                                        />
                                        <div className="comment-edit-buttons">
                                            <button onClick={() => handleSaveClick(comment.id)}>Save</button>
                                            <button onClick={() => handleCancelClick()}>Cancel</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <p>{comment.text}</p>
                                        {isLoggedIn && isCommentAuthor(comment) && (
                                            <div className='comment-action-buttons'>
                                                <button onClick={() => handleEditClick(comment.id, comment.text)} id='edit-button'>Edit</button>
                                                <button onClick={() => handleDeleteClick(comment.id)} id='delete-button'>Delete</button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No comments yet.</p>
                    )}
                    <div className="comment-form">
                        <textarea
                            placeholder="Write a comment..."
                            value={newComment}
                            onChange={e => setNewComment(e.target.value)}
                        />
                        <button onClick={handlePostComment}>Post Comment</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Blog