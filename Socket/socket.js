import React, { useEffect } from 'react';
import { setListPlayer, setGameStarted, setKilledBy } from '../Store/Reducer/gameSlice';
import socket from './socketManager'
import { useDispatch } from 'react-redux';
//import * as Notifications from 'expo-notifications';




const SocketHandler = () => {

  const dispatch = useDispatch();
  



  useEffect(() => {
    

    socket.on('connect', () => {
      console.log('Connexion socket établie !');
    });

    socket.on('sendListPlayer', (updatedListPlayer) => {
      dispatch(setListPlayer(updatedListPlayer));
    });

    socket.on('startGame', (updatedListPlayer) => {
      dispatch(setListPlayer(updatedListPlayer));
      dispatch(setGameStarted(true));
      console.log('startGame');
      //navigation.navigate('Cible');
    });

    socket.on('endGame', () => {
      // Afficher une popUp qui explique la fin de la partie
      // Puis retourner à l'écran d'accueil
      //navigation.goBack();
    });

    socket.on('sendConfirmKill', (tueurSurname) => {
      console.log('Tu es mort par ' + tueurSurname);
      dispatch(setKilledBy(tueurSurname));
      /* Notifications.scheduleNotificationAsync({
        content: {
          title: "Tu es mort malheureux !",
          body: "Tu as été tué par " + tueurSurname + " !",
        },
        trigger: null,
      }); */

    });

    

  }, []);

};

export default SocketHandler;
