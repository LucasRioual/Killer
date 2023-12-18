import React from 'react';
import { useFonts } from 'expo-font';
import Navigation from './Navigation/Navigation';
import store from './Store/store'
import { Provider } from 'react-redux'
import SocketHandler from './Socket/socket'



const App = () => {



  const [fontsLoaded, fontError] = useFonts({
    'LuckiestGuy': require('./assets/fonts/LuckiestGuy.ttf'), 
    'Sen': require('./assets/fonts/Sen.ttf'),
  });


  if (!fontsLoaded && !fontError) {
    return null;
  }


  return (
    <Provider store={store}>
      <SocketHandler/>
      <Navigation/>
    </Provider>
  );
}

export default App;


