import { useCallback, useEffect, useRef, useState } from "react";
import { modifyId, modifySurname } from '../Store/Reducer/userSlice'
import { modifyCode, setListPlayer} from '../Store/Reducer/gameSlice'
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import socket from '../socket';


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


  const getSurname = async(userId) => {
    try {
      const response = await fetch(`${apiUrl}/api/users/${userId}`);
      const data = await response.json();
      console.log('Le surnom a été récupéré : ',data.surname);
      dispatch(modifySurname(data.surname));
      
    }
    catch(error){
      console.log('Erreur lors de la récupération de surnom',error);
    }
  };

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
  

const changeSurnameAPI = async() => {
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

}

return{getSurname, changeSurnameAPI, createUser};

}

export const useGame = ({navigation}) => {

  const apiUrl = 'http://192.168.0.11:3000';

  const userId = useSelector((state) => state.user.userId);
  const userSurname = useSelector((state) => state.user.surname);
  const dispatch = useDispatch();
  const socketRef = useRef(null);

  

  const startSocket = (code) => {

    
      socket.on('sendListPlayer', (updatedListPlayer) => {
        dispatch(setListPlayer(updatedListPlayer));
      });
      socket.on('sendTarget', (updatedListPlayer) => {
        dispatch(setListPlayer(updatedListPlayer));  
        navigation.navigate('Cible');
        
      });
      socket.on('endGame', () => {
        navigation.goBack();
      });


      const dataToSend = {userId: userId, surname: userSurname, code: code};
      socket.emit('connectRoom', dataToSend); 
      
        
      
  
      
    
    
  };


  const startGame = async(code) => {

    const response = await fetch(`${apiUrl}/api/game/${code}/start`);
    const data = await response.json();
    if (response.ok) {
    } else {
      // Si la requête a échoué, afficher une popup avec le message d'erreur
      alert(data.error); // Vous pouvez personnaliser l'affichage de la popup selon vos besoins
    }
  };

  const getGame = async(code) => {
    const response = await fetch(`${apiUrl}/api/game/${code}`);
    const data = await response.json();
    return data;
  };

  /* const addPlayer = async(code) => {

    const response = await fetch(`${apiUrl}/api/game/${code}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId, surname: userSurname }),
      });
      const data = await response.json();
      if (response.ok) {
      } else {
        // Si la requête a échoué, afficher une popup avec le message d'erreur
        alert(data.error); // Vous pouvez personnaliser l'affichage de la popup selon vos besoins
      }
        
    }; */

    const removePlayer = async (code) => {

      const dataToSend = {userId: userId, code: code};
      socket.emit('removePlayer', dataToSend);
          
      };

  const removeGame = async (code) => {
    socket.emit('removeGame', code);
  }

    
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
      startSocket(data.code);

  
    } catch (error) {
      
    }
  };

  return{createGame, getGame, removePlayer, startSocket, startGame, removeGame};

}
















