import React from 'react';
import { useFonts } from 'expo-font';
import Navigation from './Navigation/Navigation';



const App = () => {

  const [fontsLoaded, fontError] = useFonts({
    'LuckiestGuy': require('./assets/fonts/LuckiestGuy.ttf'), 
    'Sen': require('./assets/fonts/Sen.ttf'),
  });


  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Navigation/>
  );
}


export default App;


