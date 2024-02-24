// Dashboard.jsx
import React from 'react';
import Sidebar from './SideBar';
import Header from './Header';
import Content from './Content';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <Content />
      </div>
    </div>
  );
};

export default Dashboard;
