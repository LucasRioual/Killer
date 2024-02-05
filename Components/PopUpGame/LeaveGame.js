// PopUp.js
import React, { useEffect, useState } from 'react';
import { View, Text, Modal, StyleSheet, ScrollView, TouchableOpacity, TextInput, Switch, Animated} from 'react-native';
import { setLeaveGame } from '../../Store/Reducer/gameSlice';
import { useDispatch, useSelector } from 'react-redux';


const LeaveGame = () => {

    const [isVisible, setIsVisible] = useState(false);
    const isLeaveGame = useSelector((state) => state.game.isLeaveGame);
    const dispatch = useDispatch();

    

    useEffect(() => {
        console.log('leaveGame', isLeaveGame);

      if(isLeaveGame){
        setIsVisible(true);
        dispatch(setLeaveGame(false));
        
      }

      }, [isLeaveGame]);
    

    
      const handleCancel = () => {
        setIsVisible(false);
      };

  return (
    <Modal visible={isVisible} transparent onRequestClose={handleCancel}>
      <TouchableOpacity style= {styles.View} onPress={handleCancel} activeOpacity={1} >
        <View style={styles.Container} >                                    
            <TouchableOpacity  activeOpacity={1}>
              <Text style={styles.Titre}>Ta cible à quitter la partie</Text>
              <Text style={styles.Description}>Tu reçois donc sa cible et sa mission, bonne chance ! </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleCancel} activeOpacity={0.5}>
                  <Text style={styles.buttonText}>OK</Text>
                </TouchableOpacity>
            </View>
            </TouchableOpacity>      
        </View>
      </TouchableOpacity>
    </Modal>
  );
};




const styles = StyleSheet.create({
  View: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    
  },
  Container: {
    backgroundColor: '#FFF',
    width: '85%',
    borderRadius: 15,  
    padding: 20,
    
  },
  
  Titre: {
    fontFamily: 'LuckiestGuy',
    textAlign: 'center',
    fontSize: 26,
    
    marginBottom: 5, 
  },
    Description: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Sen',
    marginTop: 20,
    marginBottom: 5,
    },
    buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 10,
    
    },
    button: {
      borderRadius: 50,
      width: 110,
      backgroundColor:'#F0122D',
      height: 50,
      justifyContent: 'center',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      fontSize: 18,
     
      
    },
  

  
});



export default LeaveGame;
