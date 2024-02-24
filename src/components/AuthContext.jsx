import { createContext, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../authAction';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const loginContext = (user) => {
    dispatch(login(user));
  };

  const logoutContext = () => {
    dispatch(logout());
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login: loginContext, logout: logoutContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
