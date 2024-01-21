import React, { useEffect, useState, useRef} from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Animated} from 'react-native';
import HeaderGame from '../Components/HeaderGame';

import { useSelector, useDispatch } from 'react-redux';
import {setConfirmKill } from '../Store/Reducer/gameSlice';
import PopUpConfirm from '../Components/PopUpConfirm';
import socket from '../Socket/socketManager';
import PopUpDisplayKill from '../Components/PopUpDisplayKill';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Timer from '../Components/Timer';
import TargetAndMission from '../Components/TargetAndMission';
import GameAnimation from '../Components/GameAnimation';
import ConfirmKilled from '../Components/PopUpGame/ConfirmKilled';
import NewPlayer from '../Components/PopUpGame/NewPlayer';




const CibleScreen = ({navigation}) => {

  
  const listPlayer = useSelector((state) => state.game.listPlayer);
  const userSurname = useSelector((state) => state.user.surname);
  const gameCode = useSelector((state) => state.game.gameCode);
 
  const isConfirmKill = useSelector((state) => state.game.isConfirmKill);
  const dispatch = useDispatch();
 
  const [targetAndMission, setTargetAndMission] = useState([]);
  const [isPopUpConfirmationVisible, setIsPopUpConfirmationVisible] = useState(false);

  const [messagePopUp, setMessagePopUp] = useState('');
  const [isPopUpDisplayKill, setIsPopUpDisplayKill] = useState(false);
  const [isPopUpLeaveVisible, setIsPopUpLeaveVisible] = useState(false);

 
  const [isLoading, setIsLoading] = useState(false);
  
  const opacityBody = useRef(new Animated.Value(0)).current;

  const getTargetAndMission = () => {
    const player = listPlayer.find((player) => player.surname === userSurname);
    return player ? [player.target, player.mission] : ['', ''];
  };

  useEffect(() => {
    const targetAndMission = getTargetAndMission();
    setTargetAndMission(targetAndMission);
    setMessagePopUp('Confirmes-tu le meurtre de ' + targetAndMission[0] + ' ?')
  },[listPlayer]);


  useEffect(() => {
    if (isConfirmKill !== null) {
      setIsLoading(false);
      setIsPopUpDisplayKill(true);
    }  
  }, [isConfirmKill]);

  
  const handlePressKill = () => {
    setIsPopUpConfirmationVisible(true);
    
  };

  const handleConfirmation = () => {
    socket.emit("confirmKill",gameCode);
    setIsLoading(true);
    setIsPopUpConfirmationVisible(false);
  }

  const handleCancel = () => {
    setIsPopUpConfirmationVisible(false);
  }


  const handleCancelPopUpDisplayKill = () => {
    setIsPopUpDisplayKill(false);
    dispatch(setConfirmKill(null));
  }

  const leaveGame = () => {
    setIsPopUpLeaveVisible(false);
    socket.emit("leaveGame", gameCode, userSurname);
    AsyncStorage.removeItem('gameCode');
    navigation.navigate('Home');
  }
  


  return (
    <View style={styles.ViewMain}>
      <HeaderGame titre={gameCode} navigation= {navigation} visible = {true} onClick = {()=>{setIsPopUpLeaveVisible(true)}}  />
      <Animated.View style={[styles.AnimationView, {opacity: opacityBody}]}>
          <View style={styles.ViewBody} >
            <Timer />
            <TargetAndMission target={targetAndMission[0]} mission = {targetAndMission[1]} />
            <View style={styles.bottomContainer}>
              {isLoading ? (
                <View style={styles.ViewLoading}>
                  <ActivityIndicator size={50} color="#F0122D" />
                  <Text style={styles.TextLoading}>En attente de ta cible ...</Text>
                </View>
              ) : (
                <View style = {styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonChange} onPress={() => {}}>
                      <Text style={styles.buttonTextChange}>Changer de mission</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonKill} onPress={handlePressKill}>
                      <Text style={styles.buttonTextKill}>KILL</Text>
                    </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        
      </Animated.View>

      <ConfirmKilled navigation={navigation} gameCode={gameCode} />
      <NewPlayer gameCode={gameCode} />

      <PopUpDisplayKill visible={isPopUpDisplayKill} exit={handleCancelPopUpDisplayKill} isConfirmKill={isConfirmKill} />
      <PopUpConfirm message={messagePopUp} visible={isPopUpConfirmationVisible} exit={handleCancel} confirm= {handleConfirmation} />
      <PopUpConfirm message={'Es-tu sûr de vouloir quitter la partie ?'} visible={isPopUpLeaveVisible} exit={()=>setIsPopUpLeaveVisible(false)} confirm= {leaveGame} />


      
      <GameAnimation opacityBody = {opacityBody} gameCode={gameCode}/>
      
      
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
  ViewBody: {
    alignItems:'center', 
    flex: 1,
    
    
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
    flex:1, 
    width: '100%',
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

export default CibleScreen;
