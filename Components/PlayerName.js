import React from 'react';

import {StyleSheet, View, Text } from 'react-native';


const PlayerName = (props) =>{
    
    return (
        <View style={styles.ViewPlayer}>
            <View style={styles.NameContainer}>
                <Text style={styles.Name}>{props.label}</Text>
            </View>
        </View>
      
    );
  }
  
  
  const styles = StyleSheet.create({
    
      NameContainer: {
        marginHorizontal:4,
        marginVertical:10,
        paddingHorizontal:15,
        paddingVertical:10,
        backgroundColor:'#264653',
        borderRadius: 50,
      },
      Name: {
        fontSize: 20,
        fontFamily: 'Sen',
        color: 'white',
      },
  });
  
export default PlayerName;
  
  
  
  
  
  