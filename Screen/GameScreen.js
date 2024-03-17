import React, { useEffect, useState, useRef} from 'react';
import { BackHandler, View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Animated, ScrollView, AppState} from 'react-native';
import HeaderGame from '../Components/HeaderGame';

import { useSelector, useDispatch } from 'react-redux';
import { setMission, setTarget} from '../Store/Reducer/userSlice';

import socket from '../Socket/socketManager';
import { getGameInfo, sendKillAccept, getNewMission } from '../Hooks/hooks';

import Timer from '../Components/Timer';
import TargetAndMission from '../Components/TargetAndMission';
import GameAnimation from '../Components/GameAnimation';
import { setTargetResponse, setTimer, setConfirmKill } from '../Store/Reducer/gameSlice';
import { setTargetLeave, setIsWinner} from '../Store/Reducer/userSlice';
import PopUpGame from '../Components/PopUpGame';







const GameScreen = ({navigation}) => {

  const appState = useRef(AppState.currentState);

  
  const target = useSelector((state) => state.user.target);
  const mission = useSelector((state) => state.user.mission);

  const userSurname = useSelector((state) => state.user.surname);
  const gameCode = useSelector((state) => state.game.gameCode);
  const userId = useSelector((state) => state.user.userId);
 
  
  const isHost = useSelector((state) => state.user.hostFlag);
  const dispatch = useDispatch();
  const [numberMission, setNumberMission] = useState(0);

  
  const [showSecondButton, setShowSecondButton] = useState(false);
  
  const [isTargetLoading, setIsTargetLoading] = useState(false);
  const [isChangeMissionLoading, setIsChangeMissionLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isConfirmKill = useSelector((state) => state.game.isConfirmKill);
  const isTargetResponse = useSelector((state) => state.game.isTargetResponse);
  const isTargetLeave = useSelector((state) => state.user.isTargetLeave);
  const isGameFinish = useSelector((state)=> state.game.isGameFinish)

  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [messagePopUp, setMessagePopUp] = useState('');
  const [isChoice, setIsChoice] = useState(false);
  const [popUpType, setPopUpType] = useState('');
  
  const opacityBody = useRef(new Animated.Value(0)).current;

  const getGameData = async () => {
    const gameInfo = await getGameInfo(gameCode, userId);
    dispatch(setMission(gameInfo.mission));
    dispatch(setTarget(gameInfo.target));
    dispatch(setTimer(gameInfo.timer));
    if(gameInfo.numberMission > 0){
      setShowSecondButton(true);
    };
    setNumberMission(gameInfo.numberMission);
    if(gameInfo.userStatut == 'confirmation'){
      dispatch(setConfirmKill(true));
    }
    
  };

  const changeMission = async () => {
    if(numberMission > 0 ){
      setIsChangeMissionLoading(true);
      const newMission = await getNewMission(userId);
      dispatch(setMission(newMission));
      setNumberMission(numberMission - 1);
      if(numberMission == 1){
        setShowSecondButton(false);
      }
      setIsChangeMissionLoading(false);
    }
  }

  useEffect(() => { //Lancement du jeu
    const handleHardwareBackPress = () => {
      displayLeavePopUp();
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', handleHardwareBackPress);
    const subscription = AppState.addEventListener('change', nextAppState => {  // Se reconnecter au websocket si l'application revient en premier plan

      if ( appState.current.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has come to the foreground!');
        getGameData();
        socket.emit('join_room', gameCode, userId);

      }
      appState.current = nextAppState;
      
    });

    
    if(gameCode){
      getGameData();
    }


    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleHardwareBackPress);
      subscription.remove();
    };

  }, []); 


  useEffect(() => { // Confirmation du kill (POV target)
    if(isConfirmKill){
      displayConfirmKillPopUp();
    }

  },[isConfirmKill]);

  useEffect(() => { // Réponse de la cible (POV killer)
    if(isTargetResponse !== null){
      if(isTargetResponse){
        displayCongratulationPopUp();
        getGameData();
        setIsLoading(false);

      }
      else{
        displayFailPopUp();
        setIsLoading(false);
      }
      dispatch(setTargetResponse(null));
    }
  }, [isTargetResponse]);

  useEffect(() => { // La cible quitte la partie 
    if(isTargetLeave){
      displayTargetLeavePopUp();
      getGameData();
      dispatch(setTargetLeave(false));
    }


  }, [isTargetLeave])

  useEffect(() => { // La partie est terminée 
    if(isGameFinish){
      navigation.navigate('StatPerso');
    }


  }, [isGameFinish])



  const displayLeavePopUp = () => {
      setMessagePopUp('Es-tu sûr de vouloir quitter la partie ?');
      setPopUpType('leave');
      setIsChoice(true);
      setIsPopUpVisible(true);
  }

  const displayKillPopUp = () => {
    setMessagePopUp('Confirmes-tu le meurtre de ' + target + ' ?');
    setPopUpType('send_kill');
    setIsChoice(true);
    setIsPopUpVisible(true);
  }

  const displayConfirmKillPopUp = () => {
    setMessagePopUp('Tu viens de te faire tuer ! Est-ce que tu confirmes ?');
    setPopUpType('receive_kill');
    setIsChoice(true);
    setIsPopUpVisible(true);
  }
  const displayCongratulationPopUp = () => {
    setMessagePopUp('Bravo ! Tu as tué ta cible ! Tu reçois une nouvelle mission !');
    setPopUpType('default');
    setIsChoice(false);
    setIsPopUpVisible(true);
  }
  const displayFailPopUp = () => {
    setMessagePopUp('Tu as raté ta cible !');
    setPopUpType('default');
    setIsChoice(false);
    setIsPopUpVisible(true);
  }
  const displayTargetLeavePopUp = () => {
    setMessagePopUp('Ta cible a quitté la partie. Tu reçois une nouvelle cible');
    setPopUpType('default');
    setIsChoice(false);
    setIsPopUpVisible(true);
  }

 

  const acceptPopUp = async() => {
    switch(popUpType){
      case 'send_kill':
        socket.emit("kill_confirm", userId);
        setIsLoading(true);
        setIsPopUpVisible(false);
        break;
      case 'receive_kill':
        await sendKillAccept(userId);
        dispatch(setConfirmKill(false));
        navigation.navigate('StatPerso');
        break;
      case 'leave':
        socket.emit("leave_game", userId);
        navigation.navigate('Home');
        break;
      default:
        break;
    }

  };

  const refusePopUp = () => {
    switch(popUpType){
      case 'receive_kill':
        socket.emit("kill_refuse", userId);
        dispatch(setConfirmKill(false));
        break;
      default:
        break;
    }

  };
  


  return (
    <View style={styles.ViewMain}>
      <HeaderGame titre={gameCode} navigation= {navigation} visible = {true} onClick = {displayLeavePopUp} host ={isHost}  />
      {isTargetLoading ? (
        <View style={styles.TargetLoadingView}>
          <ActivityIndicator size={100} color="#F0122D" />
          
        </View>

      ):(
        <Animated.View style={[styles.AnimationView, {opacity: opacityBody}]}>
          <View style={styles.ViewBody} >
            <ScrollView style={styles.ScrollView}>
              <View style={styles.ScrollViewContent}>
              <Timer />
            <TargetAndMission target={target} mission = {mission} number= {numberMission} />
            <View style={styles.bottomContainer}>
              {isLoading ? (
                <View style={styles.ViewLoading}>
                  <ActivityIndicator size={50} color="#F0122D" />
                  <Text style={styles.TextLoading}>En attente de ta cible ...</Text>
                </View>
              ) : (
                <View style = {styles.buttonContainer}>
                  {showSecondButton && (
                      <TouchableOpacity style={styles.buttonChange} onPress={changeMission} disabled={isChangeMissionLoading}>
                      {isChangeMissionLoading ? (
                          <ActivityIndicator size="small" color="white" />
                        ) : (
                          <Text style={styles.buttonTextChange}>Changer de mission</Text>
                        )}
                      
                      </TouchableOpacity>
                    )}
                    
                    <TouchableOpacity style={styles.buttonKill} onPress={displayKillPopUp}>
                      <Text style={styles.buttonTextKill}>KILL</Text>
                    </TouchableOpacity>
                    
                </View>
              )}
            </View>

              </View>
            </ScrollView>
            
          </View>
        
      </Animated.View>

      )}
      

      <GameAnimation opacityBody = {opacityBody} gameCode={gameCode}/>
      <PopUpGame isVisible={isPopUpVisible} setIsVisible={setIsPopUpVisible} isChoice={isChoice} message={messagePopUp} accept={acceptPopUp} refuse={refusePopUp} />
      
      
   </View>
  );
};

const styles = StyleSheet.create({
  ViewMain: {
    flex: 1, 
    backgroundColor: '#061624',
  },
  View1: {
    justifyContent: "flex-end",
    alignItems: "flex-end",

  },

  
  AnimationView: {
    flex: 5,
  },
  TargetLoadingView: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  ViewBody: {
    flex: 1, 
  },
  ScrollView: {
    padding: 20,
    
  },
  ScrollViewContent: {
    alignItems: 'center',
  },
  ViewLoading: {
    borderRadius: 20,
    padding: 40,
  },

  
  TextLoading: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Sen',
    marginTop: 20,
  },
  actionContainer: {
    marginBottom: 40,
    padding: 10,
    borderColor: 'red', // Couleur de la bordure de l'action
    borderWidth: 2,
    borderRadius: 10,
  },
  
  buttonKill: {
    backgroundColor:'#F0122D',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: 160,
    height: 70,
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonChange:{
    backgroundColor:'gray',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: 160,
    height: 70,
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

  },
  bottomContainer:{
    paddingVertical: 20,
    width: '100%',
    marginVertical  : 20,
  },
  buttonContainer: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonTextKill: {
    color: 'white',
    textAlign: 'center',
    fontSize: 36,
    fontFamily: 'LuckiestGuy',
    
  },
  buttonTextChange: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'LuckiestGuy',
    padding: 10,
  },
});

export default GameScreen;
