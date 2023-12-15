import React, {  useEffect, useState, useCallback } from 'react';
import { Text, View, StyleSheet, } from 'react-native';
import MainMenu from '../Components/MainMenu';
import ImageNuit from '../Components/ImageNuit';
import Footer from '../Components/Footer';
import PopUpRegle from '../Components/PopUpRegle';
import PopUpJoin from '../Components/PopUpJoin';
import PopUpSettings from '../Components/PopUpSettings';
import { useSelector, useDispatch } from 'react-redux';
import { dark, light } from '../Store/Reducer/colorSlice';
import { modifyId, setHostFalse} from '../Store/Reducer/userSlice';
import {useUserAPI} from '../Hooks/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

/* //...

// Supposons que vous avez obtenu un userId que vous souhaitez sauvegarder


// Enregistrez l'identifiant dans AsyncStorage
const saveUserId = async () => {
  try {
    await AsyncStorage.setItem('userId', userId);
    console.log('Identifiant sauvegardé avec succès.');
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de l\'identifiant :', error);
  }
};

// Chargez l'identifiant depuis AsyncStorage
const loadUserId = async () => {
  try {
    const storedUserId = await AsyncStorage.getItem('userId');
    if (storedUserId !== null) {
      console.log('Identifiant chargé avec succès :', storedUserId);
      // Faites quelque chose avec l'identifiant chargé
    } else {
      console.log('Aucun identifiant trouvé dans le stockage.');
    }
  } catch (error) {
    console.error('Erreur lors du chargement de l\'identifiant :', error);
  }
};

//...

// Appel aux fonctions de sauvegarde et de chargement
saveUserId();
loadUserId(); */


const HomeScreen = ({navigation}) => {

  const backColor = useSelector((state) => state.color.backColor);
  const MainColor = useSelector((state) => state.color.mainColor);
  const txtColor = useSelector((state) => state.color.txtColor);
  const titreColor = useSelector((state) => state.color.titreColor);
  const svgData = useSelector((state) => state.color.svgData);

  const {getSurname} = useUserAPI();
 



  const dispatch = useDispatch();

  const [isPopUpJoinVisible, setIsPopUpJoinVisible] = useState(false);
  const [isPopUpSettingsVisible, setIsPopUpSettingsVisible] = useState(false);
  const [isPopUpRegleVisible, setPopUpRegleVisible] = useState(false);
  
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
        getSurname(storedUserId);

      } else {
        console.log('Aucun identifiant trouvé dans le stockage.');
      }
    } catch (error) {
      console.error('Erreur lors du chargement de l\'identifiant :', error);
    }
  };

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

      // Fonction de nettoyage lorsque l'écran perd le focus (si nécessaire)
      return () => {
        // Mettez ici le nettoyage ou des actions supplémentaires si nécessaire
      };
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
        <MainMenu navigation={navigation} clickJoin = {openPopUpJoin} color = {MainColor}/>
      </View>
      <PopUpJoin visible={isPopUpJoinVisible} exit={closePopUpJoin}/> 

      <View style={styles.View4}>
        <Footer clickRegle = {openPopUpRegle}  clickSettings = {openPopUpSettings} color = {MainColor} txtcolor = {txtColor}/>
      </View> 
      <PopUpRegle visible={isPopUpRegleVisible} exit={closePopUpRegle}/>  
      <PopUpSettings visible={isPopUpSettingsVisible} exit={closePopUpSettings}/>  
     
      
             
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


