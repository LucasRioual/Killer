import React, { Component, useRef, useState, useEffect  } from 'react';
import {StyleSheet, View, TouchableOpacity, Text, TextInput, Animated } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { modifyId, modifySurname } from '../Store/Reducer/userSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';




const MainMenu =  (props) => {

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

 const saveUserId = async (userToSave) => {
  try {
    await AsyncStorage.setItem('userId', userToSave);
    console.log('Identifiant sauvegardé avec succès.');
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de l\'identifiant :', error);
  }
};

 const createUser = () => {
  
  fetch('http://192.168.0.11:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Ajoutez d'autres en-têtes si nécessaire
      },
      body: JSON.stringify({
        surname: userSurname,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Réponse de l\'API :', data.userId);
      //Sauvegarde id dans asyncStorage
      dispatch(modifyId(data.userId));
      saveUserId(data.userId);


    })
    .catch((error) => {
      console.error('Erreur lors de la requête POST :', error);
    });

 }

 const changeSurnameAPI = () => {
  fetch(`http://192.168.0.11:3000/api/users/surname/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Ajoutez d'autres en-têtes si nécessaire
      },
      body: JSON.stringify({
        surname: userSurname,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Réponse de l\'API :', data);
     
    })
    .catch((error) => {
      console.error('Erreur lors de la requête POST :', error);
    });

 }

 

  const Create = () => {
    if (userSurname == ""){
      startShake();
    }
    else{
      if(!userId){
        console.log('test');
        createUser();
      }
      else{
        console.log(userId);
        changeSurnameAPI();
      }
      props.navigation.navigate("Mode");
      
    }
  };  

  const Join = () => {
    if (userSurname == ""){
      startShake();
    }
    else{
      props.navigation.navigate("Join");
    }
  };  

  useEffect(() => {
    console.log(userSurname)
    
  }, [userSurname]);

 
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






















