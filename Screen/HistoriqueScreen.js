
import React from "react";
import { Text, View, StyleSheet, ScrollView} from "react-native";



const HistoriqueItem = (props) => {
  return (
    <View style={styles.MainContainer}>
          <View style={styles.LeftContainer}>
            <Text style={styles.subText}>
             <Text style={{ color:'#F0122D' }}>2 </Text>kills
              </Text>
            <Text style={styles.NameText}>Vladimir</Text>
            <Text style= {styles.subText}>22h05</Text>
          </View>
          <View style={styles.RoundContainer}>
            <Text style={styles.RoundText}>{props.number}</Text>
          </View>
          <View style={styles.RightContainer}>
            <Text style={styles.MissionText}>Tu dois faire croire a ta cible qu’elle a marché dans une crotte de chien</Text>
          </View>
          <Text style= {styles.killerText}>
            par <Text style={{ color:'#F0122D' }}>Caroline</Text>
          </Text>

        </View>

  )
}




const HistoriqueScreen = ({ navigation }) => {
  
 
  


  return (
    <View style={styles.ViewMain}>
      <ScrollView style={styles.ScrollView}>
        <View style={styles.Timeline}/>
        <View style={styles.TimelineContainer}>
          <HistoriqueItem number='1' />
          <HistoriqueItem number='2' />
          <HistoriqueItem  number='3' />
          <HistoriqueItem number='4'  />
          <HistoriqueItem number='5'  />
          <HistoriqueItem number='6'  />
          <HistoriqueItem number='7'  />
          <HistoriqueItem number='8'  />
          <HistoriqueItem number='9'  />

        </View>
        

        

      </ScrollView>
        
    </View>
      
  
  );
};

const styles = StyleSheet.create({
  ViewMain: {
    flex: 1,
    backgroundColor: "#061624",
  },
  ScrollView: {
    position: 'relative',
  },
  Timeline: {
    position: 'absolute',
    width: 5,
    height: '90%',
    backgroundColor: '#F0122D',
    left: 132,
    top: 0,
  },
  MainContainer: {
    paddingHorizontal: 20,
    marginTop: 50,

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
