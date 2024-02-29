import React,  { useState, useEffect, useRef }  from 'react';
import {   Animated,  SafeAreaView, View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Header from '../Components/Header';
import socket from '../Socket/socketManager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import ListPlayer from '../Data/ListPlayer';

const RecapScreen = ({ navigation, route }) => {

    const gameCode = useSelector((state) => state.game.gameCode);
    const userSurname = useSelector((state) => state.user.surname);
    const [listPlayer, setListPlayer] = useState(ListPlayer);
  
    const VoirHistorique = () => {
        navigation.navigate('Historique');
    };

    // This function returns the list of kills along with the player's name for each player
    const getListKills = () => {
        const listKills = listPlayer.map((player) => {
            return {name: player.surname, kills: player.kills};
            // It then orders the list by number of kills, and keeps the 3 highest values
        }
        ).sort((a, b) => {
            return b.kills - a.kills;
        }).slice(0, 3);
        return listKills;
    }

    //This function retrieves the shortest aliveTime from the list of players, and the name of the player who has it
    const getShortestAliveTime = () => {
        const shortestAliveTime = listPlayer.reduce((min, player) => min.aliveTime < player.aliveTime ? min : player);
        return shortestAliveTime;
    }

    const topPlayers = getListKills();

    const worstPlayer = getShortestAliveTime();

    return (
        <View style={styles.ViewMain}>
          <Header titre={"RECAP"} navigation= {navigation} visible = {true} />
          <View style={styles.ViewBody}>
            <View style={styles.mainContainer}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'column', alignItems: 'center'}}>
                        <View style={{backgroundColor: 'red', width: 50, height: 50, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: 'white', fontSize: 20}}>{topPlayers[2].kills}</Text>
                        </View>
                        <Text style={{color: 'white', fontSize: 20}}>{topPlayers[2].name}</Text>
                    </View>
                    <View style={{flexDirection: 'column', alignItems: 'center'}}>
                        <View style={{backgroundColor: 'red', width: 50, height: 100, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: 'white', fontSize: 20}}>{topPlayers[0].kills}</Text>
                        </View>
                        <Text style={{color: 'white', fontSize: 20}}>{topPlayers[0].name}</Text>
                    </View>
                    <View style={{flexDirection: 'column', alignItems: 'center'}}>
                        <View style={{backgroundColor: 'red', width: 50, height: 75, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: 'white', fontSize: 20}}>{topPlayers[1].kills}</Text>
                        </View>
                        <Text style={{color: 'white', fontSize: 20}}>{topPlayers[1].name}</Text>
                    </View>
                </View>
                {/*Displays the player who has the shortest aliveTime*/ }
                <Text style={{color: 'white', fontSize: 20}}>Vie la plus courte : {worstPlayer.name} a survécu {worstPlayer.aliveTime} secondes !</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={VoirHistorique}>
                    <Text style={styles.buttonText}>Historique</Text>
                </TouchableOpacity>
          </View>
        </View>
    );
};

const styles = StyleSheet.create({
    ViewMain: {
      flex: 1, 
      backgroundColor: '#061624',
    },
  
    ViewBody: {
      flex: 5, 
      alignItems:'center',
  
    },
    fadingContainer: {
      padding: 20,
      
    },
    mainContainer: {
      marginTop: 70,
      marginBottom: 40,
      borderColor: '#F0122D', // Couleur de la bordure de l'action
      borderWidth: 10,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
      maxWidth:'90%'
      
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
  
  
  
  
  export default RecapScreen;