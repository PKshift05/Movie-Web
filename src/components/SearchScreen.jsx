import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import axios from 'axios';
import MovieCard from './MovieCard';

const SearchScreen = () => {

    const [movie, setMovie] = useState(null);
    const [movieName, setMovieName] = useState(null);


    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const fetchMovieSearch = async () => {
            try {
                const response = await axios.post(`http://127.0.0.1:5000/movieSearch/${movieName}`);

                const movieData = response.data;
                
                setMovie(movieData);
                setErrorMessage('');
            } catch (error) {
                console.error('Error fetching movie details:', error);
                setMovie(null)
                if (error.response && error.response.status === 404) {
                    setErrorMessage("Không tìm thấy phim!");
                } else{
                    setErrorMessage('')
                }
            }
        };
        if (!movieName || movieName.trim() === "") {
            // Clear previous movie data and error message
            setMovie(null);
            setErrorMessage(null);
        } else {
            // Make API call only when movieName is not empty
            fetchMovieSearch();
        }
    }, [movieName, errorMessage]);

    

    return (
        <div className='min-h-screen bg-slate-900'>
            <NavBar />
            <div className=' mx-auto  max-w-7xl '>
                <input type="text" placeholder="Nhập tên phim..."
                    value={movieName || ''}
                    onChange={(e) => setMovieName(e.target.value)}
                    className='w-full px-4 text-lg  border-2  border-sky-900 py-4 rounded-sm mt-32 mb-10'></input>
                <div className='mx-auto mb-8'>

                    {errorMessage ? (
                        <div className="text-center text-5xl text-red-500">"{errorMessage}"</div>
                    ) : (
                        <div className="flex flex-wrap">
                            {Array.isArray(movie) && movie.map(movie => (
                                <MovieCard key={movie._id} movie={movie} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            
            <div className='relative bg bg-cover ' style={{ backgroundImage: 'url("/img/background.jpg")', height: '60vh' }}>
                <div className='absolute inset-0 bg-slate-900 bg-opacity-70 '></div>

                <div className='relative text-white ml-16  max-w-7xl'>
                    <p className='py-10'>Phim chất lượng cao online của XemPhim khác gì so với các trang phim khác?</p>
                    <ul className='list-disc ml-6'>
                        <li>Là phim bluray (reencoded), có độ phân giải thấp nhất là Full HD (1080p), trong khi hầu hết các trang phim khác chỉ có tới độ phân giải HD (720p) là cao nhất</li>
                        <li>Chất lượng cao, lượng dữ liệu trên giây (bitrate) gấp từ 5 - 10 lần phim online thông thường - đây là yếu tố quyết định độ nét của phim (thậm chí còn quan trọng hơn độ phân giải)</li>
                        <li>Âm thanh 5.1 (6 channel) thay vì stereo (2 channel) như các trang phim khác (kể cả Youtube)</li>
                        <li>Phù hợp để xem trên màn hình TV, máy tính, laptop có độ phân giải cao  </li>
                        <li>Nếu không hài lòng với phụ đề có sẵn, bạn có thể tự upload phụ đề của riêng mình để xem online</li>
                        <li>Có lựa chọn hiện phụ đề song ngữ (tức hiện đồng thời cả tiếng Anh & tiếng Việt), phù hợp với những người muốn học tiếng Anh qua phụ đề phim</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SearchScreen;