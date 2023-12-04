import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import Header from '../Components/Header';
import { useNavigation } from '@react-navigation/native';

const ActionScreen = () => {
  // Vous auriez ici la logique pour définir la cible et l'action, ou les recevoir via props.
  
  const handlePressKill = () => {
    // Logique déclenchée lors de l'appui sur le bouton KILL
    console.log('Kill action pressed');
  };

  return (
    <View style={styles.ViewMain}>
      <StatusBar barStyle="light-content" />
      <Header titre={"Cible"}/>
      <View style={styles.ViewBody}>
        {/* Cible */}
        <View style={styles.targetContainer}>
          <Text style={styles.TextTitre}>Khaoula</Text>
        </View>
        
        {/* Action */}
        <View style={styles.actionContainer}>
          <Text style={styles.TextTitre}>Khaoula doit te proposer de boire dans son verre</Text>
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
    backgroundColor: '#FFEBD7',
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
