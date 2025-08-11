import React, { createContext, useContext, useState } from 'react';
import { usuarios } from '../data/mockData';

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
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, senha) => {
    setIsLoading(true);
    
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const usuarioEncontrado = usuarios.find(
      u => u.email === email && u.senha === senha
    );
    
    if (usuarioEncontrado) {
      setUsuario(usuarioEncontrado);
      setIsLoading(false);
      return { success: true };
    } else {
      setIsLoading(false);
      return { success: false, error: 'Email ou senha incorretos' };
    }
  };

  const logout = () => {
    setUsuario(null);
  };

  const value = {
    usuario,
    login,
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