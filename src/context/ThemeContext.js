import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de ThemeProvider');
  }
  return context;
};

const lightTheme = {
  colors: {
    background: '#ffffff',
    surface: '#f8f9fa',
    primary: '#3498db',
    secondary: '#e67e22',
    text: '#2c3e50',
    textSecondary: '#7f8c8d',
    border: '#ecf0f1',
    success: '#27ae60',
    error: '#e74c3c',
    warning: '#f39c12',
  },
};

const darkTheme = {
  colors: {
    background: '#1a1a1a',
    surface: '#2d2d2d',
    primary: '#3498db',
    secondary: '#e67e22',
    text: '#ffffff',
    textSecondary: '#bdc3c7',
    border: '#34495e',
    success: '#27ae60',
    error: '#e74c3c',
    warning: '#f39c12',
  },
};

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState(systemColorScheme === 'dark' ? 'dark' : 'light');
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('themeMode');
      if (savedTheme) {
        setThemeMode(savedTheme);
        setIsDark(savedTheme === 'dark');
      }
    } catch (error) {
      console.log('Erro ao carregar preferência de tema:', error);
    }
  };

  const changeTheme = async (mode) => {
    setThemeMode(mode);
    setIsDark(mode === 'dark');
    
    try {
      await AsyncStorage.setItem('themeMode', mode);
    } catch (error) {
      console.log('Erro ao salvar preferência de tema:', error);
    }
  };

  const theme = isDark ? darkTheme : lightTheme;

  const value = {
    theme,
    isDark,
    themeMode,
    changeTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};