import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Svg, { Circle, Path, Line } from 'react-native-svg';






const OptionContainer = () => {

    const [selectedDuration, setSelectedDuration] = useState('4h');
    const [selectedJoin, setSelectedJoin] = useState(true);
    const [selectedChangeMission, setSelectedChangeMission] = useState('non');


    const handleDurationSelection = (duration) => {

        setSelectedDuration(duration === selectedDuration ? null : duration);
      };
    
    const handleJoinSelection = (join) => {
            
        setSelectedJoin(join === selectedJoin ? null : join);
    };
    
    const handleChangeMissionSelection = (changeMission) => {
                
        setSelectedChangeMission(changeMission === selectedChangeMission ? null : changeMission);
    };




    return (
        <View style={styles.MainContainer} >
            <Text style= {styles.TextOption}>Durée de la partie : </Text>
            <View style={styles.ChoiceContainer}>
                <TouchableOpacity
                style={[
                    styles.FirstButtonChoice,
                    { backgroundColor: selectedDuration === '1h' ? '#F0122D' : 'white' },
                ]}
                onPress={() => handleDurationSelection('1h')}
                >
                <Text style={[styles.TextChoice,{ color: selectedDuration === '1h' ? 'white' : 'black' }]}>1 h</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={[
                    styles.ButtonChoice,
                    { backgroundColor: selectedDuration === '2h' ? '#F0122D' : 'white' },
                ]}
                onPress={() => handleDurationSelection('2h')}
                >
                <Text style={[styles.TextChoice,{ color: selectedDuration === '2h' ? 'white' : 'black' }]}>2 h</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={[
                    styles.ButtonChoice,
                    { backgroundColor: selectedDuration === '3h' ? '#F0122D' : 'white' },
                ]}
                onPress={() => handleDurationSelection('3h')}
                >
                <Text style={[styles.TextChoice,{ color: selectedDuration === '3h' ? 'white' : 'black' }]}>3 h</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={[
                    styles.LastButtonChoice,
                    { backgroundColor: selectedDuration === '4h' ? '#F0122D' : 'white' },
                ]}
                onPress={() => handleDurationSelection('4h')}
                >
                <Text style={[styles.TextChoice,{ color: selectedDuration === '4h' ? 'white' : 'black' }]}>4 h</Text>
                </TouchableOpacity>
            </View>
            <Text style= {styles.TextOption}>Rejoindre en cours de partie : </Text>
            <View style={styles.ChoiceContainer}>
                <TouchableOpacity style={[styles.FirstButtonChoice, {backgroundColor: selectedJoin ? '#F0122D' : 'white'}]} onPress={() => handleJoinSelection(true)}>
                    <Text style={[styles.TextChoice, {color: selectedJoin ? 'white' : 'black'}]}>Oui</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.LastButtonChoice, {backgroundColor: !selectedJoin ? '#F0122D' : 'white'}]} onPress={() => handleJoinSelection(false)}>
                    <Text style={[styles.TextChoice, {color: !selectedJoin ? 'white' : 'black'}]}>Non</Text>
                </TouchableOpacity>
            </View>
            <Text style= {styles.TextOption}>Possibilité de changer de missions : </Text>
            <View style={styles.ChoiceContainer}>
                <TouchableOpacity
                style={[
                    styles.FirstButtonChoice,
                    { backgroundColor: selectedChangeMission === 'non' ? '#F0122D' : 'white' },
                ]}
                onPress={() => handleChangeMissionSelection('non')}
                >
                <Text style={[styles.TextChoice,{ color: selectedChangeMission === 'non' ? 'white' : 'black' }]}>Non</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={[
                    styles.ButtonChoice,
                    { backgroundColor: selectedChangeMission === '1' ? '#F0122D' : 'white' },
                ]}
                onPress={() => handleChangeMissionSelection('1')}
                >
                <Text style={[styles.TextChoice,{ color: selectedChangeMission === '1' ? 'white' : 'black' }]}>1 fois</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={[
                    styles.ButtonChoice,
                    { backgroundColor: selectedChangeMission === '2' ? '#F0122D' : 'white' },
                ]}
                onPress={() => handleChangeMissionSelection('2')}
                >
                <Text style={[styles.TextChoice,{ color: selectedChangeMission === '2' ? 'white' : 'black' }]}>2 fois</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={[
                    styles.LastButtonChoice,
                    { backgroundColor: selectedChangeMission === '3' ? '#F0122D' : 'white' },
                ]}
                onPress={() => handleChangeMissionSelection('3')}
                >
                <Text style={[styles.TextChoice,{ color: selectedChangeMission === '3' ? 'white' : 'black' }]}>3 fois</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    MainContainer: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    TextOption: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'Sen',
    },
    ChoiceContainer: {
        flexDirection: 'row',
        marginVertical: 20,
    },
    FirstButtonChoice: {
        backgroundColor: '#FFF',
        marginHorizontal: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    ButtonChoice: {
        backgroundColor: '#FFF',
        marginHorizontal: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    LastButtonChoice: {
        backgroundColor: '#FFF',
        marginHorizontal: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    TextChoice: {
        fontSize: 15,
        fontFamily: 'Sen',
    },
    
    
});

export default OptionContainer;