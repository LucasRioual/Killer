import React, {  useState,  } from 'react';
import { Text, View, StyleSheet, } from 'react-native';
import MainMenu from '../Components/MainMenu';
import ImageNuit from '../Components/ImageNuit';
import Footer from '../Components/Footer';
import PopUp from '../Components/PopUpRegle';
import { useSelector, useDispatch } from 'react-redux'
import { dark, light } from '../Store/Reducer/colorSlice'

const HomeScreen = ({navigation}) => {

  const backColor = useSelector((state) => state.color.backColor);
  const MainColor = useSelector((state) => state.color.mainColor);
  const txtColor = useSelector((state) => state.color.txtColor);
  const titreColor = useSelector((state) => state.color.titreColor);
  const svgData = useSelector((state) => state.color.svgData);
  const dispatch = useDispatch();

  const [isPopUpVisible, setPopUpVisible] = useState(false);
  const openPopUp = () => {
    setPopUpVisible(true);
  };
  const closePopUp = () => {
    setPopUpVisible(false);
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
  
  return (
    
    <View style={[styles.ViewMain, { backgroundColor: backColor }]}>
      <View style={styles.View1}>
      <ImageNuit onClick = {changeColor} fill = {txtColor} d = {svgData}/>
      </View>
      <View style={styles.View2}>
        <Text style={[styles.Titre, { color: titreColor }]}>KILLER</Text>
      </View>
      <View style={styles.View3}>
        <MainMenu navigation={navigation} color = {MainColor}/>
      </View>
      <View style={styles.View4}>
        <Footer clickRegle = {openPopUp} color = {MainColor} txtcolor = {txtColor}/>
      </View> 
      <PopUp visible={isPopUpVisible} exit={closePopUp}/>          
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


