import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storagedUser = sessionStorage.getItem('usuario');

    if (storagedUser) {
      setUser(JSON.parse(storagedUser));
    }
  }, []);

  function loginUsuario(userData) {
    setUser(userData);

    sessionStorage.setItem('usuario', JSON.stringify(userData));
    sessionStorage.setItem('token', JSON.stringify(userData.token));
    // api.defaults.headers.Authorization = `Bearer ${sessionStorage.getItem('token')}`;
  }

  function logoutUsuario() {
    setUser(null);
    sessionStorage.removeItem('usuario');
  }

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), user, loginUsuario, logoutUsuario }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}