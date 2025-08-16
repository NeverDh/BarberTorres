import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await authService.getUserData(user.uid);
        setUsuario(userData);
      } else {
        setUsuario(null);
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, senha) => {
    setIsLoading(true);
    const result = await authService.login(email, senha);
    setIsLoading(false);
    return result;
  };

  const register = async (email, senha, userData) => {
    setIsLoading(true);
    const result = await authService.register(email, senha, userData);
    setIsLoading(false);
    return result;
  };

  const logout = async () => {
    setIsLoading(true);
    const result = await authService.logout();
    setIsLoading(false);
    return result;
  };

  const value = {
    usuario,
    login,
    register,
    logout,
    isLoading,
    isAuthenticated: !!usuario
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};