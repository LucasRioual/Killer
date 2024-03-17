import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screen/HomeScreen';
import ModeScreen from '../Screen/ModeScreen';
import SalonScreen from '../Screen/SalonScreen';
import GameScreen from '../Screen/GameScreen';
import HistoriqueScreen from '../Screen/HistoriqueScreen';
 import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { useSelector, useDispatch } from 'react-redux';
import SettingGameScreen from '../Screen/SettingGameScreen';
import StatGenerale from '../Screen/StatGenarale';
import StatPersoScreen from '../Screen/StatPersoScreen';


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

      <Stack.Navigator initialRouteName="Test" screenOptions={{ headerShown: false, gestureEnabled: false,}}>

        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Mode" component={ModeScreen} />
        <Stack.Screen name="Settings" component={SettingGameScreen} />
        <Stack.Screen name="Salon" component={SalonScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="Historique" component={HistoriqueScreen} />
        <Stack.Screen name="StatPerso" component={StatPersoScreen} />
        <Stack.Screen name="StatGenerale" component={StatGenerale} />
        <Stack.Screen name="Test" component={testAnimation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default Navigation;


