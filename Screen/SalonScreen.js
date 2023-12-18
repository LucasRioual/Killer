import React, {useEffect, useRef, useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Header from '../Components/Header';
import PlayerName from '../Components/PlayerName';
import { useSelector, useDispatch } from 'react-redux'
import { modifyCode, setGameStarted} from '../Store/Reducer/gameSlice'
import listData from '../Data/UserData.json'
import PopUpConfirm from '../Components/PopUpConfirm';
import { createGame, startGame} from '../Hooks/hooks'
import socket from '../Socket/socketManager';
import { useFocusEffect } from '@react-navigation/native';



const SalonScreen = ({navigation})=> {



  const userId = useSelector((state) => state.user.userId);
  const userSurname = useSelector((state) => state.user.surname);
  const hostFlag = useSelector((state) => state.user.hostFlag);
  const gameCode = useSelector((state) => state.game.gameCode);
  const listPlayer = useSelector((state) => state.game.listPlayer);
  const isGameStarted = useSelector((state) => state.game.isGameStarted);
  const dispatch = useDispatch();
  const [isPopUpConfirmationVisible, setIsPopUpConfirmationVisible] = useState(false);
  const navigationEventRef = useRef(null);
  const [messagePopUp, setMessagePopUp] = useState(''); 


  
 


  const handleConfirmation = async () => {
    setIsPopUpConfirmationVisible(false);
    if(hostFlag){
      socket.emit('removeGame', gameCode);
    }
    else{
      const dataToSend = {userId: userId, code: gameCode};
      socket.emit('removePlayer', dataToSend);
    }
    if(navigationEventRef.current){
      navigation.dispatch(navigationEventRef.current.data.action);
    }
  };

  const handleCancel = () => {
    setIsPopUpConfirmationVisible(false);
    
  };



  useFocusEffect(
    React.useCallback(() => {
      dispatch(setGameStarted(false));
      console.log('useFocusEffect');

      
    }, [])
  );


 




  useEffect( () => {
    

    if(hostFlag){
      setMessagePopUp('Es-tu sûr de vouloir arrêter la partie ?');

    }
    else{
      setMessagePopUp('Es-tu sûr de vouloir quitter la partie ?');
    }
    async function createGameAndCode(){
      const responseCode =  await createGame(userId, userSurname);
      console.log('responseCode : ', responseCode);
      dispatch(modifyCode(responseCode));
    }
    if(hostFlag){
      createGameAndCode();
    }  
    navigation.addListener('beforeRemove', (e) => {
      /* if(isHostStopGame){
        return;
      } */
      e.preventDefault();
      navigationEventRef.current = e;
      setIsPopUpConfirmationVisible(true);
    });
       

  }, []);

  useEffect( () => {

    console.log('isGameStarted : ', isGameStarted);
    if(isGameStarted){
      navigation.navigate('Cible');
    }
  }, [isGameStarted]);


    const ListPlayer = () =>{
      return (
          <View style={styles.PlayerContainer}>
            {listPlayer.map((user, index) => (
              <PlayerName key={index} label={user.surname} />
            ))}
          </View>
        );
    } 



  const onClickStart = () =>{
    console.log('onClickStart', isGameStarted);
    startGame(gameCode);
    
  }

    return (

      <View style={styles.ViewMain} >
        <Header titre={"Salon"} navigation= {navigation} visible = {false}/>
        <View style={styles.ViewBody}>
            <Text style={styles.TextTitre}>Code de la partie :</Text>
            <Text style={styles.TextCode}>{gameCode}</Text>
            <View style={styles.MainContainer}>
              <View style={styles.ViewPlayer}>
                
                <Text style={styles.TextTitreJoueur}>Joueurs</Text>
                <ScrollView persistentScrollbar={true}>         
                    <ListPlayer/>
                    
                </ScrollView>
                
              </View>
              <Text style={styles.TextWait}>En attente de joueurs ...</Text>
            </View>

            
            
            
            <View style={styles.buttonContainer}>

            {hostFlag && (
              <TouchableOpacity style={styles.button} onPress={onClickStart} activeOpacity={0.5}>
                <Text style={styles.buttonText}>Lancer</Text>
              </TouchableOpacity>
            )}

            </View>
            

            
        </View>
        <PopUpConfirm message={messagePopUp} visible={isPopUpConfirmationVisible} exit={handleCancel} confirm= {handleConfirmation} />
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