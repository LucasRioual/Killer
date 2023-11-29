import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import Header from '../Components/Header';
import PlayerName from '../Components/PlayerName';
import UserData from '../Data/UserData.json'


const ListPlayer = () =>{
    return (
        <View style={styles.PlayerContainer}>
          {UserData.map((user, index) => (
            <PlayerName key={index} label={user.userName} />
          ))}
        </View>
      );

}

const SalonScreen = ()=> {

    console.log(UserData[0].userName);
    return (

      <View style={styles.ViewMain} >
        <Header titre={"Salon"}/>
        <View style={styles.ViewBody}>
          
            <Text style={styles.TextTitre}>Code de la partie :</Text>
            <Text style={styles.TextCode}>J4KTF5</Text>
            <View style={styles.ViewPlayer}>
                <ScrollView persistentScrollbar={true}>
                    
                    <ListPlayer/>
                   
                </ScrollView>
                
                
            </View>
            
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}  activeOpacity={0.5}>
                    <Text style={styles.buttonText}>Lancer</Text>
                </TouchableOpacity>

            </View>
            

            
        </View>
      </View>
     
    );
}

const styles = StyleSheet.create ({
  ViewMain: {
    flex: 1, 
    backgroundColor: '#FFEBD7',
  },
  ViewBody: {
    flex: 5, 
    paddingVertical:40,
    paddingHorizontal:10,
    alignItems:'center',
  },
  TextCode: {
    fontFamily: 'LuckiestGuy',
    fontSize: 60,
    color:'#F0122D',
  },
  TextTitre: {
    fontSize: 30,
    fontFamily: 'Sen',
  },
  ViewPlayer: {
    marginTop:20,
    borderRadius:20,
    flex:4,
    justifyContent: 'center',
  },
  PlayerContainer: {
    
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent:'center',
    

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
  buttonContainer:{
    flex:1,
    justifyContent:'flex-end',
    
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 35,
    fontFamily: 'LuckiestGuy',
    
  },
  
  
});

export default SalonScreen;