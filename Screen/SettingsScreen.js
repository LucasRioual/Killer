import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet,  Modal } from 'react-native';
import Header from '../Components/Header';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { createGame} from '../Hooks/hooks'
import { useSelector, useDispatch } from 'react-redux'
import { modifyCode} from '../Store/Reducer/gameSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';

const GameSettingsScreen = ({ visible, onSelect, onCancel, options }) => {
  const [selectedTime, setSelectedTime] = useState('no_limit'); // La valeur initiale peut être 'no', '15min', '30min', '60min'
  const [selectedParticipants, setSelectedParticipants] = useState('unlimited');
  const [joinMidGame, setJoinMidGame] = useState(true);
  const [includeAlcoholicDares, setIncludeAlcoholicDares] = useState(true);
  const userId = useSelector((state) => state.user.userId);
  const userSurname = useSelector((state) => state.user.surname);
  const dispatch = useDispatch();
  const expoToken = useSelector((state) => state.user.expoToken);

  const navigation = useNavigation();
  
  const Create = async () => {
    
    const responseCode =  await createGame(userSurname, expoToken);
    console.log('responseCode : ', responseCode);
    dispatch(modifyCode(responseCode));
    navigation.navigate("Salon");
  };
   

  return (
    <View style={styles.ViewMain}>
      
      <Header titre="Classique" navigation= {navigation} visible = {false} onClickBack={()=> navigation.navigate('Mode')} />

      <View style={styles.ViewBody}>

        <Text style={styles.TextTitre}>Soirée</Text>

        {/* Options de paramétrage du jeu */}
        
        {/* Nombre de joueurs */}
        <View style={styles.pickerContainer}>
        <Text style={styles.settingText}>Nbre max de joueurs</Text>
        <Picker
              selectedValue={selectedParticipants}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => setSelectedParticipants(itemValue)}
            >
              <Picker.Item label="Unlimited" value="unlimited" />
              <Picker.Item label="10 Players" value="10" />
              <Picker.Item label="20 Players" value="20" />
              <Picker.Item label="30 Players" value="30" />
            </Picker>
        </View>
      

        {/* Sélecteur de la durée de la partie */}
        <View style={styles.pickerContainer}>
          <Text style={styles.settingText}>Temps de la partie</Text>
            <Picker
              selectedValue={selectedTime}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => setSelectedTime(itemValue)}
            >
              <Picker.Item label="No Limit" value="no_limit" />
              <Picker.Item label="15 Min" value="15" />
              <Picker.Item label="30 Min" value="30" />
              <Picker.Item label="60 Min" value="60" />
            </Picker>
        </View>
  
        
        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Rejoindre en plein partie</Text>
          <Switch
            trackColor={{ false: 'red', true: 'green' }}
            thumbColor={joinMidGame ? 'green' : 'red'}
            onValueChange={setJoinMidGame}
            value={joinMidGame}
          />
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Inclure des gages alcooliques</Text>
          <Switch
            trackColor={{ false: 'red', true: 'green' }}
            thumbColor={includeAlcoholicDares ? 'green' : 'red'}
            onValueChange={setIncludeAlcoholicDares}
            value={includeAlcoholicDares}
          />
        </View>

        {/* Bouton pour lancer le jeu */}
        <TouchableOpacity style={styles.button} onPress={Create}>
          <Text style={styles.buttonText}>LANCER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const MainBouton = props => {
  return (
    <TouchableOpacity style={[styles.button]} onPress={props.onPress} activeOpacity={0.5}>
      <Text style={styles.buttonText}>{props.titre}</Text>
    </TouchableOpacity>
  );
};


// Styles
const styles = StyleSheet.create({
  ViewMain: {
    // Conteneur principal de l'écran
    flex: 1,
    backgroundColor: '#061624', 
  },
  ViewBody: {
    flex: 5, 
    
    alignItems:'center',
  },
  TextTitre: {
    fontSize: 30,
    fontFamily: 'Sen',
    fontWeight: 'bold',
    
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },

  closeButtonText: {
    color: 'blue',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20
  },
  pickerContainer: {
    backgroundColor: 'transparent', 
    //width: '100%', 
    //alignItems: 'center', // Centrer le contenu (label + picker)
    //marginBottom: 20, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  picker: {
    color: 'red',
    height: 40,
    width: 140,
  },
  
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingText: {
    color: 'white',
    fontSize: 18,
  },
 
  optionText: {
    color: 'red',
    fontSize: 18,
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

export default GameSettingsScreen;
