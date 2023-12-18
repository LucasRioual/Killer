// PopUp.js
import React, { useRef, useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity,} from 'react-native';




const PopUpKilled = (props) => {
  
  //const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [option, setOption] = useState('non'); // 'oui' ou 'non'

  const handlePressKilled = () => {
    // Afficher le modal de confirmation lorsque l'utilisateur appuie sur 'Kill'
    setIsConfirmModalVisible(true);
  };

  const confirmKill = () => {
    // Logique pour confirmer le "Kill"
    console.log('Kill confirmé');
    setOption('oui');
    setIsConfirmModalVisible(false);
    // Ajoutez ici toute autre logique nécessaire après la confirmation
  };

  const cancelKill = () => {
    // Logique pour annuler le "Kill"
    console.log('Kill annulé');
    setOption('non');
    setIsConfirmModalVisible(false);
    // Ajoutez ici toute autre logique nécessaire après l'annulation
  };

  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={props.exit}
      >
      <TouchableOpacity style= {styles.View} onPress={props.exit} activeOpacity={1} >

        <View style={styles.Container}>                                    
          <TouchableOpacity activeOpacity={1}>
            <Text style={styles.Titre}>Confirmation du Kill</Text>
            <View style={styles.TextContainer}>
              <Text style={styles.TextTitre}>Tu confirmes ta mort ?</Text>
            </View>
            <View style={styles. switchContainer}>
                <TouchableOpacity style={styles.button} onPress={confirmKill}>
                  <Text style={styles.buttonText}>Oui</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={cancelKill}>
                  <Text style={styles.buttonText}>Non</Text>
                </TouchableOpacity>
            </View>
          </TouchableOpacity>
         {/* Bouton KILL */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handlePressKilled}>
              <Text style={styles.buttonText}>Confirmer</Text>
            </TouchableOpacity>
          </View>
          
       
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
    width: 350,
    height: 400,
    borderRadius: 15,
    
  },
  ImageBackground: {
    backgroundColor:'#F0122D',
    width: 31,
    height: 31,
    borderRadius: 5,
  },
  Titre: {
    fontFamily: 'LuckiestGuy',
    fontSize: 28,
    textAlign: 'center',
    color: '#F0122D'   
  },
  TextTitre: {
    fontSize: 22,
    fontFamily: 'Sen',
  },
  TextContainer: {
    marginTop: 10, 
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  selectedOption: {
    backgroundColor: '#007AFF',
  },
  optionText: {
    color: 'white',
  },
  button: {
    backgroundColor: '#F0122D',
    borderRadius: 50,
    marginBottom: 40,
    alignSelf: 'center',
    width: 120,
    height: 50,
    justifyContent: 'center',
    
  },
  buttonText: {
    fontFamily: 'LuckiestGuy',
    color: 'white',
    textAlign: 'center',
    fontSize: 28,
    
  },
});



export default PopUpKilled;
