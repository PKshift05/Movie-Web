// Import Navigate from react-router-dom
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedPage = () => {
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    // Thực hiện xác thực đăng xuất ở đây.
    logout();
  };

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h2>Trang được bảo vệ</h2>
      {isLoggedIn ? (
        <button onClick={handleLogout}>Đăng xuất</button>
      ) : (
        <p>Bạn chưa đăng nhập</p>
      )}
    </div>
  );
};

export default ProtectedPage;
