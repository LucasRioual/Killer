
import AsyncStorage from '@react-native-async-storage/async-storage';
import socket from '../Socket/socketManager';


const apiUrl = process.env.EXPO_PUBLIC_API_URL;


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
      //dispatch(modifySurname(data.surname));
      return data.surname;
      
    }
    catch(error){
      console.log('Erreur lors de la récupération de surnom',error);
    }
  };

  const createUser = async(userSurname) => {

  const response = await fetch(`${apiUrl}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ surname: userSurname}),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Erreur lors de la création d'utilisateurs");
    }

    saveUserId(data.userId);
    return data.userId;
    //dispatch(modifyId(data.userId));
    
    
  };
  


  const changeSurnameAPI = async(userId, userSurname) => {
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



/* const connectToRoom = (code) => {
      const dataToSend = {userId: userId, surname: userSurname, code: code};
      socket.emit('connectRoom', dataToSend); 

  }; */



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
    return data.listPlayer;
  };


  
  const removePlayer = async (dataToSend) => {
      //const dataToSend = {userId: userId, code: code};
      socket.emit('removePlayer', dataToSend);
          
      };

    const removeGame = async (code) => {
    socket.emit('removeGame', code);
  }

    

  const createGame = async (userSurname, expoToken) => {
    try {

      const response = await fetch(`${apiUrl}/api/game`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({surname: userSurname }),
      });
      const data = await response.json();
      const dataToSend = {surname: userSurname, code: data.code, expoToken: expoToken};
      
      socket.emit('connectRoom', dataToSend);
      
      return data.code;
    } catch (error) {
      
    }
  };





export {saveUserId, getSurname, createUser, changeSurnameAPI, startGame, getGame, removePlayer, removeGame, createGame};











