import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import ModeItem from '../Components/ModeItem';
import Header from '../Components/Header';


const ModeScreen=({navigation}) => {

 


    return (

      <View style={styles.ViewMain} >
        <Header titre={"Modes"} navigation= {navigation} visible={false} onClickBack={()=> navigation.navigate('Home')} />
        <View style={styles.ViewBody}>
          <View style={styles.ViewScrollContainer}>
            <ScrollView style={styles.Scroll}>
              <View style={styles.ContainerMode}>
                <ModeItem titre = "CLASSIQUE" navigation={navigation} 
                description= "Le mode classique du jeu du Killer. Vous devrez éliminer les autres participants en réalisant des missions."/>
                <ModeItem titre = "Mission ou pas mission" navigation={navigation}
                description= "Le mode classique du jeu du Killer. Vous devrez éliminer les autres participants en réalisant des missions."/>
                <ModeItem titre = "PERSONNALISE" navigation={navigation}
                description= "Le mode classique du jeu du Killer. Vous devrez éliminer les autres participants en réalisant des missions."/>
                <ModeItem titre = "A L'AVEUGLE" navigation={navigation}
                description= "Le mode classique du jeu du Killer. Vous devrez éliminer les autres participants en réalisant des missions."/>
                <ModeItem titre = "Foule en folie" navigation={navigation}
                description= "Le mode classique du jeu du Killer. Vous devrez éliminer les autres participants en réalisant des missions."/>

              </View>
            

            </ScrollView>
          </View>
          
          
        </View>

      </View>
      
      
    );
}

const styles = StyleSheet.create ({
  ViewMain: {
    flex: 1, 
    backgroundColor: '#061624',
  },
  ViewBody: {
    flex: 5, 
    justifyContent:'center',
  },
  ContainerMode: {
   alignItems:'center',
   marginBottom:50,
   
  },
  Scroll:{
    
  }
  
});

export default ModeScreen;