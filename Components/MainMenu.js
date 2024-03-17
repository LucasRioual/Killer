import React, { useState, useRef } from 'react';
import {StyleSheet, View, TouchableOpacity, Text, TextInput, Animated, ActivityIndicator} from 'react-native';
import { useDispatch, useSelector} from 'react-redux';
import { setIsHost, setUserId, setUserName } from '../Store/Reducer/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createUser, modifyUserName } from '../Hooks/hooks';





const MainMenu =  (props) => {

  const userId = useSelector((state) => state.user.userId);
  const expoToken = useSelector((state) => state.user.expoToken);
  const dispatch = useDispatch();
  const [isDisable, setIsDisable] = useState(false);


  const handleAction = async (isHost) => {
    if (!props.userName) {
      props.shakeAnim(props.animRef);
    } else {
      setIsDisable(true);
      AsyncStorage.setItem('userName', props.userName);
      dispatch(setUserName(props.userName));
      dispatch(setIsHost(isHost));
      if (userId === null) { // Création de l'utilisateur
        const userIdResponse = await createUser(props.userName, expoToken);
        dispatch(setUserId(userIdResponse));
        AsyncStorage.setItem('userId', userIdResponse);
      } else {
        const userIdResponse = await modifyUserName(userId, props.userName, expoToken);
        dispatch(setUserId(userIdResponse));
        AsyncStorage.setItem('userId', userIdResponse);
      }
      
  
      if (isHost) {
        props.navigation.navigate("Settings");
      } else {
        props.clickJoin();
      }
  
      setIsDisable(false);
    }
  };

  const onSurnameChange = (text) => {
    props.setUserName(text);
    props.setMessageError('');
  }


  return (
    <View>
      <View style = {styles.inputContainer}>
        <Text style = {styles.txtError}>{props.labelError}</Text>
        <Animated.View style = {{ transform: [{translateX: props.animRef}] }}>
          <TextInput style={styles.input} placeholder="Ton prénom" value={props.userName} onChangeText={(text) => onSurnameChange(text)}/>
        </Animated.View> 

      </View>
        
      <MainBouton titre="Créer une partie" onPress={() => handleAction(true)} color = {props.color} isDisable = {isDisable} />
      <MainBouton titre="Rejoindre une partie" onPress = {()=>handleAction(false)} color = {props.color} isDisable = {isDisable}/>


    </View>
  );
}

const MainBouton = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  onPress = async () => {
    setIsLoading(true);
    await props.onPress();
    setIsLoading(false);
  }



  return (
    <TouchableOpacity disabled={props.isDisable}  style={styles.button} onPress={onPress} activeOpacity={0.5}>
      {isLoading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text style={styles.buttonText}>{props.titre}</Text>
      )}
    </TouchableOpacity>
  );
};




const styles = StyleSheet.create ({
  button: {
    backgroundColor: '#F0122D',
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






















