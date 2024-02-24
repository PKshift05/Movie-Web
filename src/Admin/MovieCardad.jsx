import axios from 'axios';
import React, { useState } from 'react';
const MovieCardad = ({ movie }) => {

    const MAX_DESCRIPTION_LENGTH = 250; // Set your desired maximum length
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModal, setIsModal] = useState(false);
    const [newMovie, setNewMovie] = useState({
        MovieName: movie.MovieName,
        TitleMovie: movie.TitleMovie,
        Description: movie.Description,
        Duration: movie.Duration,
        Language: movie.Language,
        ReleaseDate: new Date(movie.ReleaseDate).toISOString().split('T')[0],
        Country: movie.Country,
        Genre: movie.Genre,
        PosterMovie: movie.PosterMovie,
    });
    const truncateDescription = (description) => {
        if (description.length > MAX_DESCRIPTION_LENGTH) {
            return description.substring(0, MAX_DESCRIPTION_LENGTH) + '...';
        }
        return description;
    };
    const handleAddButtonClick = () => {
        setIsModalOpen(true);

    };

    const showModal = () => {

        setIsModal(true)
    }

    const handleCfDel = (movieId) => {

        const handleCardDelete = async (id) => {
            try {
                // Make an Axios request to create a new movie
                await axios.delete(`http://127.0.0.1:5000/movies/${id}`, newMovie);


                alert("Phim đã cập nhật thành công");
            } catch (error) {
                alert("Cập nhật không thành công, mời thử lại!");
                console.error('Error creating movie:', error);
            }
        };
        handleCardDelete(movieId);
        setIsModalOpen(false);
    };

    const handleNCfDel = () => {
        setIsModalOpen(false);
    };

    const handleNCfUp = () => {
        setIsModal(false);
    };

    const handleCfUp = async (movieId, e) => {
        e.preventDefault();

        try {
            await axios.put(`http://127.0.0.1:5000/movies/${movieId}`, newMovie);
            alert("Phim đã được cập nhật");
            
            setIsModal(false);
        } catch (error) {
            alert("Cập nhật không thành công, mời thử lại!");
            console.error('Error updating movie:', error);
            setIsModal(false);
        }
    };


    
    return (
        <div className="flex flex-row ml-2 py-2 my-2 border-b border-blue-800 border-opacity-20 "  >

            <div className="overflow-hidden cursor-pointer w-32 h-44" onClick={() => showModal()} >
                <img src={movie.PosterMovie} alt={movie.TitleMovie} className=" w-full h-full object-cover  object-top" />
            </div>
            <div className='ml-2 w-4/5' onClick={() => showModal()}>
                <div className='flex flex-row w-full justify-between'>
                    <p className="font-bold  mt-1 text-yellow-500 cursor-pointer hover:text-yellow-300">{movie.MovieName}</p>
                    <p className='text-slate-500 text-sm mt-1'>{movie.Duration} phút</p>
                </div>
                <div className='flex flex-row w-full justify-between'>
                    <p className='text-slate-500 text-sm '>{movie.TitleMovie}</p>
                    <p className='text-slate-500 text-sm '>{movie.Country}</p>

                </div>

                <p className='text-slate-500 text-sm mt-5'>{truncateDescription(movie.Description)}</p>
                <div className='flex flex-row w-full gap-2 mt-4 '>

                    {movie.Genre.map((genre, index) => (
                        <div key={index} className="hover:bg-slate-300 hover:text-sky-900 hover:cursor-pointer border border-blue-300 text-black rounded-3xl">
                            <p className='text-sm py-1 px-5'>
                                {genre}
                            </p>
                        </div>
                    ))}
                </div>

            </div>

            <div className='flex flex-col mx-2 w-20 justify-center'>
                <button className=" bg-blue-500 text-white px-2 py-1 my-2 rounded" onClick={() => showModal()}>Sửa</button>
                <button className="bg-red-500 text-white px-2 py-1 my-2 rounded" onClick={() => handleAddButtonClick()}>Xóa</button>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0  bg-black bg-opacity-50 flex justify-center items-center">

                    <div className='bg-white w-1/6 p-4 rounded-md'>
                        <p className='text-slate-600 text-lg font-semibold py-4'>
                            bạn có chắc chắn muốn xóa không?
                        </p>
                        <div className='flex flex-row justify-center pt-2'>

                            <button type="submit" onClick={() => handleCfDel(movie._id)} className="bg-blue-500 text-white px-2 mx-1 py-1 rounded">
                                Có
                            </button>
                            <button type="submit" onClick={() => handleNCfDel()} className="bg-blue-500 text-white px-2 py-1 mx-1 rounded">
                                Không
                            </button>
                        </div>
                    </div>
                </div>)}

            {isModal && (
                <div className="fixed inset-0  bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white w-3/4 p-4 rounded-md">
                        <form onSubmit={(e) => handleCfUp(movie._id, e)} >

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
                                    <button type="button" onClick={handleNCfUp} className="ml-2 bg-gray-500 text-white px-2 py-1 rounded">
                                        Hủy
                                    </button>
                                </div>
                            </div>



                        </form>
                    </div>
                </div>
            )}
        </div>
    )};

    export default MovieCardad;