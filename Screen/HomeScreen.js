import React, {  useEffect, useState, useCallback, useRef } from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';
import MainMenu from '../Components/MainMenu';
import ImageNuit from '../Components/ImageNuit';
import Footer from '../Components/Footer';
import PopUpRegle from '../Components/PopUpRegle';
import PopUpJoin from '../Components/PopUpJoin';
import PopUpSettings from '../Components/PopUpSettings';
import { useSelector, useDispatch } from 'react-redux';
import { dark, light } from '../Store/Reducer/colorSlice';
import { modifyId, modifySurname, setHostFalse} from '../Store/Reducer/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import {getSurname} from '../Hooks/hooks';



const HomeScreen = ({navigation}) => {

  const backColor = useSelector((state) => state.color.backColor);
  const MainColor = useSelector((state) => state.color.mainColor);
  const txtColor = useSelector((state) => state.color.txtColor);
  const titreColor = useSelector((state) => state.color.titreColor);
  const svgData = useSelector((state) => state.color.svgData);
  const shakeAnimJoin = useRef(new Animated.Value(0)).current;
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

  const changeColor = () =>{
    if(backColor == '#FFEBD7'){ //Light
      dispatch(dark());
      console.log("ok");
    }
    else{
      dispatch(light());
    }
  }

 

  const loadUserId = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('userId');
      if (storedUserId !== null) {
        console.log('Identifiant chargé avec succès :', storedUserId);
        dispatch(modifyId(storedUserId));
        const surname = await getSurname(storedUserId);
        dispatch(modifySurname(surname));
      } else {
        console.log('Aucun identifiant trouvé dans le stockage.');
      }
    } catch (error) {
      console.error('Erreur lors du chargement de l\'identifiant :', error);
    }
  };

  startShake = (animRef) => {
    Animated.sequence([
      Animated.timing(animRef, { toValue: 20, duration: 70, useNativeDriver: true }),
      Animated.timing(animRef, { toValue: -20, duration: 70, useNativeDriver: true }),
      Animated.timing(animRef, { toValue: 20, duration: 70, useNativeDriver: true }),
      Animated.timing(animRef, { toValue: 0, duration: 70, useNativeDriver: true })
    ]).start();
 }

 /*  const displaySurnameError = (message) => {
    setMessageError(message);
    startShake(shakeAnimSurname);
  } */

  const saveUserId = async (userToSave) => {
    try {
      await AsyncStorage.setItem('userId', userToSave);
      console.log('Identifiant sauvegardé avec succès.');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'identifiant :', error);
    }
  };

  useEffect(() => {
    loadUserId();
    //saveUserId('');
    
  }, []);

  useFocusEffect(
    useCallback(() => {
      // Lorsque l'écran est en focus, définissez le hostFlag sur false
      dispatch(setHostFalse());
    }, [])
  );
  
  return (
    
    <View style={[styles.ViewMain, { backgroundColor: backColor }]}>
      <View style={styles.View1}>
      <ImageNuit onClick = {changeColor} fill = {txtColor} d = {svgData}/>
      </View>
     
      <View style={styles.View2}>
        <Text style={[styles.Titre, { color: titreColor }]}>KILLER</Text>
      </View>
      <View style={styles.View3}>
        
        
        <MainMenu navigation={navigation} clickJoin = {openPopUpJoin} color = {MainColor} labelError = {messageError} setMessageError = {setMessageError} animRef= {shakeAnimSurname} shakeAnim = {startShake}/>
      </View>
      <PopUpJoin visible={isPopUpJoinVisible} exit={closePopUpJoin}/> 

      <View style={styles.View4}>
        <Footer clickRegle = {openPopUpRegle}  clickSettings = {openPopUpSettings} color = {MainColor} txtcolor = {txtColor}/>
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
    
    
  },
  Titre: {
    fontSize: 100,
    fontFamily: 'LuckiestGuy',
    textAlign: 'center', 
       
  },
  View1: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  View2: {
    flex: 2,
    justifyContent: 'center',
          
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


