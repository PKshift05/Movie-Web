// Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';


const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 p-4">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      <ul className="mt-4">
        <li>
          <Link to="/admin/users" className="hover:text-gray-300">Quản lý Users</Link>
        </li>
        <li>
          <Link to="/admin/movies" className="hover:text-gray-300">Quản lý Phim</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
