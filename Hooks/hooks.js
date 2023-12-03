import { useCallback } from "react";
import { modifyId, modifySurname } from '../Store/Reducer/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';


export const useUserAPI = () => {

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
      const response = await fetch(`http://192.168.137.1:3000/api/users/${userId}`);
      const data = await response.json();
      dispatch(modifySurname(data.surname));
      
    }
    catch(error){
      console.log('Erreur lors de la récupération de surnom',error);
    }
  },[]);

const createUser = useCallback(async() => {

  const response = await fetch('http://192.168.137.1:3000/api/users', {
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
    
  }, []);
  

const changeSurnameAPI = useCallback(async() => {
  try{
    await fetch(`http://192.168.137.1:3000/api/users/${userId}`, {
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

},[]);

return{getSurname, changeSurnameAPI, createUser};

}

export const useGame = () => {

  const userId = useSelector((state) => state.user.userId);
  const userSurname = useSelector((state) => state.user.surname);
  const dispatch = useDispatch();

  

}
















