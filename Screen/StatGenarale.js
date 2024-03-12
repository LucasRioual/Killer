import React,  { useState, useEffect, useRef }  from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../Components/Header';

import { useSelector, useDispatch } from 'react-redux';
import { getStatGeneral } from '../Hooks/hooks';

import Podium from '../Components/Podium';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';


const StatGenerale = ({ navigation, route }) => {

  const gameCode = useSelector((state) => state.game.gameCode);
  const [timeline, setTimeline] = useState([]); 
  const [biggestKiller, setBiggestKiller] = useState('');
  const [biggestKillerKills, setBiggestKillerKills] = useState(0);
  const [firstBloodTarget, setFirstBloodTarget] = useState('');
  const [firstBloodKiller, setFirstBloodKiller] = useState('');
  const [topPlayer, setTopPlayer] = useState({});
  const [secondPlayer, setSecondPlayer] = useState({});
  const [thirdPlayer, setThirdPlayer] = useState({});





  
    const VoirHistorique = () => {
        navigation.navigate('Historique', {timeline: timeline});
    };

    const getBiggestKiller = (timeline) => {
      let killer = timeline[0].userName;
      let killerKills = timeline[0].numberKill;
      timeline.forEach((player) => {
        if (player.numberKill > killerKills) {
          killer = player.userName;
          killerKills = player.numberKill;
        }
      });
      setBiggestKiller(killer);
      setBiggestKillerKills(killerKills);
    };

    getPodiumPlayer = (timeline) => {
      let topPlayer = timeline[timeline.length - 1];
      let secondPlayer = timeline[timeline.length - 2];
      let thirdPlayer = timeline[timeline.length - 3];
      setTopPlayer(topPlayer);
      setSecondPlayer(secondPlayer);
      setThirdPlayer(thirdPlayer);
    }

    useEffect(() => {
      const getStat = async () => {
        const timeline = await getStatGeneral(gameCode); 
        setFirstBloodTarget(timeline[0].userName); 
        setFirstBloodKiller(timeline[0].killerName);
        getBiggestKiller(timeline);
        getPodiumPlayer(timeline);
        setTimeline(timeline);
        
      };
      getStat();
      }, []);

    

       return (
        <View style={styles.ViewMain}>
          <Header titre={"Classement"} navigation= {navigation} onClickBack={()=> navigation.goBack()} />
          <View style={styles.ViewBody}>
                <Podium first={topPlayer} second={secondPlayer} third={thirdPlayer} />
                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                        Le plus gros tueur :  
                        <Text style={styles.params}>{` ${biggestKiller} (${biggestKillerKills} kills)`}</Text>
                    </Text>
                    <Text style={styles.text}>
                        {`Premier sang  : ${firstBloodTarget}  par `} 
                        <Text style={styles.params}> {firstBloodKiller}</Text>
                    </Text>
                </View>
            
            <TouchableOpacity style={styles.button} onPress={VoirHistorique}>
                    <Text style={styles.buttonText}>Historique</Text>
                </TouchableOpacity>
          </View>
        </View>
    );
};

const styles = StyleSheet.create({
    ViewMain: {
      flex: 1, 
      backgroundColor: '#061624',
    },
  
    ViewBody: {
      flex: 5, 
      alignItems:'center',
        paddingTop: 50,
  
    },

    podium: {
        
    },
    textContainer: {
        marginVertical: 50,
    },
    text: {
        color: 'white',
        fontSize: 18,
        margin: 10,
        fontFamily: 'LuckiestGuy',
    },
    params: {
        color: '#F0122D',
    },
  
    button: {
      position: 'absolute',
      bottom: 40,
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
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      fontSize: 30,
      fontFamily: 'LuckiestGuy',
      
    },
  });
  
  
  
  
  export default StatGenerale;