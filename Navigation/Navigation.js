import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screen/HomeScreen';
import ModeScreen from '../Screen/ModeScreen';



const Stack = createNativeStackNavigator();

const Navigation = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Mode" component={ModeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default Navigation;


