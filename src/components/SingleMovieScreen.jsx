import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import MovieCard from './MovieCard';
const SingleMovieScreen = () => {
    const [movie, setMovie] = useState(null);
    useEffect(() => {

        axios.get('http://127.0.0.1:5000/movies')
            .then(response => {
                console.log(response.data); // Kiểm tra dữ liệu từ API
                setMovie(response.data);
            })
            .catch(error => console.error('Error fetching featured movies:', error));
    }, []);
    return (
        <div className='min-h-screen bg-slate-900'>
            <NavBar />
            <div className=' mx-auto  max-w-7xl pt-28'>
                <div className='w-full text-4xl font-bold  border-b-2 text-white  border-sky-900 py-4 flex justify-center  mb-10'>
                    <p className=''>Phim Lẻ</p>
                </div>
                <div className='mx-auto mb-8 '>
                    <div className='flex flex-wrap'>

                        {Array.isArray(movie) && movie.map(movie => (
                            <MovieCard key={movie._id} movie={movie} />
                        ))}
                    </div>
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

export default SingleMovieScreen;