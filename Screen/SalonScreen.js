import React, {useEffect, useState, useCallback} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../Components/Header';
import PlayerName from '../Components/PlayerName';
import UserData from '../Data/UserData.json'
import { useSelector, useDispatch } from 'react-redux'
import { modifyCode } from '../Store/Reducer/gameSlice'
import { io } from "socket.io-client";
import { useFocusEffect } from '@react-navigation/native';




const SalonScreen = ()=> {

  const userId = useSelector((state) => state.user.userId);
  const userSurname = useSelector((state) => state.user.surname);
  const hostFlag = useSelector((state) => state.user.hostFlag);
  const gameCode = useSelector((state) => state.game.gameCode);
  const dispatch = useDispatch();
  const [listPlayer, setListPlayer] = useState([]);

  const [isPopUpVisible, setPopUpVisible] = useState(false);
  const openPopUp = () => {
    setPopUpVisible(true);
  };
  const closePopUp = () => {
    setPopUpVisible(false);
  };  


  const startSocket = (code) => {
    return new Promise((resolve, reject) => {
      const socket = io('http://192.168.0.11:3000');
  
      // Écouter l'événement 'connect'
      socket.on('connect', () => {
        console.log('Connecté au serveur WebSocket');
        socket.emit('sendCode', code);
        resolve(socket); // Résoudre la promesse une fois que la connexion est établie
      });
  
      socket.on('sendListPlayer', (updatedListPlayer) => {
        console.log('Nouvelle liste de joueurs reçue :', userSurname, updatedListPlayer);
        setListPlayer(updatedListPlayer);
      });
  
      // Notez que vous n'avez pas besoin d'appeler addPlayer ici
    });
  };

  const addPlayer = async(code) => {

    const response = await fetch(`http://192.168.0.11:3000/api/game/${code}`, {
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

      const response = await fetch('http://192.168.0.11:3000/api/game', {
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

  const joinApi = async (code) => {
    await startSocket(code);    
    await addPlayer(code);

  }

    useEffect(() => {
      if(hostFlag){
        createGame();
      }
      else{
        console.log('join');
        joinApi(gameCode);
      }
      
      
    }, []);

    
   


    const ListPlayer = () =>{
      return (
          <View style={styles.PlayerContainer}>
            {listPlayer.map((user, index) => (
              <PlayerName key={index} label={user.surname} />
            ))}
          </View>
        );
  
  }


    
  

  const navigation = useNavigation();
  const Cible = () => {
    navigation.navigate("Cible");
  };

    return (

      <View style={styles.ViewMain} >
        <Header titre={"Salon"}/>
        <View style={styles.ViewBody}>
          
            <Text style={styles.TextTitre}>Code de la partie :</Text>
            <Text style={styles.TextCode}>{gameCode}</Text>
            <View style={styles.ViewPlayer}>
                <ScrollView persistentScrollbar={true}>
                    
                    <ListPlayer/>
                   
                </ScrollView>
                
                
            </View>
            
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={Cible} activeOpacity={0.5}>
                <Text style={styles.buttonText}>Lancer</Text>
                </TouchableOpacity>

            </View>
            

            
        </View>
      </View>
     
    );
}


const styles = StyleSheet.create ({
  ViewMain: {
    flex: 1, 
    backgroundColor: '#FFEBD7',
  },
  ViewBody: {
    flex: 5, 
    paddingVertical:40,
    paddingHorizontal:10,
    alignItems:'center',
  },
  TextCode: {
    fontFamily: 'LuckiestGuy',
    fontSize: 60,
    color:'#F0122D',
  },
  TextTitre: {
    fontSize: 30,
    fontFamily: 'Sen',
  },
  ViewPlayer: {
    marginTop:20,
    borderRadius:20,
    flex:4,
    justifyContent: 'center',
  },
  PlayerContainer: {
    
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent:'center',
    

  },
  button: {
    backgroundColor:'#F0122D',
    borderRadius: 50,
    paddingHorizontal:40,
    paddingVertical:10,
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonContainer:{
    flex:1,
    justifyContent:'flex-end',
    
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 35,
    fontFamily: 'LuckiestGuy',
    
  },
  
  
});

export default SalonScreen;