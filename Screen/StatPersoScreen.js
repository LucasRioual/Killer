import React,  { useState, useEffect, useRef }  from 'react';
import {   Animated,  SafeAreaView, View, Text, StyleSheet,ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Header from '../Components/Header';
import Svg, { Path } from "react-native-svg"    
import { useSelector, useDispatch } from 'react-redux';
import { getStatPerso } from '../Hooks/hooks';
import { setGameFinish } from '../Store/Reducer/gameSlice';
import socket from '../Socket/socketManager';

const StatPersoScreen = ({ navigation, route}) => {


   

    const [listKill, setListKill] = useState([]);
    const [position, setPosition] = useState(0);
    const [aliveTime, setAliveTime] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [playerStatut, setPlayerStatut] = useState('none');

    const userId = useSelector((state) => state.user.userId);
    const isGameFinish = useSelector((state) => state.game.isGameFinish);

    const dispatch = useDispatch();


    const VoirRecap = () => {
        navigation.navigate('StatGenerale');
    }

    



    const ListKill = () =>{
        return (
            <View style={styles.PlayerContainer}>
              {listKill.map((user, index) => (
                <View key={index}  style={styles.VictimeContainer}>
                    <Text style={styles.textVictime}>{user}</Text>
                </View>
              ))}
            </View>
          );
      } 

      const formatPosition = (pos) => {
        if(pos === 1){
            return '1 ère';
        }
        else{
            return pos + ' ème';
        }
      };

      const formatTime = (aliveT) => {
        const time = aliveT/1000;
        const days = Math.floor(time / (3600 * 24));
        const hours = Math.floor((time % (3600 * 24)) / 3600);
        const minutes = Math.floor((time % 3600) / 60);
    
        const formattedDays = String(days);
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
  
        if (days === 0) {
            if(hours === 0){
                return `${formattedMinutes} m `;
            }
            else{
                return `${formattedHours} h ${formattedMinutes}`;
            }
        }
        else{
            return `${formattedDays} j ${formattedHours} h ${formattedMinutes} m`;
        }
      };

      useEffect(() => {
        const getStat = async () => {
          const data = await getStatPerso(userId);
          if(data.listKills.length === 0){
            data.listKills.push('Aucune victime');
          }
          setListKill(data.listKills);
          setAliveTime(formatTime(data.aliveTime));
          setPosition(formatPosition(data.position));
          setPlayerStatut(data.statut);
          if(data.gameStatut === 'end'){
            dispatch(setGameFinish(true));
          }
          setIsLoading(false);
           
        };
        getStat();
        }, []);

        const leaveGame = () => {
          socket.emit("leave_game", userId);
          dispatch(setGameFinish(false));
          navigation.navigate('Home');
        }


       return (
        <View style={styles.ViewMain}>
          <Header titre={"Stats Perso"} navigation= {navigation} visible = {true} onClickBack={leaveGame} />
          {isLoading ? (

            <View style={styles.ViewBody}>
              
              <ActivityIndicator style={styles.LoadingView} size={150} color="#F0122D" />
              
            </View>

            ) : (
          <View style={styles.ViewBody}>
            <TextTop statut={playerStatut} position={position} aliveTime={aliveTime}/>
            <View style={styles.ViewPlayer}>
                
                <Text style={styles.TextTitreVictime}>Tes Victimes</Text>
                <ScrollView persistentScrollbar={true}>         
                    <ListKill/>
                    
                </ScrollView>
                
            </View>
            {isGameFinish ? (
              <TouchableOpacity style={styles.button} onPress={VoirRecap}>
                <Text style={styles.buttonText}>Classement</Text>
              </TouchableOpacity>

            ):(
            
              <Text style={styles.textBas}>Le classement sera disponible une fois que la partie sera terminée.</Text>
            )}
            
                
          </View>
            )}
        </View>
    );
};

const TextTop =({statut, position, aliveTime}) => {
  if(statut == 'dead'){
    return (
      <View style={styles.textContainer}>
          <Text style ={styles.textHaut}>Tu es la 
          <Text style={styles.params}> {position} </Text>victime de la partie</Text>
          <View style={styles.EsperenceContainer}>
              <Svg width="31" height="32" viewBox="0 0 31 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <Path d="M11.625 3.99992V1.33325H19.375V3.99992H11.625ZM14.2083 18.6666H16.7917V10.6666H14.2083V18.6666ZM15.5 29.3333C13.9069 29.3333 12.4052 29.0164 10.9947 28.3826C9.58417 27.7488 8.35192 26.8879 7.29792 25.7999C6.24306 24.711 5.40864 23.4386 4.79467 21.9826C4.1807 20.5266 3.87414 18.9768 3.875 17.3333C3.875 15.6888 4.18199 14.1386 4.79596 12.6826C5.40993 11.2266 6.24392 9.95459 7.29792 8.86658C8.35278 7.7777 9.58546 6.91636 10.996 6.28258C12.4065 5.64881 13.9078 5.33236 15.5 5.33325C16.8347 5.33325 18.1156 5.55547 19.3427 5.99992C20.5698 6.44436 21.7215 7.08881 22.7979 7.93325L24.6063 6.06659L26.4146 7.93325L24.6063 9.79992C25.4243 10.911 26.0486 12.0999 26.4792 13.3666C26.9097 14.6333 27.125 15.9555 27.125 17.3333C27.125 18.9777 26.818 20.5279 26.204 21.9839C25.5901 23.4399 24.7561 24.7119 23.7021 25.7999C22.6472 26.8888 21.4145 27.7501 20.004 28.3839C18.5935 29.0177 17.0922 29.3341 15.5 29.3333ZM15.5 26.6666C17.9972 26.6666 20.1285 25.7555 21.8938 23.9333C23.659 22.111 24.5417 19.911 24.5417 17.3333C24.5417 14.7555 23.659 12.5555 21.8938 10.7333C20.1285 8.91103 17.9972 7.99992 15.5 7.99992C13.0028 7.99992 10.8715 8.91103 9.10625 10.7333C7.34097 12.5555 6.45834 14.7555 6.45834 17.3333C6.45834 19.911 7.34097 22.111 9.10625 23.9333C10.8715 25.7555 13.0028 26.6666 15.5 26.6666Z" fill="#F0122D"/>
              </Svg>
              <Text style={styles.textEsperence}>Espérance de vie : 
              <Text style={styles.params}> {aliveTime}</Text>
              </Text>
          </View>
        </View>
    )
  }
  else if (statut == 'winner'){
    return (
      <View style={styles.textContainer}>
        <Text style ={styles.textHaut}>Tu es le grand  
        <Text style={styles.params}> vainqueur </Text>de la partie !</Text>
        
          
      </View>
    )
  }
  else if (statut == 'timeout'){
    return (
      <View style={styles.textContainer}>
        <Text style ={styles.textHaut}>Le temps imparti est écoulé ! 
        <Text style={styles.params}> Personne </Text>n'a réussi à te tuer</Text>
        
          
      </View>
    )
  }
}


const styles = StyleSheet.create({
    ViewMain: {
      flex: 1, 
      backgroundColor: '#061624',
    },
  
    ViewBody: {
      flex: 5, 
      alignItems:'center',
      paddingTop: 50,
      paddingHorizontal: 20,
    },
    LoadingView: {
      marginTop: 100,
      },
    textContainer: {
      paddingHorizontal: 30,
      marginVertical: 40
    },
    textHaut: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'LuckiestGuy',
        textAlign: 'center',
        lineHeight: 25,
    },
    textBas: {
      fontSize: 18,
      color: 'white',
      fontFamily: 'LuckiestGuy',
      width: '80%',
      textAlign: 'center',
      lineHeight: 25,
      marginTop: 40
  },
    params: {
        color: '#F0122D',
    },
    EsperenceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 40,
    },
    textEsperence: {
        marginLeft: 10,
        fontSize: 18,
        color: 'white',
        fontFamily: 'LuckiestGuy',
    },
    ViewPlayer: {
        maxHeight: 300,
        backgroundColor: 'white',
        borderRadius: 10,
        width: '80%',
        padding: 20,
        paddingTop: 10,
        

      },
        TextTitreVictime: {
            fontSize: 24,
            fontFamily: 'LuckiestGuy',
            textAlign: 'center',
            marginBottom: 10,
        },
        VictimeContainer: {
            margin: 5,
        },
        textVictime: {
            fontSize: 16,
            fontFamily: 'Sen',
            

        },
        button: {
            marginTop: 80,
            backgroundColor:'#F0122D',
            borderRadius: 50,
            paddingHorizontal:40,
            paddingVertical:15,
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
            fontSize: 20,
            fontFamily: 'LuckiestGuy',
            
          },

    
  });
  
  
  
  
  export default StatPersoScreen;