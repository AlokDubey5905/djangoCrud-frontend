import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import '../css/navigationBar.css';
import { useNavigate } from 'react-router-dom';

const NavigationBar = ({ buttons }) => {

    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleKeyPress = (e) => {
        console.log('entered');
        if (e.key === 'Enter') {
            console.log(e);
            handleSearch();
        }
    };


    const handleSearch = () => {

        console.log(searchQuery);
        if (searchQuery) {
            navigate(`/search/${searchQuery}`);
        }
        // console.log('in search function.')
        // window.location.href = `/search/${searchQuery}`;
    }

    return (
        <div className="nav-bar">
            <div className="left">
                <div className="logo">ClearViewBlogs</div>
            </div>
            <div className="right">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Look for topics"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyPress} />
                </div>
                <div className="nav-buttons">
                    {buttons.map((button, index) => (
                        <button key={index} onClick={button.onClick}>
                            {button.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

NavigationBar.propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default NavigationBar;