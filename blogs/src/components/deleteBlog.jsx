import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'

function DeleteBlog() {

    const { blogId } = useParams();
    const [showPopup, setShowPopup] = useState(false);

    // get cookies
    function getCookie(name) {
        const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : '';
    }

    const handleDelete = async () => {
        try {
            const csrfToken = getCookie('csrftoken');
            const response = await axios.delete(`/api/delete_blog/${blogId}/`, {
                headers: {
                    'X-CSRFToken': csrfToken, // Include the CSRF token in the request headers
                },
            });
            console.log(response.data); // Handle successful deletion
            // Redirect to home page after successful deletion
            window.location.href = '/';
        } catch (error) {
            console.error(error);
        }
    };

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    return (
        <div>
            <button onClick={togglePopup}>Delete</button>
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <p>Are you sure you want to delete this blog?</p>
                        <button onClick={handleDelete}>Yes</button>
                        <button onClick={togglePopup}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DeleteBlog;