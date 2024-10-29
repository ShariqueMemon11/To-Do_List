import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './MainScreen';
import AuthScreen from './AuthScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
  );
}
