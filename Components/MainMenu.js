import React, { Component, useRef, useState, useEffect  } from 'react';
import {StyleSheet, View, TouchableOpacity, Text, TextInput, Animated } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import {  modifySurname, setHostTrue } from '../Store/Reducer/userSlice'
import {useUserAPI} from '../Hooks/hooks'




const MainMenu =  (props) => {

  const {changeSurnameAPI, createUser} = useUserAPI();

  const userId = useSelector((state) => state.user.userId);
  const userSurname = useSelector((state) => state.user.surname);
  const dispatch = useDispatch();
  

  //const [inputValue, setInputValue] = useState('');
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
    if (userSurname == ""){
      startShake();
    }
    else{
      if(!userId){
        createUser();
      }
      else{
        console.log(userId);
        changeSurnameAPI();
      }
      dispatch(setHostTrue());
      props.navigation.navigate("Mode");
      
    }
  };  

  const Join = () => {
    if (userSurname == ""){
      startShake();
    }
    else{
      if(!userId){
        createUser();
      }
      else{
        console.log(userId);
        changeSurnameAPI();
      }
      props.navigation.navigate("Join");
      
    }
  };  

  

 
  return (
    <View>
      <Animated.View style = {{ transform: [{translateX: shakeAnim}] }}>
        <TextInput style={styles.input} placeholder="Ton prénom" value={userSurname} onChangeText={(text) => dispatch(modifySurname(text))}/>
      </Animated.View>   
      <MainBouton titre="Créer une partie" onPress={Create} color = {props.color} />
      <MainBouton titre="Rejoindre une partie" onPress={Join} color = {props.color}/>
    </View>
  );
}



const MainBouton = props => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: props.color }]} onPress={props.onPress} activeOpacity={0.5}>
      <Text style={styles.buttonText}>{props.titre}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create ({
  button: {
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






















