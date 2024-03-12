import React, { useEffect } from 'react';
import socket from './socketManager'
import { useDispatch } from 'react-redux';
import { setNewPlayer, setIsGameStarted, setTimer, setConfirmKill, setTargetResponse, setGameFinish } from '../Store/Reducer/gameSlice';
import { setTargetLeave } from '../Store/Reducer/userSlice';
//import * as Notifications from 'expo-notifications';




const SocketHandler = () => {

  const dispatch = useDispatch();
  



  useEffect(() => {
    

    socket.on('connect', () => {
      console.log('Connexion socket établie !');
    });

    socket.on('new_player', (newPlayer) => {
      console.log('un nouveau joueur arrive', newPlayer);
      dispatch(setNewPlayer(newPlayer));
    });

    socket.on('start_game', () => {
      console.log('La partie commence');
      dispatch(setIsGameStarted(true));

    });

    socket.on('timer', (timer) => {
      console.log('timer', timer);
      dispatch(setTimer(timer));
    }
    );
    socket.on('kill_confirm_client', () => {
      console.log('Je viens de me faire tuer !');
      dispatch(setConfirmKill(true));
    }
    );
    socket.on('response_target', (isKill) => {
      if(isKill){
        console.log('Tu as tué ta cible');
        dispatch(setTargetResponse(true));
      }
      else{
        console.log('Tu as raté ta cible');
        dispatch(setTargetResponse(false));
      }
    }
    );

    socket.on('target_leave', () => {
      console.log('Ta cible a quitté la partie');
      dispatch(setTargetLeave(true));
    });

    socket.on('end_game', () => {
      console.log('Fin de partie !')
      dispatch(setGameFinish(true));
    }
    );
    

    

  }, []);

};

export default SocketHandler;
