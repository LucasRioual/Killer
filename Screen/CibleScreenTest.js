import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles. ViewMain}>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.TextTitre}>Open</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.popUpView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello!</Text>
            <Text style={styles.modalText}>
              We love react. It's the best mobile UI framework. We are gonna be the best developers. Learn react everyday.
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.Textbutton}>Close</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.Textbutton}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  ViewMain: {
    flex: 1,
    backgroundColor: '#061624',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  TextTitre: {
    fontSize: 46,
    fontFamily: 'LuckiestGuy',
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Ceci distribue de l'espace uniformément autour des boutons
    width: '70%', // Vous pouvez ajuster la largeur comme nécessaire
  },
  Textbutton: {
    fontSize: 20,
    fontFamily: 'LuckiestGuy',
    color: 'white',
  },
  popUpView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: '#061624',// Dim the background
  },
  modalView: {
    margin: 20,
    backgroundColor:'#F0122D',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  button: {
    marginTop: 10,
    backgroundColor:'#F0122D',
    borderRadius: 50,
    paddingHorizontal:30,
    paddingVertical:10,
    justifyContent: 'center',
    shadowColor: "#061624",
    shadowOffset: {
	    width: 0,
	    height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },

});

export default App;
