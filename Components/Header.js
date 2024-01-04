import React from 'react';
import SvgRetour from '../assets/svg/SvgRetour';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Svg, {Path, Rect} from "react-native-svg"



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
      <View style={[styles.ViewBorder, {borderBottomWidth: props.visible ? 0:3}]}></View>
      <TouchableOpacity style={[styles.Svg, {display: props.visible ? 'none' : 'flex'}]} onPress={() => props.navigation.goBack()} >
        <SvgRetour/>
      </TouchableOpacity>
      <View style = {styles.ViewTitre}>
        <Text style={[styles.Titre, { fontSize: dynamicFontSize }]}>{props.titre}</Text>
      </View>
      <TouchableOpacity style={[styles.SvgMenu, { display: props.visible ? 'flex' : 'none' }]}  onPress={props.onClick}>
        <Svg width="48" height="48" viewBox="0 0 24 24">
          <Path fill={'white'} d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
        </Svg>
    </TouchableOpacity>
      
     
      
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
  SvgMenu: {
    position: 'absolute',
    right: 30,
    top: 20,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    
   
  },
  ViewBorder: {
    borderBottomColor: '#F0122D',
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



