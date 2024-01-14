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
      <TouchableOpacity style={[styles.Svg, {display: props.visible ? 'none' : 'flex'}]} onPress={props.onClickBack} >
        <SvgRetour/>
      </TouchableOpacity>
      <View style = {styles.ViewTitre}>
        <Text style={[styles.Titre, { fontSize: dynamicFontSize }]}>{props.titre}</Text>
      </View>
      <TouchableOpacity style={[styles.SvgMenu, { display: props.visible ? 'flex' : 'none' }]}  onPress={props.onClick}>
        {/* <Svg width="48" height="48" viewBox="0 0 24 24">
          <Path fill={'white'} d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
        </Svg> */}
        <Svg width="25" height="25" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Path d="M6.13322 1.56663L18.9999 14.4333L31.7999 1.63329C32.0826 1.33235 32.4232 1.09161 32.8013 0.9255C33.1793 0.759392 33.587 0.67134 33.9999 0.666626C34.8839 0.666626 35.7318 1.01782 36.3569 1.64294C36.982 2.26806 37.3332 3.1159 37.3332 3.99996C37.341 4.40863 37.2652 4.81458 37.1104 5.1929C36.9556 5.57121 36.7252 5.91391 36.4332 6.19996L23.4666 19L36.4332 31.9666C36.9826 32.5041 37.3048 33.2319 37.3332 34C37.3332 34.884 36.982 35.7319 36.3569 36.357C35.7318 36.9821 34.8839 37.3333 33.9999 37.3333C33.5751 37.3509 33.1512 37.28 32.7553 37.1251C32.3593 36.9701 31.9999 36.7346 31.6999 36.4333L18.9999 23.5666L6.16656 36.4C5.88491 36.6909 5.54844 36.9231 5.17656 37.0833C4.80469 37.2435 4.40477 37.3285 3.99989 37.3333C3.11584 37.3333 2.26799 36.9821 1.64287 36.357C1.01775 35.7319 0.666558 34.884 0.666558 34C0.658786 33.5913 0.734609 33.1853 0.889374 32.807C1.04414 32.4287 1.27458 32.086 1.56656 31.8L14.5332 19L1.56656 6.03329C1.01717 5.49582 0.695023 4.768 0.666558 3.99996C0.666558 3.1159 1.01775 2.26806 1.64287 1.64294C2.26799 1.01782 3.11584 0.666626 3.99989 0.666626C4.79989 0.676626 5.56656 0.999959 6.13322 1.56663Z" fill="white"/>
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



