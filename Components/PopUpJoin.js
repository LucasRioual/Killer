// PopUp.js
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, ScrollView, TouchableOpacity, TextInput, Switch, Animated, ActivityIndicator} from 'react-native';
import { useSelector, useDispatch} from 'react-redux';
import { setGameCode } from '../Store/Reducer/gameSlice';
import { useNavigation } from '@react-navigation/native';
import socket from '../Socket/socketManager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getPlayer } from '../Hooks/hooks';





const PopUpJoin = (props) => {

  const gameCode = useSelector((state) => state.game.gameCode);
  const userName = useSelector((state) => state.user.userName);
  const expoToken = useSelector((state) => state.user.expoToken);
  const userId = useSelector((state) => state.user.userId);
  const [isNonDrinker, setIsNonDrinker] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Message d'erreur à afficher
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const animRef = useRef(new Animated.Value(0)).current;
   
  //const {startSocket} = useGame({navigation});
 

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
 
  
  const testGameCode = async (gameCode) => {

    const [listPlayer, statut, success] = await getPlayer(gameCode);
    console.log("success", success);
    if(!success){
      setErrorMessage("La partie n'existe pas");
      props.shakeAnim(animRef);
      setIsLoading(false);
      return;
    }
    console.log("Partie que je souhaite rejoindre ", statut);
    if(statut === "start"){
      setErrorMessage("La partie a déjà commencé");
      props.shakeAnim(animRef);
      setIsLoading(false);
      return;

    }
    for (let i = 0; i < listPlayer.length; i++) {
      if (listPlayer[i] === userName) {
        props.setMessageError("Ton nom est déjà pris");
        props.shakeAnim(props.animRef);
        setErrorMessage("");
        setIsLoading(false);
        props.exit();
        return;
      }
    }
    socket.emit("join_room", gameCode, userId);
    setIsLoading(false);
    props.exit();
    navigation.navigate("Salon", { gameStatut: statut, listPlayerReceived: listPlayer });
      

  }

  


  const handleJoinGame = () => {
    if(!gameCode){
      props.shakeAnim(animRef);
      setErrorMessage('Rentre un code tête de noeud');
      }
    else if(gameCode.length != 6){
      props.shakeAnim(animRef);
      setErrorMessage('Le code doit faire 6 caractères');
    }
    else{
      setIsLoading(true);
      testGameCode(gameCode);
    }
   };
   
      
    const handleToggleSwitch = (newValue) => {
      setIsNonDrinker(newValue); // Met à jour l'état avec la nouvelle valeur
      console.log("Is Non-Drinker:", newValue); // Affiche la nouvelle valeur dans la console
    };
    // Cette fonction est appelée chaque fois que le Switch est activé/désactivé
    const toggleSwitch = () => setIsSwitchEnabled(previousState => !previousState);
    

    

  useEffect(() => {
    setErrorMessage('');
  }, []);

  return (
    <Modal visible={props.visible} transparent onRequestClose={props.exit}>
      <TouchableOpacity style= {styles.View} onPress={props.exit} activeOpacity={1} >
        <View style={styles.Container} >                                    
            <TouchableOpacity  activeOpacity={1}>
              <Text style={styles.Titre}>Rejoindre</Text>
              <Animated.View style = {{ transform: [{translateX: animRef}] }}>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => {dispatch(setGameCode(text))}} // Met à jour le gameCode dans l'état lorsque l'utilisateur tape
                  value={gameCode} // Affiche la valeur actuelle de gameCode
                  placeholder="CODE" // Texte d'indication dans le champ de saisie
                  autoCapitalize="characters"
                  autoFocus={true}
                />
              </Animated.View>
              
              <Text style={styles.TextErreur}>{errorMessage}</Text>
              <View style={styles.switchContainer}>
                <Text style={styles.TextTitre}>Non-buveur :</Text>
                <Switch
                    trackColor={{ false: 'red', true: 'green' }}
                    thumbColor={isNonDrinker? 'green' : 'red'}
                    onValueChange={handleToggleSwitch} 
                    value={isNonDrinker}
                  />
              </View>
              {isLoading ? (
                <View style={styles.button} onPress={handleJoinGame}>
                <ActivityIndicator size={40} color="#FFF" />
              </View>

              ): (
                <TouchableOpacity style={styles.button} onPress={handleJoinGame} activeOpacity={0.5}>
                  <Text style={styles.buttonText}>GO</Text>
                </TouchableOpacity>
              )}
              

             
                   

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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    
  },
  Container: {
    backgroundColor: '#FFF',
    paddingHorizontal: 60,
    borderRadius: 15,  
    padding: 20,
    
  },
  
  Titre: {
    fontFamily: 'LuckiestGuy',
    fontSize: 40,
    textAlign: 'center',
    color: '#F0122D',
    marginBottom: 5,
   
    
  },

  input: {
    
    marginVertical: 5,
    height: 50,
    width: 150,
    borderWidth: 1,
    backgroundColor: '#fff', // Couleur de fond du champ de saisie
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 25,
    alignSelf: 'center',
    
  },
  TextErreur: {
    color: '#F0122D',
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Sen',
    fontWeight: 'bold',
  },
  switchContainer: {
    // Style pour le conteneur de l'interrupteur
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    
  },
  TextTitre: {
    fontSize: 22,
    fontFamily: 'Sen',
  },
  button: {
    marginTop: 5,
    backgroundColor:'#F0122D',
    borderRadius: 50,
    height : 60,
    alignSelf: 'center',
    justifyContent: 'center',
    width: 150,
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
