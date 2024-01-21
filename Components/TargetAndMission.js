import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const TargetAndMission = (props) => {


    return (
        <View>
            <View style={styles.mainContainer}>
              <Text style={styles.TextTitre}>Cible</Text>
              <View style={styles.targetContainer}>
                <Text style={styles.TextTarget}>{props.target}</Text>
              </View>
            </View>
            <View style={styles.mainContainer}>
              <Text style={styles.TextTitre}>Mission</Text>
              <View style={styles.targetContainer}>
                <Text style={styles.TextMission}>{props.mission}</Text>
              </View>
              <Text style={styles.TextMissionRestante}>
                Tu peux encore changer
                <Text style={{ fontWeight: 'bold', color: '#FFF'  }}> 3 fois </Text>
                de mission
              </Text>
            </View>

        </View>  
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 20,
        alignItems:'center',
        maxWidth: '90%',
    
      },
      TextTitre: {
        fontSize: 46,
        fontFamily: 'LuckiestGuy',
        color: 'white',
      },
      targetContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 10,
        borderColor: '#F0122D',
        borderWidth: 2,
        borderRadius: 10,
        
        
      },
      TextTarget: {
        color: 'white',
        textAlign: 'center',
        fontSize: 35,
        fontFamily: 'Sen',
      },
      TextMission: {
        color: 'white',
        textAlign: 'center',
        fontSize: 25,
        fontFamily: 'Sen',
      },
      TextMissionRestante: {
        color: 'gray',
        fontSize: 15,
        fontFamily: 'Sen',
        marginTop: 10,
      },
    
});

export default TargetAndMission;
