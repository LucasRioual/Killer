import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Header from '../Components/Header';

const GameOverScreen = ({ navigation }) => {
  const VoirHistorique = () => {
      navigation.navigate('Historique');
  };

  return (
    <View style={styles.ViewMain}>
      <Header titre={""} navigation= {navigation} visible = {true} />
      <View style={styles.ViewBody}>
        <View style={styles.mainContainer}>
          <Text style={styles.TextTitre}>Vous avez été éliminé!</Text>
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
    backgroundColor: 'yellow',
    
  },
  ViewLoading: {
    borderRadius: 20,
    padding: 40,
  },
  mainContainer: {
    marginTop: 20,
    marginBottom: 40,
    alignItems:'center',
    backgroundColor: 'green',
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




export default GameOverScreen;
