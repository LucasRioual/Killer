// PopUp.js
import React from 'react';
import { View, Text, Modal, StyleSheet, ScrollView, TouchableOpacity, TextInput, Switch, Animated} from 'react-native';


const PopUpGame = ({isVisible, message, accept, refuse, isChoice, setIsVisible}) => { 

    
    //const killedBy = useSelector((state) => state.game.killedBy);

    /* useEffect(() => {
        if (killedBy !== null) {
          setMessage('Tu as été tué par ' + killedBy + ' ?');
          dispatch(setKilledBy(null));
          setIsVisible(true);
        }
      }, [killedBy]); */

      const handleConfirm = () => {
        //socket.emit("killed", props.gameCode);
        setIsVisible(false);
        accept();
        //props.navigation.navigate('EndGame', {isWinner: false});
    
      };
    
      const handleCancel = () => {
        setIsVisible(false);
        refuse();
        //socket.emit("notKilled", props.gameCode);
        //Il faut dire au tueur que la cible a refusé
      };



  

  return (
    <Modal  visible={isVisible} transparent onRequestClose={handleCancel}>
        <View style={styles.View} >
            <View style={styles.Container} >                                    
                
                <Text style={styles.Titre}>{message}</Text>

                {isChoice ?(
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button,{backgroundColor:'#061624'}]} onPress={handleCancel} activeOpacity={0.5}>
                        <Text style={styles.buttonText}>ANNULER</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button,{backgroundColor:'#F0122D'}]} onPress={handleConfirm} activeOpacity={0.5}>
                        <Text style={styles.buttonText}>OUI</Text>
                        </TouchableOpacity>
                    </View>

                ):(
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button, {backgroundColor: '#F0122D' }]} onPress={handleCancel} activeOpacity={0.5}>
                            <Text style={styles.buttonText}>OK</Text>
                        </TouchableOpacity>
                    </View>

                )}
                
                
            </View>

        </View>
        
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



export default PopUpGame;
