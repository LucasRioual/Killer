import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import Header from '../Components/Header';
import { useNavigation } from '@react-navigation/native';
import {useGame} from '../Hooks/hooks';
import { useSelector, useDispatch } from 'react-redux';


const ActionScreen = ({navigation}) => {
  const listPlayer = useSelector((state) => state.game.listPlayer);
  const userId = useSelector((state) => state.user.userId);
  const userSurname = useSelector((state) => state.user.surname);
  const [targetAndMission, setTargetAndMission] = useState([]); // A remplacer par le target de l'utilisateur

  const getTargetAndMission = () => {
    console.log('listPlayer : ', listPlayer);
    for (let i = 0; i < listPlayer.length; i++) {
      if (listPlayer[i].userId === userId) {
        return [listPlayer[i].target,listPlayer[i].mission];
      }
    }
  }

  useEffect(() => {
    console.log(getTargetAndMission());
    setTargetAndMission(getTargetAndMission());
  },[listPlayer]);

  
  const handlePressKill = () => {
    
    console.log('Kill action pressed');
  };

  return (
    <View style={styles.ViewMain}>
      <StatusBar barStyle="light-content" />
      <Header titre={"Cible"}/>
      <View style={styles.ViewBody}>
        {/* Cible */}
        <View style={styles.targetContainer}>
          <Text style={styles.TextTitre}>{targetAndMission[0]}</Text>
        </View>
        
        {/* Action */}
        <View style={styles.actionContainer}>
          <Text style={styles.TextTitre}>{targetAndMission[1]}</Text>
        </View>
        
        {/* Bouton KILL */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handlePressKill}>
            <Text style={styles.buttonText}>KILL</Text>
          </TouchableOpacity>
        </View>
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
    paddingVertical:40,
    paddingHorizontal:10,
    alignItems:'center',
  },
  
  menuButton: {
    backgroundColor: 'red' ,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  TextTitre: {
    fontSize: 30,
    fontFamily: 'Sen',
    color: 'white',
  },
  targetContainer: {
    marginBottom: 20,
    padding: 10,
    borderColor: 'red', // Couleur de la bordure de la cible
    borderWidth: 2,
    borderRadius: 10,
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
    //justifyContent:'flex-end',
    
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 35,
    fontFamily: 'LuckiestGuy',
    
  },
});

export default ActionScreen;
