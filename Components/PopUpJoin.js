// PopUp.js
import React, { useRef, useState } from 'react';
import { View, Text, Modal, StyleSheet, ScrollView, TouchableOpacity, TextInput, Switch} from 'react-native';
import { useSelector, useDispatch} from 'react-redux';
import { modifyCode } from '../Store/Reducer/gameSlice';
import { useNavigation } from '@react-navigation/native';




const PopUpJoin = props => {

  const gameCode = useSelector((state) => state.game.gameCode);
  const [isNonDrinker, setIsNonDrinker] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleJoinGame = () => {
    if(!gameCode){
      console.log('Il n a pas de code');
      }
    else{
      navigation.navigate('Salon');
    }
   };
   // Fonction pour gérer la soumission du formulaire
      
    const handleToggleSwitch = (newValue) => {
      setIsNonDrinker(newValue); // Met à jour l'état avec la nouvelle valeur
      console.log("Is Non-Drinker:", newValue); // Affiche la nouvelle valeur dans la console
    };
    // Cette fonction est appelée chaque fois que le Switch est activé/désactivé
    const toggleSwitch = () => setIsSwitchEnabled(previousState => !previousState);
    // Naviguer vers l'écran de jeu ou afficher une erreur, etc.




  return (
    <Modal visible={props.visible} transparent onRequestClose={props.exit}>
      <TouchableOpacity style= {styles.View} onPress={props.exit} activeOpacity={1} >

        <View style={styles.Container}>                                    
          <ScrollView style={styles.Scroll}>
            <TouchableOpacity activeOpacity={1}>
              <Text style={styles.Titre}>Rejoindre une partie</Text>
              <View style={styles.TextContainer}>
                {/* Champ de saisie pour le code de la partie */}
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => {dispatch(modifyCode(text))}} // Met à jour le gameCode dans l'état lorsque l'utilisateur tape
                  value={gameCode} // Affiche la valeur actuelle de gameCode
                  placeholder="Code de la partie" // Texte d'indication dans le champ de saisie
                  // Type de clavier pour les nombres
                />

                {/* Interrupteur pour l'option non-buveur */}
                <View style={styles.switchContainer}>
                  <Text style={styles.TextTitre}>Non-buveur ?</Text>
                  <Switch
                      trackColor={{ false: 'red', true: 'green' }}
                      thumbColor={isNonDrinker? 'green' : 'red'}
                      onValueChange={handleToggleSwitch} // Appelle handleToggleSwitch chaque fois que le Switch est basculé
                      value={isNonDrinker} // Utilise l'état pour déterminer si le Switch est activé ou non
                    />
                </View>

                {/* Bouton pour soumettre le formulaire et rejoindre le jeu */}
                <TouchableOpacity style={styles.button} onPress={handleJoinGame}>
                  <Text style={styles.buttonText}>GO</Text>
                </TouchableOpacity>

              </View>
                   

            </TouchableOpacity>
          </ScrollView>       
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
  Scroll: {
    padding: 20,
  },
  Container: {
    backgroundColor: '#FFF',
    width: 350,
    height: 400,
    borderRadius: 15,  
  },
  
  Titre: {
    fontFamily: 'LuckiestGuy',
    fontSize: 30,
    textAlign: 'center',
    color: '#F0122D'
    
  },
  TextContainer: {
    marginTop: 20,
    height: 300,

    
  },

  input: {
    // Style pour le champ de saisie
    height: 50,
    //width: '80%',
    margin: 25,
    borderWidth: 1,
    padding: 10,
    paddingHorizontal:40,
    paddingVertical:10,
    backgroundColor: '#fff', // Couleur de fond du champ de saisie
    borderRadius: 30,
  },
  switchContainer: {
    // Style pour le conteneur de l'interrupteur
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  TextTitre: {
    fontSize: 22,
    fontFamily: 'Sen',
  },
  button: {
    backgroundColor:'#F0122D',
    borderRadius: 50,
    paddingHorizontal:40,
    paddingVertical:10,
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
    fontSize: 35,
    fontFamily: 'LuckiestGuy',
    
  },
});



export default PopUpJoin;
