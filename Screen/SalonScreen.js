import React, {useEffect, useRef, useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, BackHandler } from 'react-native';
import Header from '../Components/Header';
import PlayerName from '../Components/PlayerName';
import { useSelector, useDispatch } from 'react-redux'
import {setGameCode, setIsGameStarted, setNewPlayer, setPlayerLeave} from '../Store/Reducer/gameSlice'

import PopUpConfirm from '../Components/PopUpConfirm';
import { createGame, startGame} from '../Hooks/hooks'
import socket from '../Socket/socketManager';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';





const SalonScreen = ({navigation, route})=> {


  const { time, changeMission, listPlayerReceived, tagMission } = route.params;

  //const isRefuseNewPlayer = useSelector((state) => state.game.isRefuseNewPlayer);
  //const gameStatut = useSelector((state) => state.game.gameStatut);
  //const userSurname = useSelector((state) => state.user.surname);

  const isHost = useSelector((state) => state.user.isHost);
  const gameCode = useSelector((state) => state.game.gameCode);
  const newPlayer = useSelector((state) => state.game.newPlayer);
  const playerLeave = useSelector((state) => state.game.playerLeave);
  const userId = useSelector((state) => state.user.userId);


  const isGameStarted = useSelector((state) => state.game.isGameStarted);
  const dispatch = useDispatch();
  const [isPopUpConfirmationVisible, setIsPopUpConfirmationVisible] = useState(false);
  //const expoToken = useSelector((state) => state.user.expoToken);
  const [gameIsStarted, setGameIsStarted] = useState(false);
  const [isStartLoading, setIsStartLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); 


  const [isLoading, setIsLoading] = useState(true);
  const [listPlayer, setListPlayer] = useState(listPlayerReceived);
  




  
  const onClickBack = () => {
    setIsPopUpConfirmationVisible(true);
  };


  const handleConfirmation = async () => {
    setIsPopUpConfirmationVisible(false);
  
    socket.emit('leave_game_salon', userId);
    navigation.goBack();

  };

  const handleCancel = () => {
    setIsPopUpConfirmationVisible(false);
  };

/*   useFocusEffect(
    React.useCallback(() => {
      dispatch(setGameStarted(false));
      setIsButtonDisabled(false);    
    }, [])
  ); */



/*   useEffect(() => {
    if(isEndGame){
      dispatch(setEndGame(false));
      navigation.navigate('Home');
      
    }
  }, [isEndGame]); */


  useEffect(  () => {
    if(newPlayer){
      setListPlayer([...listPlayer, newPlayer]);  
      dispatch(setNewPlayer(null));
    };
  }, [newPlayer]);

  useEffect(  () => {
    if(playerLeave){
      setListPlayer(listPlayer.filter((player) => player !== playerLeave));
      dispatch(setPlayerLeave(null));
    };
  }, [playerLeave]);


  useEffect(  () => {

    

    const getGame = async () => {
      const responseCode =  await createGame(userId, time, changeMission, tagMission[0]);
      dispatch(setGameCode(responseCode));
      socket.emit('join_room', responseCode, userId);
      setIsLoading(false);
    };

    if(isHost){
      setListPlayer([]);
      getGame();
    }
    else{
      setIsLoading(false);
    }

    /* if(gameStatut === 'start'){
      dispatch(setGameStatut('wait')); 
      setGameIsStarted(true);
    } */

    const handleHardwareBackPress = () => {
      setIsPopUpConfirmationVisible(true);
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', handleHardwareBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleHardwareBackPress);
      setListPlayer([]);
    };
    
  
  }, []);

  useEffect( () => {

    if(isGameStarted){
      dispatch(setIsGameStarted(false));
      navigation.navigate('Game');
    }
  }, [isGameStarted]);

   /*

  useEffect(() => {
    if(isRefuseNewPlayer){
      dispatch(setRefuseNewPlayer(false));
      navigation.navigate('Home');
    };
  },[isRefuseNewPlayer]); */


    const ListPlayer = () =>{
      return (
          <View style={styles.PlayerContainer}>
            {listPlayer.map((user, index) => (
              <PlayerName key={index} label={user} />
            ))}
          </View>
        );
    } 



  const onClickStart = async () =>{
    if(listPlayer.length < 3){
      setErrorMessage('Il faut au moins 3 joueurs pour lancer la partie');
      return;
    }
    setIsStartLoading(true);
    await startGame(gameCode);
    setIsStartLoading(false);


    
  }

    return (

      <View style={styles.ViewMain} >
        <Header titre={"Salon"} navigation= {navigation} visible = {false} onClickBack={onClickBack}/>
        {isLoading ? (

          <View style={styles.ViewBody}>
            
            <ActivityIndicator style={styles.LoadingView} size={150} color="#F0122D" />
            
          </View>

        ) : (

          <View style={styles.ViewBody}>
            <Text style={styles.TextTitre}>Code de la partie :</Text>
            <Text style={styles.TextCode}>{gameCode}</Text>

            {!gameIsStarted ? (
              <View style={styles.MainContainer}>
              <View style={styles.ViewPlayer}>
                
                <Text style={styles.TextTitreJoueur}>Joueurs</Text>
                <ScrollView persistentScrollbar={true}>         
                    <ListPlayer/>
                    
                </ScrollView>
                
              </View>
              <Text style={styles.TextWait}>En attente de joueurs ...</Text>
            </View>

            ):(
              <View style={styles.MainContainer}>
              <View style={styles.MessageContainer}>
                <Text style={styles.TextMessage}>La partie est en cours</Text>
                <Text style={styles.TextMessageDescription}>L'hôte de la partie doit confirmer ton intégration</Text>
              </View>
              <Text style={styles.TextWait}>En attente de l'hôte ...</Text>

                
              </View>
            )}
          
            {isHost && (
              <View style={styles.buttonContainer}>
              <TouchableOpacity disabled={isStartLoading} style={styles.button} onPress={onClickStart} activeOpacity={0.5}>
                {isStartLoading ? (
                          <ActivityIndicator size="small" color="white" />
                        ) : (
                          <Text style={styles.buttonText}>Lancer</Text>
                        )}
                
              </TouchableOpacity>
              <Text style={styles.TextErreur}>{errorMessage}</Text>
              </View>
            )}
        </View>

        )}

        
        <PopUpConfirm message={isHost ? 'Es-tu sûr de vouloir arrêter la partie ?' : 'Es-tu sûr de vouloir quitter la partie ?'} visible={isPopUpConfirmationVisible} exit={handleCancel} confirm= {handleConfirmation} />
      </View>
     
    );
}


const styles = StyleSheet.create ({
  ViewMain: {
    flex: 1, 
    backgroundColor: '#061624',

  },
  ViewBody: {
    flex: 5, 
    paddingTop:20,
    paddingBottom: 30,
    alignItems:'center',
  },
  LoadingView: {
    marginTop: 100,
  },
  TextCode: {
    fontFamily: 'LuckiestGuy',
    fontSize: 58,
    color:'#F0122D',
    
  },
  TextTitre: {
    fontSize: 24,
    fontFamily: 'Sen',
    color: 'white',
    
  },
  MainContainer: {
    marginTop:10,
    flex:4,
    width:'80%',
    justifyContent:'center',
    

  },
  ViewPlayer: {
    flex:1,
    backgroundColor: 'white',
    borderRadius:20,
    
    
    
  },
  TextWait: {
    fontSize: 12,
    fontFamily: 'Sen',
    color: 'white',
    marginTop:4,
    
    
  },
  TextErreur: {
    fontSize: 12,
    fontFamily: 'Sen',
    color: '#F0122D',
    marginTop:4,
    textAlign:'center',
  },
  TextTitreJoueur: {
    fontSize: 28,
    fontFamily: 'LuckiestGuy',
    color: 'black', 
    textAlign:'center',
    marginVertical:5
  },


  PlayerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent:'center',
  },
  button: {
    backgroundColor:'#F0122D',
    borderRadius: 50,
    width: 160,
    height: 60,
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
    alignItems:'center',
    
    
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 28,
    fontFamily: 'LuckiestGuy',
    
  },
  MessageContainer: {
    justifySelf:'center',
    backgroundColor: 'white',
    borderRadius:20,
    paddingVertical: 30,
  },
  TextMessage: {
   
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'Sen',
    fontWeight: 'bold',
    
  },
  TextMessageDescription: {
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Sen',
    marginTop: 10,
  },
  
  
});

export default SalonScreen;