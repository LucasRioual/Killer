import React from 'react';

import {StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import IconClassique from '../assets/svg/svgClassique'



const ModeItem = (props) => {

  const onPress = () => {
  
      props.navigation.navigate("Settings");
      
  
  };  
  
  return (

    <TouchableOpacity style={styles.button}  activeOpacity={0.5} onPress={onPress}>
          <View style={styles.leftContainer}>
            <View style={styles.imgContainer}>
              <IconClassique/>
            </View>
          </View>
          
          <View style={styles.rightContainer}>
            <View style={styles.titreContainer}>
              <Text style={styles.titre}>{props.titre}</Text>
            </View>
            <View style={styles.txtContainer}>
              <Text style={styles.description}>{props.description}</Text>
            </View>

          </View>
          
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create ({
    button: {
      flexDirection: 'row',
      backgroundColor:'#264653',
      borderRadius: 20,
      width: 350,
      height: 150,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      marginTop: 30,
      
    },
    leftContainer: {
      justifyContent:'center',
      padding: 10,
      paddingRight:0,
    },
    imgContainer: {
      backgroundColor: '#FFEBD7',
      aspectRatio:1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      flex:1,
      padding:10,
      
    },
    cible: {
     
    },
    
    rightContainer: {
      flex: 1,
      padding: 10,
      
      
      
    },
    titreContainer: {
      flex: 3,
      justifyContent:'center',
    
    },
    titre: {
      textAlign: 'center',
      fontSize: 20,
      fontFamily: 'LuckiestGuy',
      color: '#F0122D',
    },
    description: {
      
      textAlign: 'justify',
      fontSize: 12,
      fontFamily: 'Sen',
      color: "#FFF",
    },
    txtContainer: {
      flex:5,  
      justifyContent: 'center',
    }
    
  });





export default ModeItem;



