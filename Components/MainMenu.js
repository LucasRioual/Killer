import React, { Component, useRef, useState, useEffect  } from 'react';
import {StyleSheet, View, TouchableOpacity, Text, TextInput, Animated } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import {  modifySurname, setHostTrue, modifyId} from '../Store/Reducer/userSlice'
import { createUser, changeSurnameAPI } from '../Hooks/hooks';





const MainMenu =  (props) => {

  //const {changeSurnameAPI, createUser} = useUserAPI();

  const userId = useSelector((state) => state.user.userId);
  const userSurname = useSelector((state) => state.user.surname);
  
  const dispatch = useDispatch();
  

  //const [inputValue, setInputValue] = useState('');
  /* const shakeAnim = useRef(new Animated.Value(0)).current;

  startShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 20, duration: 70, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -20, duration: 70, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 20, duration: 70, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 70, useNativeDriver: true })
    ]).start();
 } */


 

  const Create = async () => {
    if (!userSurname){
      props.shakeAnim(props.animRef);
    }
    else{
      if(!userId){
        console.log('createUser');  
        const id = await createUser(userSurname);
        dispatch(modifyId(id));
      }
      else{
        changeSurnameAPI(userId, userSurname);
      }
      dispatch(setHostTrue());
      props.navigation.navigate("Mode");
      
    }
  };  

  const Join = async () => {
    if (!userSurname){
      props.shakeAnim(props.animRef);
    }
    else{
      if(!userId){
        const id = await createUser(userSurname);
        dispatch(modifyId(id));
      }
      else{
        changeSurnameAPI(userId, userSurname);
      }
      props.clickJoin();
      
    }
  };  

  const onSurnameChange = (text) => {
    dispatch(modifySurname(text));
    props.setMessageError('');
  }


  

 
  return (
    <View>
      <View style = {styles.inputContainer}>
        <Text style = {styles.txtError}>{props.labelError}</Text>
        <Animated.View style = {{ transform: [{translateX: props.animRef}] }}>
          <TextInput style={styles.input} placeholder="Ton prénom" value={userSurname} onChangeText={(text) => onSurnameChange(text)}/>
        </Animated.View> 

      </View>
        
      <MainBouton titre="Créer une partie" onPress={Create} color = {props.color} />
      <MainBouton titre="Rejoindre une partie" onPress = {Join} color = {props.color}/>


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
  txtError: {
    color: '#F0122D',
    marginLeft:20,
    fontSize: 14,
    marginBottom: 2,
  },
  inputContainer: {
    
    margin: 20,
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
    
  },
});

export default MainMenu;






















