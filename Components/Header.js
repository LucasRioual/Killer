import React from 'react';
import SvgRetour from '../assets/svg/SvgRetour';
import {StyleSheet, View, Text, TouchableOpacity } from 'react-native';



/* onPress={() => props.navigation.goBack()} */

const Header = (props) => {

  if (props.titre.length < 7){
    var dynamicFontSize = 46;
  }
  else{
    var dynamicFontSize = 30;
  }

  
  return (
    <View style={styles.View}>
      <View style={styles.ViewBorder}></View>
      <TouchableOpacity style={styles.Svg} onPress={() => props.navigation.goBack()} >
        <SvgRetour/>
      </TouchableOpacity>
      <View style = {styles.ViewTitre}>
        <Text style={[styles.Titre, { fontSize: dynamicFontSize }]}>{props.titre}</Text>
      </View>
      
     
      
    </View>
  );
}


const styles = StyleSheet.create({
  View: {

    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',

  },
  Svg: {
    position: 'absolute',
    left: 30,
    top: 20,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    
   
  },
  ViewBorder: {
    borderBottomColor: '#F0122D',
    borderBottomWidth: 3,
    position: 'absolute',
    bottom: 0,
    width: '80%',
    
    
  },
  ViewTitre: {

    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Titre: {
    textAlign: 'center',
    
    fontFamily: 'LuckiestGuy',
    color: '#FFF',  
 
  },
});



export default Header;



