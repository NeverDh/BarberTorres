import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import { AuthProvider, useAuth } from './src/context/AuthContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import LoginScreen from './src/screens/LoginScreen';

// Telas do Cliente
import HomeClienteScreen from './src/screens/cliente/HomeClienteScreen';
import AgendamentosScreen from './src/screens/cliente/AgendamentosScreen';

// Telas do Profissional
import HomeProfissionalScreen from './src/screens/profissional/HomeProfissionalScreen';
import HorariosScreen from './src/screens/profissional/HorariosScreen';
import CriarPlanoScreen from './src/screens/profissional/CriarPlanoScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ClienteTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Agendamentos') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3498db',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeClienteScreen} />
      <Tab.Screen name="Agendamentos" component={AgendamentosScreen} />
    </Tab.Navigator>
  );
}

function ProfissionalStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="HomeProfissional" 
        component={HomeProfissionalScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Horarios" 
        component={HorariosScreen}
        options={{ title: 'Gerenciar Horários' }}
      />
      <Stack.Screen 
        name="CriarPlano" 
        component={CriarPlanoScreen}
        options={{ title: 'Criar Plano' }}
      />
    </Stack.Navigator>
  );
}

function ProfissionalTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Horarios') {
            iconName = focused ? 'time' : 'time-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#e67e22',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={ProfissionalStack}
        options={{ title: 'Início' }}
      />
      <Tab.Screen 
        name="Horarios" 
        component={HorariosScreen}
        options={{ title: 'Horários' }}
      />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  const { usuario, isAuthenticated } = useAuth();
  const { isDark } = useTheme();

  if (!isAuthenticated) {
    return (
      <>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <LoginScreen />
      </>
    );
  }

  if (usuario.tipo === 'cliente') {
    return (
      <>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <ClienteTabs />
      </>
    );
  } else {
    return (
      <>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <ProfissionalTabs />
      </>
    );
  }
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  );
}