import React, { useEffect } from 'react';
import { setListPlayer, setGameStarted, setKilledBy, setConfirmKill, setNewPlayer, setRefuseNewPlayer, setTarget, setMission, setLoadingSalon, setEndGame, setCoutdown, setNumberMission } from '../Store/Reducer/gameSlice';
import { setHostTrue } from '../Store/Reducer/userSlice';
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

    socket.on('startGame', (target, mission, numberMission) => { // A modifier
      //dispatch(setListPlayer(updatedListPlayer));
      dispatch(setTarget(target));
      dispatch(setMission(mission));
      dispatch(setGameStarted(true));
      dispatch(setNumberMission(numberMission));
      console.log('startGame', numberMission);
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
    socket.on('isHost', () => {
      console.log('isHost');
      dispatch(setHostTrue());
      
    });
    socket.on('countdown', (coutdown) => {
      console.log('coutdown', coutdown);
      dispatch(setCoutdown(coutdown));
    

    });

    

  }, []);

};

export default SocketHandler;
