import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Header from '../Components/Header';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setKilledBy, setConfirmKill } from '../Store/Reducer/gameSlice';
import PopUpConfirm from '../Components/PopUpConfirm';
import socket from '../Socket/socketManager';
import PopUpDisplayKill from '../Components/PopUpDisplayKill';





const CibleScreen = ({navigation}) => {
  const listPlayer = useSelector((state) => state.game.listPlayer);
  const userId = useSelector((state) => state.user.userId);
  const userSurname = useSelector((state) => state.user.surname);
  const gameCode = useSelector((state) => state.game.gameCode);
  const killedBy = useSelector((state) => state.game.killedBy);
  const isConfirmKill = useSelector((state) => state.game.isConfirmKill);
  const dispatch = useDispatch();
  const [targetAndMission, setTargetAndMission] = useState([]);
  const [isPopUpConfirmationVisible, setIsPopUpConfirmationVisible] = useState(false);
  const [isPopUpKilledConfirmationVisible, setIsPopUpKilledConfirmationVisible] = useState(false);
  const [messagePopUp, setMessagePopUp] = useState('');
  const [isPopUpDisplayKill, setIsPopUpDisplayKill] = useState(false);

  const [messagePopUpKilled, setMessagePopUpKilled] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getTargetAndMission = () => {
    console.log('listPlayer : ', listPlayer);
    for (let i = 0; i < listPlayer.length; i++) {
      if (listPlayer[i].userId === userId) {
        return [listPlayer[i].target,listPlayer[i].mission];
      }
    }
  }

  useEffect(() => {

    const targetAndMission = getTargetAndMission();
    setTargetAndMission(targetAndMission);
    setMessagePopUp('Confirmes-tu le meurtre de ' + targetAndMission[0] + ' ?')
  },[listPlayer]);


  useEffect(() => {
    if (killedBy !== null) {
      setMessagePopUpKilled('Tu as été tué par ' + killedBy + ' ?');
      setIsPopUpKilledConfirmationVisible(true);
    }
  }, [killedBy]);

  useEffect(() => {
    if (isConfirmKill !== null) {
      setIsLoading(false);
      setIsPopUpDisplayKill(true);
    }  
  }, [isConfirmKill]);



  
  const handlePressKill = () => {
    setIsPopUpConfirmationVisible(true);
    
  };

  const getSocketId = (target) => {
    for (let i = 0; i < listPlayer.length; i++) {
      if (listPlayer[i].surname === target) {
        return listPlayer[i].socketId;
      }
    }
  }

  const getExpoToken = (target) => {
    for (let i = 0; i < listPlayer.length; i++) {
      if (listPlayer[i].surname === target) {
        return listPlayer[i].expoToken;
      }
    }
  }

  const handleConfirmationKilled = () => {
    console.log('Tu est mort');
    const socketKiller = getSocketId(killedBy);
    console.log('gameCode : ', gameCode);
    socket.emit("killed", gameCode, socketKiller, targetAndMission[0], targetAndMission[1]);
    setIsPopUpKilledConfirmationVisible(false);
    navigation.navigate('EndGame');

  };

  const handleCancelKilled = () => {
    const socketKiller = getSocketId(killedBy);
    dispatch(setKilledBy(null));
    setIsPopUpKilledConfirmationVisible(false);
    socket.emit("notKilled", socketKiller);
    //Il faut dire au tueur que la cible a refusé
  };


  const handleConfirmation = () => {
    const socketTarget = getSocketId(targetAndMission[0]);
    const expoTokenTarget = getExpoToken(targetAndMission[0]);
    socket.emit("confirmKill", socketTarget, userSurname, expoTokenTarget);
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
  


  return (
    <View style={styles.ViewMain}>
      <Header titre={""} navigation= {navigation} visible = {true} />
      <View style={styles.ViewBody}>
          <View>
          <View style={styles.mainContainer}>
            <Text style={styles.TextTitre}>Cible</Text>
            <View style={styles.targetContainer}>
              <Text style={styles.TextTarget}>{targetAndMission[0]}</Text>

            </View>

          </View>
          <View style={styles.mainContainer}>
            <Text style={styles.TextTitre}>Mission</Text>
            <View style={styles.targetContainer}>
              <Text style={styles.TextMission}>{targetAndMission[1]}</Text>

            </View>

          </View>

          <View style={styles.buttonContainer}>

            {isLoading ? (
              <View style={styles.ViewLoading}>
                <ActivityIndicator size={50} color="#F0122D" />
                <Text style={styles.TextLoading}>En attente de ta cible ...</Text>
              </View>
            ) : (
              <TouchableOpacity style={styles.button} onPress={handlePressKill}>
              <Text style={styles.buttonText}>KILL</Text>
            </TouchableOpacity>
            )}

          </View>
        </View>
        
      </View>
      <PopUpConfirm message={messagePopUp} visible={isPopUpConfirmationVisible} exit={handleCancel} confirm= {handleConfirmation} />
      <PopUpConfirm message={messagePopUpKilled} visible={isPopUpKilledConfirmationVisible} exit={handleCancelKilled} confirm= {handleConfirmationKilled} />
      <PopUpDisplayKill visible={isPopUpDisplayKill} exit={handleCancelPopUpDisplayKill} isConfirmKill={isConfirmKill} />
      
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
  
  ViewBody: {
    flex: 5, 
    alignItems:'center',
    
    
  },
  ViewLoading: {
    borderRadius: 20,
    padding: 40,
  },
  mainContainer: {
    marginTop: 0,
    marginBottom: 40,
    
    alignItems:'center',

  },
  
  menuButton: {
    backgroundColor: 'red' ,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  TextTitre: {
    fontSize: 46,
    fontFamily: 'LuckiestGuy',
    color: 'white',
  },
  targetContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    borderColor: '#F0122D',
    borderWidth: 2,
    borderRadius: 10,
    maxWidth:'90%'
  },
  TextTarget: {
    color: 'white',
    textAlign: 'center',
    fontSize: 35,
    fontFamily: 'Sen',
  },
  TextMission: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'Sen',
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
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 42,
    fontFamily: 'LuckiestGuy',
    
  },
});

export default CibleScreen;
