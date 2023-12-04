import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ActionScreen = () => {
  // Vous auriez ici la logique pour définir la cible et l'action, ou les recevoir via props.
  
  const handlePressKill = () => {
    // Logique déclenchée lors de l'appui sur le bouton KILL
    console.log('Kill action pressed');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Cible</Text>
        <TouchableOpacity style={styles.menuButton}>
          {/* Icône de menu ici, ou vous pouvez utiliser une image ou une icône vectorielle */}
        </TouchableOpacity>
      </View>
      
      {/* Cible */}
      <View style={styles.targetContainer}>
        <Text style={styles.targetText}>Khaoula</Text>
      </View>
      
      {/* Action */}
      <View style={styles.actionContainer}>
        <Text style={styles.actionText}>Khaoula doit te proposer de boire dans son verre</Text>
      </View>
      
      {/* Bouton KILL */}
      <TouchableOpacity style={styles.killButton} onPress={handlePressKill}>
        <Text style={styles.killButtonText}>KILL</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Couleur de fond de l'écran
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  headerText: {
    color: '#fff', // Couleur du texte de l'en-tête
    fontSize: 24,
    fontWeight: 'bold',
  },
  menuButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  targetContainer: {
    marginBottom: 20,
    padding: 10,
    borderColor: 'red', // Couleur de la bordure de la cible
    borderWidth: 2,
    borderRadius: 10,
  },
  targetText: {
    color: '#fff', // Couleur du texte de la cible
    fontSize: 20,
    fontWeight: 'bold',
  },
  actionContainer: {
    marginBottom: 40,
    padding: 10,
    borderColor: 'red', // Couleur de la bordure de l'action
    borderWidth: 2,
    borderRadius: 10,
  },
  actionText: {
    color: '#fff', // Couleur du texte de l'action
    fontSize: 16,
    textAlign: 'center',
  },
  killButton: {
    backgroundColor: 'red', // Couleur de fond du bouton KILL
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  killButtonText: {
    color: '#fff', // Couleur du texte du bouton KILL
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ActionScreen;
