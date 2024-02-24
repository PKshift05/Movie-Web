
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UsersPage from './UsersPage';
import MoviesPage from './MoviesPage';

const Content = () => {
  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
      
      <Routes>
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </main>
  );
};

export default Content;

