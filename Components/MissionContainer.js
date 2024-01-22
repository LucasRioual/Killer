import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Svg, { Circle, Path, Line } from 'react-native-svg';
import userData from '../Data/UserData.json';





const MissionContainer = () => {


    const [isMissionVisible, setIsMissionVisible] = useState(false);
    const [rotationAngle, setRotationAngle] = useState(0);
    const [listMission, setListMission] = useState(userData);
    const [selectedMissions, setSelectedMissions] = useState([]);

    const handleMissionPress = (missionId) => {
        
        const isSelected = selectedMissions.includes(missionId);
    
        
        setSelectedMissions((prevSelectedMissions) =>
          isSelected
            ? prevSelectedMissions.filter((id) => id !== missionId)
            : [...prevSelectedMissions, missionId]
        );
      };

    const ListMission = () =>{
        return (
            <View style={styles.MissionSubContainer}>
            {listMission.map((mission, index) => (
                <TouchableOpacity
                style={[
                    styles.TextMissionContainer,
                    {
                    backgroundColor: selectedMissions.includes(mission.id) ? '#F0122D' : '#D9D9D9',    
                    },
                ]}
                key={mission.id}
                onPress={() => handleMissionPress(mission.id)}
                >
                <Text style={{ color: selectedMissions.includes(mission.id) ? 'white' : '#927A7A' }}>
                    {mission.mission}
                </Text>
                </TouchableOpacity>
            ))}
            </View>
          );
      } 


  const showMission = () => {
    if(isMissionVisible){
        setIsMissionVisible(false);
    }
    else{
        setIsMissionVisible(true);
    }
    setRotationAngle(rotationAngle === 0 ? 180 : 0);
  }


    return (
        <View style={styles.MissionContainer}>
            <TouchableOpacity style={styles.HeaderMission} onPress={showMission}>
                <View style={{ transform: [{ rotate: `${rotationAngle}deg` }] }}>
                    <Svg width="30" height="30" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M12.0097 12.3333L24.9906 12.3333C25.503 12.3326 26.0052 12.477 26.439 12.7498C26.8729 13.0226 27.2205 13.4127 27.4418 13.875C27.7009 14.4234 27.8006 15.0336 27.7298 15.636C27.6589 16.2383 27.4202 16.8087 27.041 17.282L20.5506 25.1445C20.2959 25.4384 19.981 25.6741 19.6272 25.8357C19.2734 25.9972 18.8891 26.0808 18.5002 26.0808C18.1112 26.0808 17.7269 25.9972 17.3731 25.8357C17.0194 25.6741 16.7044 25.4384 16.4497 25.1445L9.95932 17.282C9.58006 16.8087 9.34139 16.2383 9.27052 15.636C9.19966 15.0336 9.29943 14.4234 9.55849 13.875C9.77978 13.4127 10.1275 13.0226 10.5613 12.7498C10.9951 12.477 11.4973 12.3326 12.0097 12.3333ZM24.6668 15.4166L12.4877 15.4166L18.5002 22.8475L24.6668 15.4166Z" fill="black"/>
                    </Svg>

                </View>
                
                <Text style={styles.TextHeaderMission}>Choix des missions</Text>
            </TouchableOpacity>
            {isMissionVisible && (
            <View style={styles.MissionBody}>
                <ListMission/>
                
        
            </View>
          )}
        </View>
    );
}

const styles = StyleSheet.create({
    MissionContainer: {
        width: '100%',
        marginTop: 20,
        borderRadius: 20,
        backgroundColor: '#FFF',
        paddingLeft: 20,
        paddingVertical: 13,
       
      },
        HeaderMission: {
            flexDirection: 'row',
            alignItems: 'center',
            
        },
        TextHeaderMission: {
            fontSize: 15,
            fontWeight: 'bold',
            fontFamily: 'Sen',
            marginLeft: 10,
            
        },
        MissionBody: {
            
        },
        MissionSubContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 5,
            
          },
        TextMissionContainer: {
            marginHorizontal:4,
            marginVertical:10,
            paddingHorizontal:12,
            paddingVertical:7,
            borderRadius: 5,
          },
          TextMission: {
            fontSize: 14,
            fontFamily: 'Sen',
            
          },
    
});

export default MissionContainer;