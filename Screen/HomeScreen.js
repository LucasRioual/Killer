import React, {  useState,  } from 'react';
import { Text, View, StyleSheet, } from 'react-native';
import MainMenu from '../Components/MainMenu';
import ImageNuit from '../Components/ImageNuit';
import Footer from '../Components/Footer';
import PopUp from '../Components/PopUpRegle';

const HomeScreen = ({navigation}) => {
  const [isPopUpVisible, setPopUpVisible] = useState(false);
  const openPopUp = () => {
    setPopUpVisible(true);
  };
  const closePopUp = () => {
    setPopUpVisible(false);
  };  
  
  return (
    
    <View style={styles.ViewMain}>
      <View style={styles.View1}>
      <ImageNuit/>
      </View>
      <View style={styles.View2}>
        <Text style={styles.Titre}>KILLER</Text>
      </View>
      <View style={styles.View3}>
        <MainMenu navigation={navigation}/>
      </View>
      <View style={styles.View4}>
        <Footer clickRegle = {openPopUp}/>
      </View> 
      <PopUp visible={isPopUpVisible} exit={closePopUp}/>          
    </View>
    
    
  );
}

const styles = StyleSheet.create({
  ViewMain: {
    flex: 1, 
    backgroundColor: '#FFEBD7',
    
  },
  Titre: {
    color: '#F0122D',
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


