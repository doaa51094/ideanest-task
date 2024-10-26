import React, { createContext, useContext, useEffect, useState } from 'react';
import kinde from './kindeAuth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const loggedInUser = await kinde.getUser();
      setUser(loggedInUser);
    })();
  }, []);

  const login = () => kinde.login();
  const logout = () => kinde.logout();

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
