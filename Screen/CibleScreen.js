import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import Header from '../Components/Header';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import PopUpKilled from '../Components/PopUpKilled';
import HeaderMenu from '../Components/HeaderMenu';




const CibleScreen = ({navigation}) => {
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
    setTargetAndMission(getTargetAndMission());
  },[listPlayer]);

  
  const handlePressKill = () => {
    
    console.log('Kill action pressed');
  };

   const retourMenu = () => {
    navigation.goBack(); // Ou toute autre logique pour le retour au menu
  };
  


  return (
    <View style={styles.ViewMain}>
      <Header titre={""} navigation= {navigation} visible = {true} />
      <View style={styles.ViewBody}>
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
        <TouchableOpacity style={styles.button} onPress={handlePressKill}>
            <Text style={styles.buttonText}>KILL</Text>
          </TouchableOpacity>

        </View>
        
      </View>
    
      

      {/* <View style={styles.View1}>
        <HeaderMenu onClick={retourMenu} fill={styles.txtColor} />
      </View> */}

      {/* <StatusBar barStyle="light-content" />
      <Header titre={"Cible"}/>
      <View style={styles.ViewBody}>
        
        <View style={styles.targetContainer}>
          <Text style={styles.TextTitre}>{targetAndMission[0]}</Text>
        </View>
        
        
        <View style={styles.actionContainer}>
          <Text style={styles.TextTitre}>{targetAndMission[1]}</Text>
        </View>
        
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handlePressKill}>
            <Text style={styles.buttonText}>KILL</Text>
          </TouchableOpacity>
        </View>
      </View> */}
      
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
    maxWidth:'80%'
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
    
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 42,
    fontFamily: 'LuckiestGuy',
    
  },
});

export default CibleScreen;
