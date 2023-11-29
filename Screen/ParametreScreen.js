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
    <View style={styles.container}>
      {/* En-tête */}
      <Header titre={"Paramètres de la partie"}/>
      <Text style={styles.TextTitre}>Soirée</Text>

      {/* Options de paramétrage du jeu */}
      <View style={styles.settingRow}>
        <Text style={styles.settingText}>TEMPS DE LA PARTIE</Text>
        <Switch
          trackColor={{ false: 'grey', true: 'red' }}
          thumbColor={gameTimeLimited ? 'white' : 'red'}
          onValueChange={setGameTimeLimited}
          value={gameTimeLimited}
        />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingText}>NBR DE JOUEURS MAX</Text>
        <Text style={styles.optionText}>{maxPlayers}</Text>
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingText}>REJOINDRE EN PLEIN PARTIE</Text>
        <Switch
          trackColor={{ false: 'grey', true: 'red' }}
          thumbColor={joinMidGame ? 'white' : 'red'}
          onValueChange={setJoinMidGame}
          value={joinMidGame}
        />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingText}>INCLURE DES GAGES ALCOOLIQUES</Text>
        <Switch
          trackColor={{ false: 'grey', true: 'red' }}
          thumbColor={includeAlcoholicDares ? 'white' : 'red'}
          onValueChange={setIncludeAlcoholicDares}
          value={includeAlcoholicDares}
        />
      </View>

      {/* Bouton pour lancer le jeu */}
      <TouchableOpacity style={styles.button} onPress={handleStartGame}>
        <Text style={styles.buttonText}>LANCER</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEBD7',
    padding: 20,
  },
  
  subHeader: {
    fontSize: 24,
    color: 'red',
    marginBottom: 20,
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
