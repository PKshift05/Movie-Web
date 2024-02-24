import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [featuredMovies, setFeaturedMovies] = useState([]);
    const [latestMovies, setLatestMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const navigate =useNavigate();
    const initialStates = {
        loaiPhim: 'all',
        theloaiPhim: 'all',
        quocGia: 'all',
        nam: 'all',
        thoiLuong: 'all',
        sapXep: 'all',
    };

    const [selectedValues, setSelectedValues] = useState(initialStates);

    useEffect(() => {
        // Fetch data for featured movies (5 movies)
        axios.get('http://127.0.0.1:5000/movies')
            .then(response => {
                console.log(response.data); // Kiểm tra dữ liệu từ API
                setFeaturedMovies(response.data.slice(0, 5));
            })
            .catch(error => console.error('Error fetching featured movies:', error));
    }, []);

    useEffect(() => {
        const shouldNavigate = Object.keys(selectedValues).some(
            key => selectedValues[key] !== initialStates[key]
        );

        if (shouldNavigate) {
            navigate("/Filter", { state: selectedValues });
        }
    }, [selectedValues]);


    const handleLoaiPhimChange = (event) => {
        setSelectedValues({ ...selectedValues, loaiPhim: event.target.value });
    };

    const handleTheloaiPhimChange = (event) => {
        setSelectedValues({ ...selectedValues, theloaiPhim: event.target.value });
    };

    const handleQuocGiaChange = (event) => {
        setSelectedValues({ ...selectedValues, quocGia: event.target.value });
    };

    const handleNamChange = (event) => {
        setSelectedValues({ ...selectedValues, nam: event.target.value });
    };

    const handleThoiLuongChange = (event) => {
        setSelectedValues({ ...selectedValues, thoiLuong: event.target.value });
    };

    const handleSapXepChange = (event) => {
        setSelectedValues({ ...selectedValues, sapXep: event.target.value });
    };
   
    return (
        <div >

            <div className='  pt-16  px-4 lg:px-14  bg-slate-900'>
                <NavBar />
                <div className='flex mx-auto  max-w-7xl bg-slate-700 py-4 my-5 rounded-lg' >
                    <div className='flex flex-col mx-auto  my-auto '>
                        <label className="text-left  text-white  font-bold mb-1">
                            Loại phim:
                        </label>
                        <select className='h-9 w-48 rounded-md'  value={selectedValues.loaiPhim} onChange={handleLoaiPhimChange}>
                            <option value="all">- Tất cả -</option>
                            <option value="phim lẻ">Phim Lẻ</option>
                            <option value="phim bộ">Phim Bộ</option>


                        </select>
                    </div>
                    <div className='flex flex-col mx-auto  my-auto '>
                        <label className="text-left  text-white  font-bold mb-1">
                            Thể loại:
                        </label>
                        <select className='h-9 w-48 rounded-md' value={selectedValues.theloaiPhim} onChange={handleTheloaiPhimChange} >
                            <option value="all">- Tất cả -</option>
                            <option value="Âm nhạc">Âm nhạc</option>
                            <option value="Bí ẩn">Bí ẩn</option>
                            <option value="Chiến tranh">Chiến tranh</option>
                            <option value="Gia đình">Gia đình</option>
                            <option value="Giật gân">Giật gân</option>
                            <option value="Gài">Hài</option>
                            <option value="Hành động">Hành động</option>


                        </select>
                    </div>
                    <div className='flex flex-col mx-auto  my-auto '>
                        <label className="text-left  text-white  font-bold mb-1">
                            Quốc gia:
                        </label>
                        <select className='h-9 w-48 rounded-md' value={selectedValues.quocGia} onChange={handleQuocGiaChange}  >
                            <option value="all">- Tất cả -</option>
                            <option value="Mỹ">Mỹ</option>
                            <option value="Hàn Quốc">Hàn Quốc</option>
                            <option value="Anh">Anh </option>
                            <option value="Pháp">Pháp </option>
                            <option value="Canada">Canada </option>
                            <option value="Nhật Bản">Nhật Bản </option>


                        </select>
                    </div>
                    <div className='flex flex-col mx-auto  my-auto '>
                        <label className="text-left  text-white  font-bold mb-1">
                            Năm:
                        </label>
                        <select className='h-9 w-48 rounded-md'  value={selectedValues.nam} onChange={handleNamChange}>
                            <option value="all">- Tất cả -</option>
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>

                        </select>
                    </div>
                    <div className='flex flex-col mx-auto  my-auto '>
                        <label className="text-left  text-white  font-bold mb-1">
                            Thời lượng:
                        </label>
                        <select className='h-9 w-48 rounded-md' value={selectedValues.thoiLuong} onChange={handleThoiLuongChange} >
                            <option value="all">- Tất cả -</option>
                            <option value="30">Dưới 30 phút</option>
                            <option value="60">30' - 1 tiếng</option>
                            <option value="90">1 - 1.5 tiếng</option>

                        </select>
                    </div>
                    <div className='flex flex-col mx-auto  my-auto '>
                        <label className="text-left  text-white  font-bold mb-1">
                            Sắp xếp:
                        </label>
                        <select className='h-9 w-48 rounded-md'  value={selectedValues.sapXep} onChange={handleSapXepChange} >
                            <option value="all">- Tất cả -</option>
                            <option value="Ngày phát hành">Ngày phát hành</option>
                            <option value="Ngày cập nhật">Ngày cập nhật</option>  

                        </select>
                    </div>

                </div>

                <div className="mx-auto mb-8 max-w-7xl">
                    <h2 className="text-2xl text-yellow-700 font-medium mb-1 ">Phim Đề Cử</h2>
                    <hr className="border-t-2 border-slate-700 mb-2" />
                    <div className="flex flex-wrap mx-auto">
                        {Array.isArray(featuredMovies) && featuredMovies.map(movie => (
                            <MovieCard key={movie._id} movie={movie} />
                        ))}
                    </div>
                </div>

                <div className="mx-auto mb-8  max-w-7xl">
                    <h2 className="text-2xl font-medium mb-1 text-yellow-700">Phim Lẻ mới cập nhật</h2>
                    <hr className='block text-green-600' />;
                    <div className="flex flex-wrap">
                        {Array.isArray(featuredMovies) && featuredMovies.map(movie => (
                            <MovieCard key={movie._id} movie={movie} />
                        ))}
                    </div>
                </div>
                <div className="mx-auto  max-w-7xl">
                    <h2 className="text-2xl font-medium mb-1 text-yellow-700">Phim bộ xem nhiều nhất</h2>
                    <hr className='block t' />;
                    <div className="flex flex-wrap">
                        {Array.isArray(featuredMovies) && featuredMovies.map(movie => (
                            <MovieCard key={movie._id} movie={movie} />
                        ))}
                    </div>
                </div>
    
            </div>
        </div>
    );
};

export default Home;