//Khaoula 
import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, TextInput,  Switch} from 'react-native';
import Header from '../Components/Header';
import { useSelector, useDispatch } from 'react-redux'
import { modifyCode } from '../Store/Reducer/gameSlice'



const JoinScreen=({navigation}) => {
  const gameCode = useSelector((state) => state.game.gameCode);

  const dispatch = useDispatch();
  
  const handleJoinGame = () => {
    if(!gameCode){
      console.log('Il n a pas de code');
    }
    else{
      navigation.navigate('Salon');
    }
      
      
      };

  const [isNonDrinker, setIsNonDrinker] = useState(false);

  // Fonction pour gérer la soumission du formulaire
  
  const handleToggleSwitch = (newValue) => {
        setIsNonDrinker(newValue); // Met à jour l'état avec la nouvelle valeur
        console.log("Is Non-Drinker:", newValue); // Affiche la nouvelle valeur dans la console
      };
    // Cette fonction est appelée chaque fois que le Switch est activé/désactivé
  const toggleSwitch = () => setIsSwitchEnabled(previousState => !previousState);
    // Naviguer vers l'écran de jeu ou afficher une erreur, etc.

    
    return (

      <View style={styles.ViewMain} >
        <Header titre={"Rejoindre la partie"}/>
        <View style={styles.ViewBody}>
          {/* Champ de saisie pour le code de la partie */}
          <TextInput
            style={styles.input}
            onChangeText={() => {dispatch(modifyCode)}} // Met à jour le gameCode dans l'état lorsque l'utilisateur tape
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
      </View>
          
 
      
      
    );
}



// Styles pour les composants
const styles = StyleSheet.create({
  ViewMain: {
    // Conteneur principal de l'écran
    flex: 2,
    backgroundColor: '#FFEBD7', 
  },
  ViewBody: {
    flex: 5, 
    paddingVertical:40,
    paddingHorizontal:10,
    marginTop: 100,
    alignItems:'center',
  },
  input: {
    // Style pour le champ de saisie
    height: 50,
    width: '70%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff', // Couleur de fond du champ de saisie
    borderRadius: 30,
  },
  switchContainer: {
    // Style pour le conteneur de l'interrupteur
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    

  },
  TextTitre: {
    fontSize: 30,
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



export default JoinScreen;