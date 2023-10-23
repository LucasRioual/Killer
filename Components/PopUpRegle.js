// PopUp.js
import React from 'react';
import { View, Text, Modal, StyleSheet, ScrollView,} from 'react-native';




const PopUp = props => {
  return (
    <Modal visible={props.visible} transparent onRequestClose={props.exit}>
      <View style= {styles.View} >
        <View style={styles.Container}>                                    
          <ScrollView style={styles.Scroll}>
          
          <Text style={styles.Titre}>Règle du jeu</Text>
          <View style={styles.TextContainer}>
            <Text style={styles.SousTitre}>
              Le but du jeu est d'être le dernier survivant en éliminant les autres participants.{"\n"}{"\n"}
              <Text style={{ fontWeight: 'bold' }}>Comment se déroule une partie ?</Text>{"\n"}{"\n"}
              • Au début du jeu, chaque joueur reçoit une cible (un autre joueur) et une mission à réaliser {"\n"}{"\n"}  
              • Lorsqu’un joueur parvient à réaliser sa mission, il reprend à son tour la mission et la cible du malheureux défunt.
              <Text style={{ fontStyle: 'italic' }}> Il est conseillé de garder cette mort discrète.</Text>{"\n"}{"\n"}
              • Une partie se termine lorsqu'il ne reste qu'un seul joueur ou lorsque le chrono est terminé. Dans ce cas là, le gagnant 
              est le joueur qui a éliminé le plus de personne.{"\n"}{"\n"}
              <Text style={{ fontWeight: 'bold' }}>Les différents modes de jeu :</Text>{"\n"}{"\n"}
              
                
            </Text>
          </View>

          </ScrollView>
          
         
          
          
          
        </View>
      </View>
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
  Image: {
    
    
   
    
  },
  Scroll: {
    padding: 20,
  },
  Titre: {
    fontFamily: 'LuckiestGuy',
    fontSize: 28,
    textAlign: 'center',
    
    
  },
  TextContainer: {
    marginTop: 10,
    marginBottom:20,
    
    
  },
  SousTitre: {
    fontFamily: 'Sen',
    fontSize: 16,
    textAlign: 'justify',
    
    
  },
});



export default PopUp;
