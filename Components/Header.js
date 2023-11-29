import React from 'react';

import {StyleSheet, View, Text, TouchableOpacity } from 'react-native';





const Header = (props) => {
  
  return (
    <View style={styles.View}>
      <View style={styles.ViewBorder}>
        <Text style={styles.Titre}>{props.titre}</Text>
      </View>
      
    </View>
  );
}


const styles = StyleSheet.create({
  View: {
    flex: 1,
    flexDirection: 'row',
    justifyContent:'center',
    
    
  },
  ViewBorder: {

    width:'80%',
    alignItems:'center',
    justifyContent: 'flex-end',
    padding:8,
    borderBottomColor: '#F0122D',
    borderBottomWidth: 3,
    
  },
  Titre: {
    fontSize: 40,
    fontFamily: 'LuckiestGuy',
    color: '#F0122D'
    
,    
  },
});



export default Header;



