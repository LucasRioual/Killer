import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screen/HomeScreen';
import ModeScreen from '../Screen/ModeScreen';
import SalonScreen from '../Screen/SalonScreen';



const Stack = createNativeStackNavigator();

const Navigation = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Mode" component={ModeScreen} />
        <Stack.Screen name="Salon" component={SalonScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default Navigation;


