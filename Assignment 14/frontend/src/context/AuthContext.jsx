import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      // Store login time if not already stored
      if (!localStorage.getItem('loginTime')) {
        localStorage.setItem('loginTime', Date.now().toString());
      }
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('loginTime');
      setIsAuthenticated(false);
    }
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem('loginTime', Date.now().toString());
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
