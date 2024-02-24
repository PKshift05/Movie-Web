// MoviesPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCardad from './MovieCardad';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [movieName, setMoviename] = useState("")

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMovie, setNewMovie] = useState({
    MovieName: '',
    TitleMovie: '',
    Description: '',
    Duration: '',
    Language: '',
    ReleaseDate: '',
    Country: '',
    Genre: [],
    PosterMovie: '',
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [boxSuccess, setBoxSuccess] = useState(false)

  const handleCfClick = () => {
    setErrorMessage('')
    setBoxSuccess(false)
  };

  const handleAddButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(newMovie);
    try {
      // Make an Axios request to create a new movie
      await axios.post('http://127.0.0.1:5000/movies', newMovie);

      setNewMovie({
        MovieName: '',
        TitleMovie: '',
        Description: '',
        Duration: '',
        Language: '',
        ReleaseDate: '',
        Country: '',
        Genre: [],
        PosterMovie: '',
      });

      setErrorMessage('Thêm thành công')
      setBoxSuccess(true)

      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating movie:', error);
      setBoxSuccess(true)
      setErrorMessage('Thêm không thành công!')
    }
  };
  useEffect(() => {

    getAll();
  }, []);
  useEffect(() => {
    if (!movieName || movieName.trim() === "") {
      // Clear previous movie data and error message
      getAll()
  } else {
      // Make API call only when movieName is not empty
      fetchMovieSearch();
  }
  }, [movieName]);

  const getAll = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/movies');

      const movieData = response.data;

      setMovies(movieData);

    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };
  const fetchMovieSearch = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:5000/movieSearch/${movieName}`);

      const movieData = response.data;

      setMovies(movieData);

    } catch (error) {
      console.error('Error fetching movie details:', error);
      setMovies(null)
      if (error.response && error.response.status === 404) {

      } else {

      }
    }
  };




  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Quản lý Phim</h2>

      <div className="mb-4 flex justify-end mr-6">
        <input
          type="text"
          placeholder="Tìm kiếm tên phim"
          value={movieName}
          onChange={(e) => setMoviename(e.target.value)}
          className="px-2 border border-gray-300 rounded mx-5"
        />
        <button className=" bg-slate-600 text-white px-2 py-1 my-2 rounded " onClick={handleAddButtonClick}>Thêm phim</button>
      </div>
      {errorMessage && (
        <div className="fixed inset-0  bg-black bg-opacity-50 flex justify-center items-center">

          <div className='bg-white w-1/6 p-4 rounded-md'>
            <p className='text-slate-600 text-lg font-semibold py-2'>
              {errorMessage}
            </p>
            <button type="submit" onClick={handleCfClick} className="bg-blue-500 text-white px-2 py-1 rounded">
              OK
            </button>
          </div>
        </div>

      )}
      {isModalOpen && (
        <div className="fixed inset-0  bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-3/4 p-4 rounded-md">
            <form onSubmit={handleFormSubmit} >

              <div >
                <div className='flex '>
                  <label className=" w-24 ">Tên phim:</label>
                  <input
                    type="text"
                    placeholder='Nhập vào tên phim'
                    value={newMovie.MovieName}
                    onChange={(e) => setNewMovie({ ...newMovie, MovieName: e.target.value })}
                    className="px-2 py-1 border border-gray-300 rounded mb-2 w-full"
                  />
                </div>
                <div className='flex '>
                  <label className=" w-24 ">Tiêu đề phim:</label>
                  <input
                    type="text"
                    placeholder='Nhập vào tên phim'
                    value={newMovie.TitleMovie}
                    onChange={(e) => setNewMovie({ ...newMovie, TitleMovie: e.target.value })}
                    className="px-2 py-1 border border-gray-300 rounded mb-2 w-full"
                  />
                </div>
                <div className='flex '>
                  <label className=" w-24 ">Description:</label>

                  <div className="flex-1">
                    <textarea
                      value={newMovie.Description}
                      placeholder='Mô tả'
                      onChange={(e) => setNewMovie({ ...newMovie, Description: e.target.value })}
                      className="px-2 py-1 border border-gray-300 rounded mb-2 w-full"
                    />
                  </div>
                </div>
                <div className='flex '>
                  <label className=" w-24 ">Thời lượng:</label>
                  <input
                    type="text"
                    placeholder='Thời lượng phút'
                    value={newMovie.Duration}
                    onChange={(e) => setNewMovie({ ...newMovie, Duration: e.target.value })}
                    className="px-2 py-1 border border-gray-300 rounded mb-2 w-full"
                  />
                </div>
                <div className='flex '>
                  <label className=" w-24 ">Ngôn ngữ:</label>
                  <input
                    type="text"
                    placeholder='Ngôn ngữ phim'
                    value={newMovie.Language}
                    onChange={(e) => setNewMovie({ ...newMovie, Language: e.target.value })}
                    className="px-2 py-1 border border-gray-300 rounded mb-2 w-full"
                  />
                </div>
                <div className='flex '>
                  <label className=" w-24 ">Ngày phát hành:</label>
                  <input
                    type="Date"
                    value={newMovie.ReleaseDate}
                    placeholder='YYYY-MM-DD'
                    onChange={(e) => setNewMovie({ ...newMovie, ReleaseDate: e.target.value })}
                    className="px-2 py-1 border border-gray-300 rounded mb-2 w-full"
                  />
                </div>
                <div className='flex '>
                  <label className=" w-24 ">Quốc gia:</label>
                  <input
                    type="text"
                    placeholder='Tên quốc gia'
                    value={newMovie.Country}
                    onChange={(e) => setNewMovie({ ...newMovie, Country: e.target.value })}
                    className="px-2 py-1 border border-gray-300 rounded mb-2 w-full"
                  />
                </div>
                <div className='flex '>
                  <label className=" w-24 ">Thể loại:</label>
                  <input
                    type="text"
                    placeholder="Thể loại (ngăn cách bằng dấu phẩy)"
                    value={newMovie.Genre.join(', ')}
                    onChange={(e) => setNewMovie({ ...newMovie, Genre: e.target.value.split(', ') })}
                    className="px-2 py-1 border border-gray-300 rounded mb-2 w-full"
                  />
                </div>
                <div className='flex '>
                  <label className=" w-24 ">Poster:</label>
                  <input
                    type="text"
                    placeholder='URL Poster'
                    value={newMovie.PosterMovie}
                    onChange={(e) => setNewMovie({ ...newMovie, PosterMovie: e.target.value })}
                    className="px-2 py-1 border border-gray-300 rounded mb-2 w-full"
                  />
                </div>
                <div className='flex mt-5 justify-end'>

                  <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded">
                    Lưu
                  </button>
                  <button type="button" onClick={handleModalClose} className="ml-2 bg-gray-500 text-white px-2 py-1 rounded">
                    Hủy
                  </button>
                </div>
              </div>
              {boxSuccess && (
                <div className="fixed inset-0  bg-black bg-opacity-50 flex justify-center items-center">

                  <div className='bg-white w-1/6 p-4 rounded-md'>
                    <p className='text-slate-600 text-lg font-semibold py-4'>
                      Thêm thành công
                    </p>
                    <div className='flex flex-row justify-center pt-2'>

                      <button type="submit" onClick={handleCfClick} className="bg-blue-500 text-white px-2 mx-1 py-1 rounded">
                        OK
                      </button>

                    </div>
                  </div>
                </div>)}


            </form>
          </div>
        </div>
      )}
      {movies !== null ? (
        movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCardad key={movie._id} movie={movie} />
          ))
        ) : (
          <p>No movies found.</p>
        )
      ) : (
        <p>Loading...</p>
      )}

    </div>
  );
};

export default MoviesPage;
