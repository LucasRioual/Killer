
import React from "react";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import SvgRetour from '../assets/svg/SvgRetour';



const HistoriqueItem = ({number, player}) => {

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const formatDate = date.toLocaleTimeString(['fr-FR'], { hour: '2-digit', minute: '2-digit', hour12: false });
    const timeArray = formatDate.split(':');
    const timeWithH = timeArray[0] + 'h' + timeArray[1];
    return timeWithH;
  }

  


  return (
    <View style={styles.MainContainer}>
          <View style={styles.LeftContainer}>
            <Text style={styles.subText}>
             <Text style={{ color:'#F0122D' }}>{player.numberKill} </Text>kills
              </Text>
            <Text style={styles.NameText}>{player.userName}</Text>
            <Text style= {styles.subText}>{formatDateTime(player.time)}</Text>
          </View>
          <View style={styles.RoundContainer}>
            <Text style={styles.RoundText}>{number}</Text>
          </View>
          <View style={styles.RightContainer}>
            <Text style={styles.MissionText}>{player.mission}</Text>
          </View>
          <Text style= {styles.killerText}>
            par <Text style={{ color:'#F0122D' }}>{player.killerName}</Text>
          </Text>

        </View>

  )
}








const HistoriqueScreen = ({ navigation, route }) => {

  const { timeline } = route.params;

  
 
  
  const ListPlayers = () =>{
    const timelineWithoutLas = timeline.filter(element => element.mission !== "none");


    return (
        <View style={styles.TimelineContainer}>
          {timelineWithoutLas.map((player, index) => (
            
            <HistoriqueItem key={index} number={index +1} player={player} />
          ))}
        </View>
      );
  } 


  return (
    <View style={styles.ViewMain}>
      <View style={styles.Timeline}/>
      <ScrollView style={styles.ScrollView}>        
        <ListPlayers/>
      </ScrollView>
      <TouchableOpacity style={styles.Svg} onPress={()=>{navigation.goBack()} } >
        <SvgRetour/>
      </TouchableOpacity>
        
    </View>
      
  
  );
};

const styles = StyleSheet.create({
  ViewMain: {
    flex: 1,
    backgroundColor: "#061624",
  },
  Svg: {
    position: 'absolute',
    left: 30,
    top: 50,
    justifyContent: 'center',
    alignItems: 'center',
    
   
  },
  ScrollView: {
    position: 'relative',
  },
  Timeline: {
    position: 'absolute',
    width: 5,
    height: '100%',
    backgroundColor: '#F0122D',
    left: 132,
    top: 0,
  },
  MainContainer: {
    paddingHorizontal: 20,
    marginTop: 60,

    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    
  },
  TimelineContainer: {
    paddingVertical: 100,
  },

  LeftContainer: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subText: {
    color: 'white',
    fontFamily: 'LuckiestGuy',
    fontSize: 14,
  },
  NameText: {
    color: '#F0122D',
    fontFamily: 'LuckiestGuy',
    fontSize: 18,
  },
  RoundContainer: {
    backgroundColor: '#F0122D',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    height: 50,
    width: 50,
    marginHorizontal: 10,
  },
  RoundText: {
    color: 'white',
    fontFamily: 'LuckiestGuy',
    fontSize: 30,
    
  },
  RightContainer: {
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderRadius: 10,
    padding: 10,
  },
  MissionText: {
    color: 'black',
    fontFamily: 'Sen',
    fontSize: 12,
  },
  killerText: {
    color: 'white',
    fontFamily: 'Sen',
    fontSize: 12,
    position: 'absolute',
    bottom: -20,
    right: 20,
  },
  
});

export default HistoriqueScreen;
