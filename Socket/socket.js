import React, { useEffect } from 'react';
import { setListPlayer, setGameStarted, setKilledBy, setConfirmKill, setNewPlayer } from '../Store/Reducer/gameSlice';
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
      console.log('sendListPlayer', updatedListPlayer);
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

    });

    socket.on('isKilledConfirm', (updatedListPlayer) => {
      dispatch(setConfirmKill(true));
      dispatch(setListPlayer(updatedListPlayer));
    });
    socket.on('isNotKilledConfirm', () => {
      dispatch(setConfirmKill(false));
    });
    socket.on('NewPlayer', (newPlayer) => {
      console.log('un nouveau joueur arrive', newPlayer);
      dispatch(setNewPlayer(newPlayer));
    });

    

  }, []);

};

export default SocketHandler;
