import React from 'react';
import {  useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    const movieId = String(movie._id);
    navigate(`/MovieDetails/${movieId}`);
  };  
  return (
    <div className="w-1/5 p-2" onClick={handleCardClick} >
      <div >
        <div className="w-60 h-80 overflow-hidden cursor-pointer"  >
          <img src={movie.PosterMovie} alt={movie.TitleMovie} className="w-full h-full object-cover mb-2 object-top" />
        </div>
        <p className="font-bold  mt-2 text-white cursor-pointer hover:text-yellow-500">{movie.MovieName}</p>
        <p className='text-slate-500 text-sm cursor-pointer'>{movie.TitleMovie}</p>
      </div>

    </div>
  );
};

export default MovieCard;