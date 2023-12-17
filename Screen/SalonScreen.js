import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../Components/Header';
import PlayerName from '../Components/PlayerName';
import { useSelector, useDispatch } from 'react-redux'
import { modifyCode } from '../Store/Reducer/gameSlice'
import listData from '../Data/UserData.json'

import {useGame} from '../Hooks/hooks'


const SalonScreen = ({navigation})=> {



  const userId = useSelector((state) => state.user.userId);
  const userSurname = useSelector((state) => state.user.surname);
  const hostFlag = useSelector((state) => state.user.hostFlag);
  const gameCode = useSelector((state) => state.game.gameCode);
  const listPlayer = useSelector((state) => state.game.listPlayer);
  const dispatch = useDispatch();
  
  const {startSocket, addPlayer, createGame, startGame} = useGame({navigation});
 
  

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
        //joinApi(gameCode);
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

/*   const ListPlayer = () =>{
    return (
      <View style={styles.PlayerContainer}>
        {listData.map((user, index) => (
          <PlayerName key={index} label={user.userName} />
        ))}
    </View>
      );

}  */


  const onClickStart = () =>{
    startGame(gameCode);
    navigation.navigate('Cible'); 

  }

    return (

      <View style={styles.ViewMain} >
        <Header titre={"Salon"} navigation= {navigation}/>
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