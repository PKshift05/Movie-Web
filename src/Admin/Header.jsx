// Header.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';

import { useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom'; 

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate()
  const { logout } = useAuth();
  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <header className="bg-gray-700 p-4 flex justify-between">
      <h1 className="text-white text-2xl font-bold">Admin Dashboard</h1>
      <div
            className='text-white cursor-pointer  hover:bg-sky-900 p-5 '
            onMouseEnter={handleDropdownToggle}
            onMouseLeave={handleDropdownToggle}
          >
            {user.userName}
            {showDropdown && (
              <div className='absolute mt-5 right-0 bg-slate-900 py-2 px-10 bg-opacity-50 rounded shadow-md'>
                <button onClick={handleLogout} className='block text-white hover:text-yellow-500'>
                  Logout
                </button>
              </div>
            )}
          </div>
    </header>
  );
};

export default Header;
