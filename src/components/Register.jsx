import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/register', {
        email: email,
        password: password,
        username: username
      });

      if (response.status === 200) {
        alert("Đăng kí thành công")
        navigate('/');
      } 
    } catch (error) {
      console.log(error);
      
        alert("Tài khoản hoặc Email đã tồn tại");
      
    }

  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url("/img/background.jpg")', height: '100vh' }}>
      <div className="max-w-md w-full p-6 bg-slate-700 bg-opacity-45 rounded-md shadow-md">
        <h2 className="text-2xl text-slate-200 font-bold mb-6">Đăng Ký</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-slate-200 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              className="border-2 border-gray-300 p-2 w-full rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-slate-200 text-sm font-bold mb-2">Mật khẩu</label>
            <input
              type="password"
              className="border-2 border-gray-300 p-2 w-full rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-slate-200 text-sm font-bold mb-2">User Name</label>
            <input
              type="text"
              className="border-2 border-gray-300 p-2 w-full rounded-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full" >
            Đăng ký
          </button>
        </form>
        <div className='flex flex-row items-end justify-end'>

          <p className='p-1 text-slate-200'>Bạn đã có tài khoản?</p>
          <p className='p-1 hover:text-blue-600 cursor-pointer text-slate-200' onClick={() => navigate('/')}>Đăng nhập</p>
        </div>
      </div>
    </div>
  );
};

export default Register;