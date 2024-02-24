import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar'
const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/movie/${movieId}`);

        const movieData = response.data;


        setMovie(movieData);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };
    
    fetchMovieDetails();
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }
  const formatTime = (minutes) => {
    const hoursPart = Math.floor(minutes / 60);
    const minutesPart = minutes % 60;

    const hoursString = hoursPart > 0 ? `${hoursPart} giờ` : '';
    const minutesString = minutesPart > 0 ? `${minutesPart} phút` : '';

    if (hoursPart > 0 && minutesPart > 0) {
      return `${hoursString} ${minutesString}`;
    } else {
      return `${hoursString}${minutesString}`;
    }
  };


  return (
    <div>
      <NavBar/>
      <div className="relative h-screen bg-cover " style={{ backgroundImage: `url(${movie.PosterMovie})`, height: '85vh' }}>
        <div className="absolute  inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className=" text-white  pt-96 mx-auto pl-96 pr-20 items-start justify-normal ">
            <h2 className="text-3xl font-bold mb-2">{movie.MovieName}</h2>
            <p className="text-lg mb-2">{movie.TitleMovie}</p>
            <p className="text-lg mb-2">{formatTime(movie.Duration)}</p>
            <div className="flex flex-row-reverse w-full gap-2">
              {movie.Genre.map((genre, index) => (
                <div key={index} className="hover:bg-slate-300 hover:text-sky-900 hover:cursor-pointer border-2 text-white rounded-3xl">
                  <p className='text-sm py-1 px-5'>
                    {genre}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='flex flex-col mx-20 relative w-64 pt-96'>
          <div className='h-96 overflow-hidden '>
            <img
              src={movie.PosterMovie}
              alt={movie.TitleMovie}
              className="w-full h-full object-cover mb-2  object-top"
            />

          </div>
          <button type="submit" className="bg-red-500 text-white w-full p-2 rounded-sm my-5" >
            XEM PHIM
          </button>
        </div>

      </div>
      <div className=" h-full">
        <div className=' bg-slate-900  flex flex-row mx-auto '>
          <div className="flex flex-col items-start justify-normal pl-96 pr-20 text-white flex-grow ">
            <table className='w-3/12 mt-8 text-left'>
                <tr>
                  <th className='text-stone-600 font-medium '>KHỞI CHIẾU</th>
                  <th className='text-lg font-thin'>{movie.ReleaseDate}</th>
                </tr>
                <tr>
                  <th className='text-stone-600 font-medium '>QUỐC GIA</th>
                  <th className='text-lg font-thin'>{movie.Country}</th>
                </tr>
                <tr>
                  <th className='text-stone-600 font-medium '>PHỤ ĐỀ</th>
                  <th className='text-lg font-thin'>{movie.Language}</th>
                </tr>
            </table>
           
            <p className="text-lg my-7">{movie.Description}</p>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default MovieDetails;
