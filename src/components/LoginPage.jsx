import React, { useState } from 'react';
import { useAuth } from '../components/AuthContext'; // Assuming AuthContext is in the components folder
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the /login endpoint
      const response = await axios.post('http://127.0.0.1:5000/login', {
        email: email,
        password: password,
      });

      // Check the response and handle accordingly
      if (response.status === 200) {
        
        login(response.data);
        console.log(response.data.role);
        if (response.data.role === 'admin') {
          navigate('/admin');
        } else {

          navigate('/Home');
        }


        console.log('Login successful');
        // You can redirect the user or perform other actions upon successful login
      } else {
        alert('Đăng nhập không thành công. Kiểm tra email và password.');

        console.log('Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      alert('Đăng nhập không thành công. Kiểm tra email và password.');

      console.log('Invalid username or password');
    }
  };

  

  return (


    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url("/img/background.jpg")', height: '100vh' }}>
      <div className="max-w-md w-full p-6 bg-slate-700 bg-opacity-45 rounded-md shadow-md">
        <h2 className="text-2xl text-slate-200 font-bold mb-6 text-">Đăng nhập</h2>

        <form onSubmit={handleLogin}>
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
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full" >
            Đăng nhập
          </button>
        </form>
        <div className='flex flex-row items-end justify-end'>
          <p className='p-1 text-slate-200'>Bạn chưa có tài khoản?</p>
          <p className='p-1 text-slate-200 hover:text-blue-600 cursor-pointer' onClick={() => navigate('/register')}>Đăng kí</p>
          <p className='pb-2 text-slate-200'>.</p>
          <p className='p-1 text-slate-200 hover:text-blue-600 cursor-pointer'>Quên mật khẩu</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

