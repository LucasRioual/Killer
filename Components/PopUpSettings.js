// PopUp.js
import React, { useRef, useState } from 'react';
import { View, Text, Modal, StyleSheet, ScrollView, TouchableOpacity, Switch} from 'react-native';
import { Picker } from '@react-native-picker/picker';



const PopUpSettings = props => {
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState('fr'); // Exemple de langue par défaut : français

  const toggleSwitch = () => setNotificationsEnabled(previousState => !previousState);


  return (
    <Modal visible={props.visible} transparent onRequestClose={props.exit}>
      <TouchableOpacity style= {styles.View} onPress={props.exit} activeOpacity={1} >

        <View style={styles.Container}>                                    
          <ScrollView style={styles.Scroll}>
            <TouchableOpacity activeOpacity={1}>
              <Text style={styles.Titre}>Paramètres Généraux</Text>
              <View style={styles.settingRow}>
                <Text style={styles.settingText}>Notifications</Text>
                <Switch
                  trackColor={{ false: "red", true: "green" }}
                  thumbColor={notificationsEnabled ? "green" : "red"}
                  onValueChange={toggleSwitch}
                  value={notificationsEnabled}
                />
              </View>
              <View style={styles.settingRow}>
                <Text style={styles.settingText}>Langue</Text>
                <Picker
                  selectedValue={language}
                  style={styles.pickerStyle}
                  onValueChange={(itemValue, itemIndex) => setLanguage(itemValue)}
                >
                  <Picker.Item label="Français" value="fr" />
                  <Picker.Item label="English" value="en" />
                  
                </Picker>
              </View>
              <TouchableOpacity style={styles.button} onPress={props.exit} activeOpacity={0.5}>
                <Text style={styles.buttonText}>OK</Text>
              </TouchableOpacity>

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
  TextContainer: {
    marginTop: 10,
   
  },
  pickerStyle: {
    height: 50,
    width: 150,
    // color: "#fff", Pour Android
  },
  SousTitre: {
    fontFamily: 'Sen',
    fontSize: 16,
    textAlign: 'justify',
    
    
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



export default PopUpSettings;
