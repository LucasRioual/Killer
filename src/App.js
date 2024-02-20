import { useFonts } from "expo-font";
import React, { useEffect } from "react";
import { Provider } from "react-redux";

import SocketHandler from "./Socket/socket";
import store from "./Store/store";
import Navigation from "./src/Screen/Navigation/Navigation";

const App = () => {
  const [fontsLoaded, fontError] = useFonts({
    LuckiestGuy: require("./assets/fonts/LuckiestGuy.ttf"),
    Sen: require("./assets/fonts/Sen.ttf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Provider store={store}>
      <SocketHandler />
      <Navigation />
    </Provider>
  );
};

export default App;
