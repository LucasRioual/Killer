import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../Components/Header';
import PlayerName from '../Components/PlayerName';
import { useSelector, useDispatch } from 'react-redux'
import { modifyCode } from '../Store/Reducer/gameSlice'

import {useGame} from '../Hooks/hooks'





const SalonScreen = ({navigation})=> {

  const userId = useSelector((state) => state.user.userId);
  const userSurname = useSelector((state) => state.user.surname);
  const hostFlag = useSelector((state) => state.user.hostFlag);
  const gameCode = useSelector((state) => state.game.gameCode);
  const listPlayer = useSelector((state) => state.game.listPlayer);
  const dispatch = useDispatch();
  
  const {startSocket, addPlayer, createGame, startGame} = useGame({navigation});

  const [isPopUpVisible, setPopUpVisible] = useState(false);
  const openPopUp = () => {
    setPopUpVisible(true);
  };
  const closePopUp = () => {
    setPopUpVisible(false);
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

  const onClickStart = () =>{
    startGame(gameCode);
    navigation.navigate('Cible'); 

  }

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

            {hostFlag && (
              <TouchableOpacity style={styles.button} onPress={onClickStart} activeOpacity={0.5}>
                <Text style={styles.buttonText}>Lancer</Text>
              </TouchableOpacity>
            )}

            </View>
            

            
        </View>
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
    color: 'white',
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