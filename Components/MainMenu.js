import React, { useState } from 'react';
import {StyleSheet, View, TouchableOpacity, Text, TextInput, Animated, ActivityIndicator} from 'react-native';
import { useDispatch, useSelector} from 'react-redux';
import { setIsHost, setUserId, setUserName } from '../Store/Reducer/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createUser, modifyUserName } from '../Hooks/hooks';





const MainMenu =  (props) => {

  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);



 

  const Create =  async() => { // Si userId est null, on créer un nouvel utilisateur, sinon on le redirige vers les paramètres
    if (!props.userName){
      props.shakeAnim(props.animRef);
    }
    else{
      console.log(userId);
      setIsLoading(true);
      AsyncStorage.setItem('userName', props.userName);
      dispatch(setUserName(props.userName));
      dispatch(setIsHost(true));
      if(userId === null){
        const userIdResponse = await createUser(props.userName);
        dispatch(setUserId(userIdResponse));
        AsyncStorage.setItem('userId', userIdResponse);
      }
      else{
        await modifyUserName(userId, props.userName);
      }
      setIsLoading(false);
      props.navigation.navigate("Settings");
      
      
      
    }
  };  

  const Join =  async () => { // La même chose que pour create
    if (!props.userName){
      props.shakeAnim(props.animRef);
    }
    else{
      console.log(userId);
      setIsLoading(true);
      AsyncStorage.setItem('userName', props.userName);
      dispatch(setIsHost(false));
      dispatch(setUserName(props.userName));
      
      if(userId === null){
        console.log('null rejoint la game');
        const userIdResponse = await createUser(props.userName);
        dispatch(setUserId(userIdResponse));
        AsyncStorage.setItem('userId', userIdResponse);
      }
      else{
        await modifyUserName(userId, props.userName);
      }
      setIsLoading(false);
      props.clickJoin();
      
      
      
    }
  };  

  const onSurnameChange = (text) => {
    props.setUserName(text);
    props.setMessageError('');
  }

  const MainBouton = props => {
    return (
      <TouchableOpacity  style={styles.button} onPress={props.onPress} activeOpacity={0.5}>
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.buttonText}>{props.titre}</Text>
        )}
      </TouchableOpacity>
    );
  };


  

 
  return (
    <View>
      <View style = {styles.inputContainer}>
        <Text style = {styles.txtError}>{props.labelError}</Text>
        <Animated.View style = {{ transform: [{translateX: props.animRef}] }}>
          <TextInput style={styles.input} placeholder="Ton prénom" value={props.userName} onChangeText={(text) => onSurnameChange(text)}/>
        </Animated.View> 

      </View>
        
      <MainBouton titre="Créer une partie" onPress={Create} color = {props.color} />
      <MainBouton titre="Rejoindre une partie" onPress = {Join} color = {props.color}/>


    </View>
  );
}





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






















