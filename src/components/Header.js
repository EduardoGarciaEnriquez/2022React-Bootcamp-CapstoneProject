import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { BiSearchAlt } from 'react-icons/bi'
import Icon from './cart/Icon'
import sofa_logo from '../assets/main logo/home&beyond.png'


import '../stylesheets/homepage/header.scss';

function Header() {
    let navigate = useNavigate();

    const handleOnClick = () => {
        var inputValue = document.getElementById("search").value;
        navigate("/search?q=" + inputValue);
    }
    
    return (
        <header className='header-container'>
            <div className='logo-container'>
                <Link to="/home">
                    <img src={sofa_logo} alt="main-logo" />
                </Link>
            </div>
            <div className='searchbar-container'>
                <input id='search' type="text" placeholder='search' />
                <button onClick={handleOnClick} type="submit">
                    <BiSearchAlt className='icon' />
                </button>
            </div>
            <div className="cart-container">
                <Link to="/cart">
                    <Icon />
                </Link>
            </div>
        </header>
    )
}

export default Header