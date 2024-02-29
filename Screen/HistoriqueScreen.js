import React, {useEffect, useRef, useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Header from '../Components/Header';
import PlayerName from '../Components/PlayerName';
import { useSelector, useDispatch } from 'react-redux'

import PopUpConfirm from '../Components/PopUpConfirm';
import { createGame, startGame} from '../Hooks/hooks'
import socket from '../Socket/socketManager';
import { useFocusEffect } from '@react-navigation/native';



const HistoriqueScreen = ({navigation})=> {

  const userId = useSelector((state) => state.user.userId);
  const userSurname = useSelector((state) => state.user.surname);
  const hostFlag = useSelector((state) => state.user.hostFlag);
  const listPlayer = useSelector((state) => state.game.listPlayer);
  const isGameEnded = useSelector((state) => state.game.isGameEnded);
  const dispatch = useDispatch();
  const navigationEventRef = useRef(null);


 

  const ListPlayer = () =>{
      return (
          <View style={styles.PlayerContainer}>
            {listPlayer.map((user, index) => (
              <PlayerName key={index} label={user.surname} />
            ))}
          </View>
        );
    } 


  return (

    <View style={styles.ViewMain} >
      <Header titre={"Historique"} navigation= {navigation} visible = {false}/>
      <View style={styles.ViewBody}>
          <View style={styles.MainContainer}>
            <View style={styles.ViewHistorique}>          
              <Text style={styles.TextTitre}>Historique</Text>
              <ScrollView persistentScrollbar={true}>         
                  <ListPlayer/>
                  
              </ScrollView>
              
            </View>
            <Text style={styles.TextWait}>En attente de la Fin de la partie ...</Text>
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

  MainContainer: {
    marginTop:10,
    flex:4,
    width:'80%',
    

  },
  ViewHistorique: {
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
  TextTitre: {
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
  
  
});

export default HistoriqueScreen;