import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import Header from '../Components/Header';

const GameSettingsScreen = () => {
  const [gameTimeLimited, setGameTimeLimited] = useState(false);
  const [maxPlayers, setMaxPlayers] = useState('ILLIMITÉ');
  const [joinMidGame, setJoinMidGame] = useState(true);
  const [includeAlcoholicDares, setIncludeAlcoholicDares] = useState(true);

  // Ajoutez ici la logique pour le lancement du jeu
  const handleStartGame = () => {
    console.log('Lancement du jeu avec les paramètres actuels');
    // Ici, vous pouvez gérer la navigation ou initialiser le jeu
  };

  return (
    <View style={styles.ViewMain}>
      {/* En-tête */}
      <Header titre={"Paramètres de la partie"}/>

      <View style={styles.ViewBody}>

        <Text style={styles.TextTitre}>Soirée</Text>

        {/* Options de paramétrage du jeu */}
        <View style={styles.settingRow}>
          <Text style={styles.settingText}>NBR DE JOUEURS MAX</Text>
          <Text style={styles.optionText}>{maxPlayers}</Text>
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingText}>TEMPS DE LA PARTIE</Text>
          <Switch
            trackColor={{ false: 'red', true: 'green' }}
            thumbColor={gameTimeLimited ? 'green' : 'red'}
            onValueChange={setGameTimeLimited}
            value={gameTimeLimited}
          />
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingText}>REJOINDRE EN PLEIN PARTIE</Text>
          <Switch
            trackColor={{ false: 'red', true: 'green' }}
            thumbColor={joinMidGame ? 'green' : 'red'}
            onValueChange={setJoinMidGame}
            value={joinMidGame}
          />
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingText}>INCLURE DES GAGES ALCOOLIQUES</Text>
          <Switch
            trackColor={{ false: 'red', true: 'green' }}
            thumbColor={includeAlcoholicDares ? 'green' : 'red'}
            onValueChange={setIncludeAlcoholicDares}
            value={includeAlcoholicDares}
          />
        </View>

        {/* Bouton pour lancer le jeu */}
        <TouchableOpacity style={styles.button} onPress={handleStartGame}>
          <Text style={styles.buttonText}>LANCER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles
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
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingText: {
    color: 'black',
    fontSize: 18,
  },
  TextTitre: {
    fontSize: 30,
    fontFamily: 'Sen',
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
