import React from 'react'
import { Link } from 'react-router-dom'
import { BiShoppingBag, BiSearchAlt } from 'react-icons/bi'
// import { GiSofa } from 'react-icons/gi'
import sofa_logo from '../assets/main logo/home&beyond.png'

import '../stylesheets/homepage/header.scss';

function Header() {

    return (
        <header className='header-container'>
            <div className='logo-container'>
                <Link to="/home">
                    {/* <GiSofa className='icon' /> */}
                    <img src={sofa_logo} alt="main-logo" />
                </Link>
            </div>
            <div className='searchbar-container'>
                <input type="text" placeholder='search' />
                <button type="submit">
                    <BiSearchAlt className='icon' />
                </button>
            </div>
            <div className="cart-container">
                <Link to="/cart">
                    <BiShoppingBag className='icon' />
                </Link>
            </div>
        </header>
    )
}

export default Header