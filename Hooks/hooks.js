import { useCallback, useEffect, useState } from "react";
import { modifyId, modifySurname } from '../Store/Reducer/userSlice'
import { modifyCode, setListPlayer} from '../Store/Reducer/gameSlice'
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { io } from "socket.io-client";


export const useUserAPI = () => {

  const apiUrl = 'http://192.168.0.11:3000';

  const userId = useSelector((state) => state.user.userId);
  const userSurname = useSelector((state) => state.user.surname);
  const dispatch = useDispatch();

  const saveUserId = async (userToSave) => {
    try {
      await AsyncStorage.setItem('userId', userToSave);
      console.log('Identifiant sauvegardé avec succès.');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'identifiant :', error);
    }
  };


  const getSurname = useCallback(async(userId) => {
    try {
      const response = await fetch(`${apiUrl}/api/users/${userId}`);
      const data = await response.json();
      dispatch(modifySurname(data.surname));
      
    }
    catch(error){
      console.log('Erreur lors de la récupération de surnom',error);
    }
  },[]);

const createUser = async() => {

  const response = await fetch(`${apiUrl}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ surname: userSurname }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Erreur lors de la création d'utilisateurs");
    }
    
    //Sauvegarde id dans asyncStorage
    dispatch(modifyId(data.userId));
    saveUserId(data.userId);
    
  };
  

const changeSurnameAPI = useCallback(async() => {
  try{
    
    await fetch(`${apiUrl}/api/users/${userId}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          // Ajoutez d'autres en-têtes si nécessaire
      },
      body: JSON.stringify({
          surname: userSurname,
      }),
  });
  }
  catch(error){
    console.log('Erreur lors du changement de surname', error);
  }

},[userId]);

return{getSurname, changeSurnameAPI, createUser};

}

export const useGame = ({navigation}) => {

  const apiUrl = 'http://192.168.0.11:3000';

  const userId = useSelector((state) => state.user.userId);
  const userSurname = useSelector((state) => state.user.surname);
  const listPlayer = useSelector((state) => state.game.listPlayer);
  const dispatch = useDispatch();

  

  const startSocket = (code) => {
    return new Promise((resolve, reject) => {
      const socket = io(`${apiUrl}`);
  
      // Écouter l'événement 'connect'
      socket.on('connect', () => {
        console.log('Connecté au serveur WebSocket');
        socket.emit('sendCode', code);
        resolve(socket); // Résoudre la promesse une fois que la connexion est établie
      });
  
      socket.on('sendListPlayer', (updatedListPlayer) => {
        console.log('Nouvelle liste de joueurs reçue :', userSurname, updatedListPlayer);
        dispatch(setListPlayer(updatedListPlayer));
      });
      socket.on('sendTarget', (updatedListPlayer) => {
        console.log('Nouvelle cible :', updatedListPlayer);
        dispatch(setListPlayer(updatedListPlayer)); 
        console.log('listPlayerWithTarget : ', listPlayer);  
        navigation.navigate('Cible');
        
      });
  
      
    });
  };

  const sendSocket = (channel, data, code) => {
    io.to(code).emit(channel, data);
  }

  const startGame = async(code) => {
    const response = await fetch(`${apiUrl}/api/game/${code}/start`);
    const data = await response.json();
    if (response.ok) {
      // Si la requête a réussi, faire ce que vous avez à faire après l'ajout du joueur
      console.log(data);
    } else {
      // Si la requête a échoué, afficher une popup avec le message d'erreur
      alert(data.error); // Vous pouvez personnaliser l'affichage de la popup selon vos besoins
      console.error("Erreur :", data.error);
    }
  };

  const addPlayer = async(code) => {

    const response = await fetch(`${apiUrl}/api/game/${code}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId, surname: userSurname }),
      });
      const data = await response.json();
      if (response.ok) {
        // Si la requête a réussi, faire ce que vous avez à faire après l'ajout du joueur
        console.log(data);
      } else {
        // Si la requête a échoué, afficher une popup avec le message d'erreur
        alert(data.error); // Vous pouvez personnaliser l'affichage de la popup selon vos besoins
        console.error("Erreur :", data.error);
      }
        
    };

    

  const createGame = async () => {
    try {

      const response = await fetch(`${apiUrl}/api/game`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hostId: userId, surname: userSurname }),
      });
  
  
      const data = await response.json();
      
      dispatch(modifyCode(data.code));
      await startSocket(data.code);
      console.log('start socket');
      await addPlayer(data.code);

  
    } catch (error) {
      console.error("Erreur lors de la création de partie:", error);
      
    }
  };

  return{createGame, addPlayer, startSocket, sendSocket, startGame};

  

}
















