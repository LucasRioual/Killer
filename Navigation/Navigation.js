import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screen/HomeScreen';
import ModeScreen from '../Screen/ModeScreen';
import SalonScreen from '../Screen/SalonScreen';
import SettingsScreen from '../Screen/SettingsScreen';
import CibleScreen from '../Screen/CibleScreen';
import EndGameScreen from '../Screen/EndGameScreen';
 import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { useSelector, useDispatch } from 'react-redux';
import { setExpoToken } from '../Store/Reducer/userSlice';



const Stack = createNativeStackNavigator();

const Navigation = () => {
  const dispatch = useDispatch();

  async function registerForPushNotificationsAsync() {
    let token;

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }
    if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    console.log(token);
    dispatch(setExpoToken(token.data));


    return token.data;
  }

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Mode" component={ModeScreen} />
        <Stack.Screen name="Salon" component={SalonScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Cible" component={CibleScreen} />
        <Stack.Screen name="EndGame" component={EndGameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default Navigation;


