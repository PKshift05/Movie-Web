import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import LoginPage from './components/LoginPage';
import ProtectedPage from './components/ProtectedPage';
import Home from './components/Home';
import Register from './components/Register';
import MovieDetails from './components/MovieDetails';
import SearchScreen from './components/SearchScreen';
import FilterScreen from './components/FilterScreen';
import HotMovieScreen from './components/HotMovieScreen';
import SingleMovieScreen from './components/SingleMovieScreen';
import DashBoard from './Admin/DashBoard';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />}exact  />
          <Route path='/register' element={<Register />} />
          <Route path="/protected" element={<ProtectedPage />} />
          <Route path="/admin/*" element={<DashBoard />} exact />
          <Route path="/Home" element={<Home />} />
          <Route path="/MovieDetails/:movieId" element={<MovieDetails />} />
          <Route path="/Search" element={<SearchScreen />} />
          <Route path="/phimhot" element={<HotMovieScreen />} />
          <Route path="/phimle" element={<SingleMovieScreen />} />
          <Route path="/Filter" element={<FilterScreen />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
