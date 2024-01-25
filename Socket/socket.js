import React, { useEffect } from 'react';
import { setListPlayer, setGameStarted, setKilledBy, setConfirmKill, setNewPlayer, setRefuseNewPlayer, setTarget, setMission, setLoadingSalon, setEndGame } from '../Store/Reducer/gameSlice';
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
      console.log('setListPlayer');
      dispatch(setListPlayer(updatedListPlayer));
      dispatch(setLoadingSalon(false));
    });

    socket.on('sendTargetAndMission', (target, mission) => { //A modifier
      console.log('Mission et cible reçu', mission);
      //dispatch(setListPlayer(updatedListPlayer));
      dispatch(setTarget(target));
      dispatch(setMission(mission));
    });

    socket.on('startGame', (target, mission) => { // A modifier
      //dispatch(setListPlayer(updatedListPlayer));
      dispatch(setTarget(target));
      dispatch(setMission(mission));
      dispatch(setGameStarted(true));
      console.log('startGame');
      //navigation.navigate('Cible');
    });


    socket.on('sendConfirmKill', (tueurSurname) => {
      console.log('Tu es mort par ' + tueurSurname);
      dispatch(setKilledBy(tueurSurname));

    });

    socket.on('isKilledConfirm', (target, mission) => { // A modifier
      dispatch(setConfirmKill(true));
      dispatch(setTarget(target));
      dispatch(setMission(mission));
    });
    socket.on('isNotKilledConfirm', () => {
      dispatch(setConfirmKill(false));
    });
    socket.on('NewPlayer', (newPlayer) => {
      console.log('un nouveau joueur arrive', newPlayer);
      dispatch(setNewPlayer(newPlayer));
    });
    socket.on('refuseNewPlayer', () => {
      console.log('refuseNewPlayer');
      dispatch(setRefuseNewPlayer(true));

    });
    socket.on('endGame', () => {
      console.log('endGame');
      dispatch(setEndGame(true));
      
    });

    

  }, []);

};

export default SocketHandler;
