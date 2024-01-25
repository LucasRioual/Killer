// PopUp.js
import React, { useEffect, useState } from 'react';
import { View, Text, Modal, StyleSheet, ScrollView, TouchableOpacity, TextInput, Switch, Animated} from 'react-native';
import socket from '../../Socket/socketManager';
import { setKilledBy } from '../../Store/Reducer/gameSlice';
import { useDispatch, useSelector } from 'react-redux';


const ConfirmKilled = (props) => {

    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState('');
    const killedBy = useSelector((state) => state.game.killedBy);
    const dispatch = useDispatch();

    useEffect(() => {
        if (killedBy !== null) {
          setMessage('Tu as été tué par ' + killedBy + ' ?');
          setIsVisible(true);
        }
      }, [killedBy]);

      const handleConfirm = () => {
        console.log('Tu est mort');
        socket.emit("killed", props.gameCode);
        setIsVisible(false);
        dispatch(setKilledBy(null));
        props.navigation.navigate('EndGame', {isWinner: false});
    
      };
    
      const handleCancel = () => {
        dispatch(setKilledBy(null));
        setIsVisible(false);
        socket.emit("notKilled", props.gameCode);
        //Il faut dire au tueur que la cible a refusé
      };



  

  return (
    <Modal visible={isVisible} transparent onRequestClose={handleCancel}>
      <TouchableOpacity style= {styles.View} onPress={handleCancel} activeOpacity={1} >
        <View style={styles.Container} >                                    
            <TouchableOpacity  activeOpacity={1}>
              <Text style={styles.Titre}>{message}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button,{backgroundColor:'#061624'}]} onPress={handleCancel} activeOpacity={0.5}>
                  <Text style={styles.buttonText}>ANNULER</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button,{backgroundColor:'#F0122D'}]} onPress={handleConfirm} activeOpacity={0.5}>
                  <Text style={styles.buttonText}>OUI</Text>
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
    buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 10,
    
    },
    button: {
      borderRadius: 50,
      width: 110,
      
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



export default ConfirmKilled;
