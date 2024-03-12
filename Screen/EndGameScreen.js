import React,  { useState, useEffect, useRef }  from 'react';
import {   Animated,  SafeAreaView, View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Header from '../Components/Header';
import socket from '../Socket/socketManager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';



const GameOverScreen = ({ navigation, route }) => {

  const { isWinner } = route.params;
  const gameCode = useSelector((state) => state.game.gameCode);
  const userSurname = useSelector((state) => state.user.surname);
  const userKills = useSelector((state) => state.user.kills);
  const userAliveTime = useSelector((state) => state.user.aliveTime);
  const users = useSelector((state)=>state.listPlayer)


  const VoirHistorique = () => {
      navigation.navigate('Historique');
  };
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {

    //socket.emit("leaveGame", gameCode, userSurname);
   // AsyncStorage.removeItem('gameCode');

    // Commencer l'animation de fondu dès que le composant est monté
    Animated.timing(fadeAnim, {
      toValue: 1, // Animer l'opacité jusqu'à 1 (complètement opaque)
      duration: 2000, // Durée de l'animation en millisecondes
      useNativeDriver: true, // Ajouter cette ligne pour améliorer les performances
    }).start();
  }, []);

  // Trouver l'utilisateur avec le plus de kills
  const userMostKills = users.reduce((max, user) => max.kills > user.kills ? max : user);

  return (
    <View style={styles.ViewMain}>
      <Header titre={""} navigation= {navigation} visible = {true} />
      <View style={styles.ViewBody}>
      <View style={styles.mainContainer}>
      <View style={styles.container}>
      <LottieView
        //source={require('path/to/your/lottie/file.json')} // Remplacez par le chemin de votre fichier Lottie
        autoPlay
        loop={false} // Changez à true si vous voulez que l'animation boucle
        style={styles.animation}
      /> 
      <Text>Votre nombre de kills: {userKills}</Text>
      <Text>Votre temps passé en vie: {userAliveTime}</Text>
      {/* Autres éléments de votre page de fin de jeu */}
    </View>
        <SafeAreaView style={styles.container}>
          <Animated.View // Vue animée spéciale de React Native
            style={[
              styles.fadingContainer,
              {
                opacity: fadeAnim, // Lie l'opacité à la valeur animée
              }
            ]}
          >
            
            <Text style={styles.TextTitre} >{isWinner ? 'Tu as gagné' : 'Tu es éliminé'}</Text>
          </Animated.View>
        </SafeAreaView>
                
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




export default GameOverScreen;