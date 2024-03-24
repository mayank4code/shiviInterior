import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./css/navbar.css"


const Navbar = () => {
    return (
    <nav>
        <div className='container'>
            <img className="container-item" id='logo' src="https://www.shutterstock.com/image-vector/url-shortener-man-pushes-address-bar-2201694049" alt="Logo" />

            <div className="container-item">item 1</div>
            <div className="container-item">item 2 </div>
            <div className="container-item">item 3</div>
            <div className="container-item">item 4</div>
            <div className="container-item">item 5</div>
            <div className="container-item">item 6</div>
            <div className="container-item">item 7</div>
            <div className="container-item">item 8</div>

        </div>
    </nav>
    );
}
 
export default Navbar;