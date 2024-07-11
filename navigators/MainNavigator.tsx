import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/LoginScreen';
import RegistroScreen from '../screens/RegistroScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import OperacioneScreen from '../screens/OperacioneScreen';
import HistorialScreen from '../screens/HistorialScreen';

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator initialRouteName='Operaciones' screenOptions={{ headerShown: false }}>
            
            <Tab.Screen name="Operaciones" component={OperacioneScreen}  />
            <Tab.Screen name="Historial" component={HistorialScreen} />
        </Tab.Navigator>
    );
}

// Stack Navigator
const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator >
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown:false}} />
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}} />
            <Stack.Screen name="Registro" component={RegistroScreen} options={{headerShown:false}} />
            <Stack.Screen name="BottomTab" component={MyTabs} options={{headerShown:false}}/>
        </Stack.Navigator>
    );
}

// Main Navigator Component
export default function Navegador() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}