import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import axios from 'axios';
import MovieCard from './MovieCard';
import { useLocation } from 'react-router-dom';

const FilterScreen = () => {
    const location = useLocation();
    console.log(location.state?.quocGia)
    const defaultValues = 'all';
    const [loaiPhim, setLoaiPhim] = useState(location.state?.loaiPhim || defaultValues);
    const [theloaiPhim, setTheloaiPhim] = useState(location.state?.theloaiPhim || defaultValues);
    const [quocGia, setQuocGia] = useState(location.state?.quocGia || defaultValues)
    const [nam, setNam] = useState(location.state?.nam || defaultValues)
    const [thoiLuong, setThoiLuong] = useState(location.state?.thoiLuong || defaultValues)
    const [sapXep, setSapXep] = useState('all')

    const [movie, setMovie] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    console.log(loaiPhim,theloaiPhim,quocGia,nam,thoiLuong);
    useEffect(() => {

        const handleSearchClick = async () => {
            try {
                // Make an Axios request to your Flask API
                const response = await axios.post('http://127.0.0.1:5000/movieFilter',
                    {
                        loaiPhim: loaiPhim,
                        theloaiPhim: theloaiPhim,
                        quocGia: quocGia,
                        nam: nam,
                        thoiLuong: thoiLuong,
                        sapXep: sapXep,
                    });

                // Update the state with search results
                setMovie(response.data);
                setErrorMessage('');

            } catch (error) {
                console.error('Error fetching movie details:', error);
                setMovie(null)
                if (error.response && error.response.status === 404) {
                    setErrorMessage("Không tìm thấy phim!");
                } else {
                    setErrorMessage('')
                }
            }
        };
        handleSearchClick();
    }, [loaiPhim, theloaiPhim, quocGia, nam, thoiLuong, sapXep]);


    const handleLoaiPhimChange = (event) => {
        setLoaiPhim(event.target.value);
    };

    const handleTheloaiPhimChange = (event) => {
        setTheloaiPhim(event.target.value);
    };

    const handleQuocGiaChange = (event) => {
        setQuocGia(event.target.value);
    };

    const handleNamChange = (event) => {
        setNam(event.target.value);
    };

    const handleThoiLuongChange = (event) => {
        setThoiLuong(event.target.value);
    };

    const handleSapXepChange = (event) => {
        setSapXep(event.target.value);
    };
    return (
        <div className=' pt-16  px-4 lg:px-14 min-h-screen bg-slate-900'>
            <NavBar />
            <div className='flex mx-auto  max-w-7xl bg-slate-700 py-4  mt-5 mb-10 rounded-lg' >

                <div className='flex flex-col mx-auto  my-auto '>
                    <label className="text-left  text-white  font-bold mb-1">
                        Loại phim:
                    </label>
                    <select className='h-9 w-48 rounded-md' value={loaiPhim} onChange={handleLoaiPhimChange}>
                        <option value="all">- Tất cả -</option>
                        <option value="phim lẻ">Phim Lẻ</option>
                        <option value="phim bộ">Phim Bộ</option>
                    </select>
                </div>
                <div className='flex flex-col mx-auto  my-auto '>
                    <label className="text-left  text-white  font-bold mb-1">
                        Thể loại:
                    </label>
                    <select className='h-9 w-48 rounded-md' value={theloaiPhim} onChange={handleTheloaiPhimChange} >
                        <option value="all">- Tất cả -</option>
                        <option value="Âm nhạc">Âm nhạc</option>
                        <option value="Bí ẩn">Bí ẩn</option>
                        <option value="Chiến tranh">Chiến tranh</option>
                        <option value="Gia đình">Gia đình</option>
                        <option value="Giật gân">Giật gân</option>
                        <option value="Hài">Hài</option>
                        <option value="Hành động">Hành động</option>


                    </select>
                </div>
                <div className='flex flex-col mx-auto  my-auto '>
                    <label className="text-left  text-white  font-bold mb-1">
                        Quốc gia:
                    </label>
                    <select className='h-9 w-48 rounded-md' value={quocGia} onChange={handleQuocGiaChange}  >
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
                    <select className='h-9 w-48 rounded-md' value={nam} onChange={handleNamChange} >
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
                    <select className='h-9 w-48 rounded-md' value={thoiLuong} onChange={handleThoiLuongChange}>
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
                    <select className='h-9 w-48 rounded-md' value={sapXep} onChange={handleSapXepChange} >
                        <option value="all">- Tất cả -</option>
                        <option value="Ngày phát hành">Ngày phát hành</option>
                        <option value="Ngày cập nhật">Ngày cập nhật</option>

                    </select>
                </div>

            </div>
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
    );
};

export default FilterScreen;