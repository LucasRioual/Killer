import React, { useEffect, useState } from 'react';
import { View, StyleSheet, } from 'react-native';
import Header from '../Components/Header';





const EndGameScreen = ({navigation}) => {
  


  return (
    <View style={styles.ViewMain}>
      <Header titre={"Tu es mort"} navigation= {navigation} visible = {true} />
      
   </View>
  );
};

const styles = StyleSheet.create({
  ViewMain: {
    flex: 1, 
    backgroundColor: '#061624',
  },
});

export default EndGameScreen;
