import React, { useState, useEffect } from 'react';
import { FaSearch, FaUser, FaEllipsisV } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";


import "../components/css/navbar.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  // Assume you have a function to check authentication status using JWT
  const verifyUser = async () => {
    if (localStorage.getItem('token')) {
      try {
        const response = await fetch(`http://localhost:5000/api/user/verify-user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
        });

        try {
          const result = await response.json();

          if (result.success === true) {
            setIsLoggedIn(true);
            console.log("Logged In");
            if (result.isAdmin === true) {
              setIsAdmin(true);
              console.log("as Admin");
            } else {
              setIsAdmin(false);
              console.log("as User");

            }
          }
        } catch (error) {
          setIsLoggedIn(false);
          toast.error("Unauthorized");
          console.log(error)
          return false;
        }
      } catch (error) {
        console.log(error.message);
        toast.error("Connection error");
        return false;
      } 
    }
    return false;
  }


  const handleLoginLogout = async () => {
    // verifyUser();
    if (isLoggedIn) {
      setIsLoggedIn(false);
      localStorage.removeItem("token");
      toast.success("Logged Out Successfully");
      console.log('Logged out');
    } else {
      // setIsLoggedIn(true);
      navigate('/login');
    }
  };


  useEffect(() => {
    verifyUser();
  }, [localStorage.getItem('token')]);




  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      // Perform search functionality here
      console.log('Searching for:', searchQuery);
    }
  };



  const handleProfile = () => {
    // Redirect to profile page or perform profile functionality
    console.log('Viewing profile');
  };

  const handleMenu = () => {
    // Perform dropdown menu functionality
    console.log('Dropdown menu clicked');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="https://i.pinimg.com/564x/e1/2d/b2/e12db2cd39ecf9241c74e5b235a5d353.jpg" alt="Logo" className="logo" />
        <div className="search-box">
          <input
            type="text"
            id="searchInput" // Add a unique id attribute
            name="searchInput" // Add a unique name attribute
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
          <button onClick={handleSearch}><FaSearch /></button>
        </div>
      </div>
      <div className="navbar-right">
        <button onClick={handleLoginLogout}>{localStorage.getItem("token") && isLoggedIn ? 'Logout' : 'Login'}</button>
        <button onClick={handleProfile}><FaUser />
          {localStorage.getItem("token") && isLoggedIn && isAdmin ? <span> Admin</span> : <span  ></span>}
        </button>
        <div className="dropdown">
          <button onClick={handleMenu}><FaEllipsisV /></button>
          <div className="dropdown-content">
            <a href="/option1">Option 1</a>
            <a href="/option2">Option 2</a>
            <a href="/option3">Option 3</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
