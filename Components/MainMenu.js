import React, { Component, useRef, useState,  } from 'react';
import {StyleSheet, View, TouchableOpacity, Text, TextInput, Animated } from 'react-native';




const MainMenu =  ({ navigation }) => {
  const [inputValue, setInputValue] = useState('');
  const shakeAnim = useRef(new Animated.Value(0)).current;

  startShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 20, duration: 70, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -20, duration: 70, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 20, duration: 70, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 70, useNativeDriver: true })
    ]).start();
 }

  const Create = () => {
    if (inputValue == ""){
      startShake();
    }
    else{
      navigation.navigate("Mode");
      
    }
  };  

  const Join = () => {
    if (inputValue == ""){
      startShake();
    }
    else{
      console.log("C'est bon");
    }
  };  

 
  return (
    <View>
      <Animated.View style = {{ transform: [{translateX: shakeAnim}] }}>
        <TextInput style={styles.input} placeholder="Prénom + Nom" onChangeText={(text) => setInputValue(text)}/>
      </Animated.View>   
      <MainBouton titre="Créer une partie" onPress={Create}  />
      <MainBouton titre="Rejoindre une partie" onPress={Join}/>
    </View>
  );
}



const MainBouton = props => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress} activeOpacity={0.5}>
      <Text style={styles.buttonText}>{props.titre}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create ({
  button: {
    backgroundColor: '#264653',
    
    borderRadius: 50,
    width: 300,
    height: 60,
    justifyContent: 'center',
    margin: 20,
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
    
  },
  input: {
    borderRadius: 50, 
    borderWidth: 1,    
    borderColor: '#ccc',
    backgroundColor: "white",
    width: 300,
    height: 60,
    fontSize: 25,
    textAlign: 'center',
    margin: 20,
  },
});

export default MainMenu;






















