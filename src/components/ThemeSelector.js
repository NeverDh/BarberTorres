import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export const ThemeSelector = () => {
  const { theme, themeMode, changeTheme } = useTheme();
  const isDark = themeMode === 'dark';

  const toggleTheme = () => {
    changeTheme(isDark ? 'light' : 'dark');
  };

  return (
    <View style={styles.container}>
      <Ionicons name="sunny" size={16} color={theme.colors.text} />
      <TouchableOpacity
        style={[
          styles.toggle,
          { backgroundColor: isDark ? theme.colors.primary : theme.colors.border }
        ]}
        onPress={toggleTheme}
      >
        <View style={[
          styles.toggleThumb,
          { 
            backgroundColor: theme.colors.surface,
            transform: [{ translateX: isDark ? 22 : 2 }]
          }
        ]} />
      </TouchableOpacity>
      <Ionicons name="moon" size={16} color={theme.colors.text} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 8,
    gap: 8,
  },
  toggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    position: 'relative',
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
  },
});