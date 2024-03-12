import React, {  useEffect, useState, useCallback, useRef } from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';
import MainMenu from '../Components/MainMenu';
import Footer from '../Components/Footer';
import PopUpRegle from '../Components/PopUpRegle';
import PopUpJoin from '../Components/PopUpJoin';
import PopUpSettings from '../Components/PopUpSettings';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserId } from '../Store/Reducer/userSlice';
import { setGameCode } from '../Store/Reducer/gameSlice';
import { getUserGameCode } from '../Hooks/hooks';






const HomeScreen = ({navigation}) => {


  const [userName, setUserName] = useState('');


  const shakeAnimSurname = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const [isPopUpJoinVisible, setIsPopUpJoinVisible] = useState(false);
  const [isPopUpSettingsVisible, setIsPopUpSettingsVisible] = useState(false);
  const [isPopUpRegleVisible, setPopUpRegleVisible] = useState(false);
  const [messageError, setMessageError] = useState(''); 

  
  const openPopUpRegle = () => {
    setPopUpRegleVisible(true);
  };
  const closePopUpRegle = () => {
    setPopUpRegleVisible(false);
  };  
  //PopUp pour rejoindre une partie
  const openPopUpJoin = () => {
    setIsPopUpJoinVisible(true);
    console.log(isPopUpJoinVisible);
  };
  const closePopUpJoin = () => {
    setIsPopUpJoinVisible(false);
  };  
  //PopUp pour les paramètres de l'app
  const openPopUpSettings = () => {
    setIsPopUpSettingsVisible(true);
  };
  const closePopUpSettings = () => {
    setIsPopUpSettingsVisible(false);
  }; 




  const loadUserIdAndSurname = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('userId');
      const storedUserName = await AsyncStorage.getItem('userName');
      if (storedUserId !== null) {
        console.log('Récupération des données du joueurs : ', storedUserName);
        console.log('Récupération de lid du joueurs : ', storedUserId);
        dispatch(setUserId(storedUserId));
        setUserName(storedUserName);
        return storedUserId;
      } else {
        console.log('Aucun joueur trouvé dans le stockage.');
        return null;
      }
    } catch (error) {
      console.error('Erreur lors du chargement de l\'identifiant :', error);
    }
  };

  

  const startShake = (animRef) => {
    Animated.sequence([
      Animated.timing(animRef, { toValue: 20, duration: 70, useNativeDriver: true }),
      Animated.timing(animRef, { toValue: -20, duration: 70, useNativeDriver: true }),
      Animated.timing(animRef, { toValue: 20, duration: 70, useNativeDriver: true }),
      Animated.timing(animRef, { toValue: 0, duration: 70, useNativeDriver: true })
    ]).start();
 }

 const saveUserIdAndSurname = async () => {
  try {
    await AsyncStorage.setItem('userId', '10');
    console.log('Identifiant sauvegardé avec succès.');
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de l\'identifiant :', error);
  }
};





  useEffect(() => {

    const navigateToGame = async () => {
      const userId = await loadUserIdAndSurname();
      if(userId){
        const [userStatut, gameCode] = await getUserGameCode(userId);
        console.log('gameCode : ', gameCode);
        dispatch(setGameCode(gameCode));
        if(userStatut === 'alive'){
          navigation.navigate('Game');
        }
        else if(userStatut === 'dead'){
          //navigation.navigate('StatPerso');
        }
      }
    }
    navigateToGame();
    //saveUserIdAndSurname();
    //AsyncStorage.removeItem('userId');

  }, []);


  
  
  return (
    
    <View style={styles.ViewMain}>
     
      <View style={styles.View2}>
        <Text style={styles.Titre}>KILLER</Text>
      </View>
      <View style={styles.View3}>
        <MainMenu userName={userName} setUserName={setUserName} navigation={navigation} clickJoin = {openPopUpJoin}  labelError = {messageError} setMessageError = {setMessageError} animRef= {shakeAnimSurname} shakeAnim = {startShake}/>
      </View>
      <PopUpJoin visible={isPopUpJoinVisible} exit={closePopUpJoin}/> 

      <View style={styles.View4}>
        <Footer clickRegle = {openPopUpRegle}  clickSettings = {openPopUpSettings} />
      </View> 
       
      <PopUpRegle visible={isPopUpRegleVisible} exit={closePopUpRegle}/>  
      <PopUpSettings visible={isPopUpSettingsVisible} exit={closePopUpSettings}/>     
      <PopUpJoin visible={isPopUpJoinVisible} exit={closePopUpJoin} setMessageError = {setMessageError} animRef={shakeAnimSurname} shakeAnim = {startShake}/> 
      
             
    </View>
    
    
  );
}

const styles = StyleSheet.create({
  ViewMain: {
    flex: 1, 
    backgroundColor: '#061624',
    
    
  },
  Titre: {
    fontSize: 100,
    fontFamily: 'LuckiestGuy',
    textAlign: 'center', 
    color: 'white',
       
  },
  View1: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  View2: {
    flex: 2,
    justifyContent: 'flex-end',
          
  },
  View3: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    

  },
  View4: {
    flex: 2,   
    justifyContent: 'center',
    alignItems: 'center',   
  },
 
  
});

export default HomeScreen;


