import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import { useSelector } from 'react-redux';
import { useAuth } from './AuthContext';

const NavBar = () => {
  const [scrolling, setScrolling] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate()
  const { logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItem = [
    { link: "Home", path: "/Home" },
    { link: "Search", path: "/Search" },
    { link: "PhimHot", path: "/phimhot" },
    { link: "PhimLe", path: "/phimle" },
    { link: "FAQ", path: "/faq" },
  ];

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50  ${scrolling ? 'bg-purple-900 opacity-65' : 'bg-opacity-100'}`}>
      <div className='text-white flex justify-between items-center text-base gap-8  h-16'>
        Phim moi
        <ul className='md:flex  hidden hover:cursor-pointer'>
          {navItem.map(({ link, path }) => (
            <li key={path} className='block text-base text-white hover:bg-sky-950 first:font-medium p-5'>
              <Link to={path}>{link}</Link>
            </li>
          ))}
        </ul>

        <div className='space-x-12 hidden lg:flex items-center'>
        <div
            className='text-white cursor-pointer hover:bg-sky-900 p-5'
            onMouseEnter={handleDropdownToggle}
            onMouseLeave={handleDropdownToggle}
          >
            {user.userName}
            {showDropdown && (
              <div className='absolute top-16 right-0 bg-slate-700 py-2 px-10 bg-opacity-50 rounded shadow-md'>
                <Link to="/Profile" className='block text-white hover:text-gray-500 py-1'>
                  Profile
                </Link>
                <button onClick={handleLogout} className='block text-white hover:text-gray-500 py-1'>
                  Logout
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default NavBar;
