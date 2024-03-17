
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

  const createUser = async(userName, expoToken) => {
     console.log('Création de l\'utilisateur en cours...');

  const response = await fetch(`${apiUrl}/api/user/${userName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        expoToken: expoToken
    }),
    });
    const data = await response.json();
    console.log('Utilisateur créé : ', data);
    return data.userId;
    
    
  };
  
  const modifyUserName = async(userId, userName, expoToken) => {
  try{
   
    const response = await fetch(`${apiUrl}/api/user/${userId}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          // Ajoutez d'autres en-têtes si nécessaire
      },
      body: JSON.stringify({
          userName: userName,
          expoToken: expoToken
      }),
    
    });
    const data = await response.json();
    return data.userId;

  }
  catch(error){
    console.log('Erreur lors du changement de surname', error);
  }

}


const getUserGameCode = async(userId) => {
  try {
    console.log('Récupération du code de la partie pour le joueur : ', userId);
    const response = await fetch(`${apiUrl}/api/user/${userId}`);
    const data = await response.json();
    console.log('Le code de la partie a été récupéré : ',data);
    return [data.statut, data.gameCode];
  }
  catch(error){
    console.log('Erreur lors de la récupération du code de la partie', error);
  }
}



const sendKillAccept = async(userId) => {
  try{
   
    await fetch(`${apiUrl}/api/game/kill/${userId}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          // Ajoutez d'autres en-têtes si nécessaire
      },
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
    console.log('Démarrage de la partie en cours...', code);
    const response = await fetch(`${apiUrl}/api/game/start/${code}`);
    const data = await response.json();
    console.log('Partie démarrée : ', data);
  };


  const getPlayer = async(code) => {
    const response = await fetch(`${apiUrl}/api/user/players/${code}`);
    const data = await response.json();
    console.log('Liste des joueurs récupérée : ', data.listPlayer);
    return [data.listPlayer, data.statut, data.success];
  };


  
  const removePlayer = async (dataToSend) => {
      //const dataToSend = {userId: userId, code: code};
      socket.emit('removePlayer', dataToSend);
          
      };

    const removeGame = async (code) => {
    socket.emit('removeGame', code);
  }

    
//createGame(userId, time, changeMission, tagMission);

  const createGame = async (userId, time, changeMission,tagMission) => {
    try {

      const response = await fetch(`${apiUrl}/api/game/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({timer: time, changeMission:changeMission, tagMission: tagMission}),
      });
      const data = await response.json();
      //const dataToSend = {surname: userSurname, code: data.code, expoToken: expoToken};
      //socket.emit('connectRoom', dataToSend);
      console.log('Partie créée avec succès : ', data);
      return data.gameCode;
    } catch (error) {
      
    }
  };

  const getGameInfo = async (gameCode, userId) => {
    try {
      const response = await fetch(`${apiUrl}/api/user/gameInfo/${gameCode}/${userId}`);
      const data = await response.json();
      console.log('Informations de la partie récupérées : ', data);
      return data;
    }
    catch(error){
      console.log('Erreur lors de la récupération des informations de la partie', error);
    }
  };

  const getStatPerso = async(userId) => {
    const response = await fetch(`${apiUrl}/api/user/stat/${userId}`);
    const data = await response.json();
    console.log('Récupération des stats perso', data);
    return data;
  };

  const getStatGeneral = async(code) => {
    const response = await fetch(`${apiUrl}/api/game/classement/${code}`);
    const data = await response.json();
    console.log('Récupération de la timeline', data.timeline);
    return data.timeline;
  };

  const getNewMission = async(userId) => {
    const response = await fetch(`${apiUrl}/api/game/mission/${userId}`);
    const data = await response.json();
    console.log('Récupération de la nouvelle mission', data.mission);
    return data.mission;
  };





export {
      getNewMission,
      getStatGeneral,
      sendKillAccept, 
      getStatPerso, 
      getGameInfo,
      saveUserId,
      getUserGameCode,
      getSurname, 
      createUser, 
      modifyUserName, 
      startGame, 
      getPlayer, 
      removePlayer,
      removeGame,
      createGame};











