import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as Device from "expo-device";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import CibleScreen from "../../../Screen/CibleScreen";
import CibleScreenTest from "../../../Screen/CibleScreenTest";
import EndGameScreen from "../../../Screen/EndGameScreen";
import HistoriqueScreen from "../../../Screen/HistoriqueScreen";
import HomeScreen from "../../../Screen/HomeScreen";
import ModeScreen from "../../../Screen/ModeScreen";
import SalonScreen from "../../../Screen/SalonScreen";
import SettingGameScreen from "../../../Screen/SettingGameScreen";
import SettingsScreen from "../../../Screen/SettingsScreen";
import { setExpoToken } from "../../../Store/Reducer/userSlice";

const Stack = createNativeStackNavigator();

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token.data;
}

const Navigation = () => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token),
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current,
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Historique"
        screenOptions={{ headerShown: false, gestureEnabled: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Mode" component={ModeScreen} />
        <Stack.Screen name="Settings" component={SettingGameScreen} />
        <Stack.Screen name="Salon" component={SalonScreen} />
        <Stack.Screen name="GameSetting" component={SettingsScreen} />
        <Stack.Screen name="Cible" component={CibleScreen} />
        <Stack.Screen name="EndGame" component={EndGameScreen} />
        <Stack.Screen name="Historique" component={HistoriqueScreen} />
        <Stack.Screen name="CibleTest" component={CibleScreenTest} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
