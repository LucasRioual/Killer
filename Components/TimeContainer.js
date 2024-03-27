import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path, Circle, Line } from 'react-native-svg';

const TimeContainer = (props) => {

    const [selectedButton, setSelectedButton] = useState(null);

    const handleButtonPress = (buttonName) => {
        setSelectedButton(buttonName);
    };

    const isButtonSelected = (buttonName) => {
        return selectedButton === buttonName;
    };

    useEffect(() => {
        setSelectedButton(0);
    }, []);

    



    return (
        <View style={styles.TopContainer}>
            <View style={styles.TimeContainer}>
                <TouchableOpacity style={[styles.TimeView, isButtonSelected(0) && { borderColor: 'red', borderWidth: 4 }]}
                     onPress={() => handleButtonPress(0)} activeOpacity={0.5}>
                    <Svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/Svg">
                        <Circle cx="32.3158" cy="32.5642" r="32.267" fill="#061624"/>
                        <Path d="M32.3158 0.297295C36.5532 0.297295 40.7491 1.1319 44.6639 2.75348C48.5787 4.37504 52.1358 6.75181 55.132 9.74808C58.1283 12.7444 60.5051 16.3014 62.1267 20.2163C63.7482 24.1311 64.5828 28.3269 64.5828 32.5643L32.3158 32.5643L32.3158 0.297295Z" fill="#F0122D"/>
                        <Line x1="32.7754" y1="3.06299" x2="32.7754" y2="12.2821" stroke="white" stroke-width="0.921914"/>
                        <Line x1="32.7754" y1="52.8463" x2="32.7754" y2="62.0655" stroke="white" stroke-width="0.921914"/>
                        <Line x1="52.5977" y1="32.1033" x2="61.8168" y2="32.1033" stroke="white" stroke-width="0.921914"/>
                        <Line x1="2.81445" y1="32.1033" x2="12.0336" y2="32.1033" stroke="white" stroke-width="0.921914"/>
                    </Svg>
                    <Text style={styles.TimeText}>Partie courte</Text>
                </TouchableOpacity>
                <Text style={styles.descriptionTimeText}>Parties courtes d'environ 4 heures</Text>
            </View>
            <View style={styles.TimeContainer}>
            <TouchableOpacity style={[styles.TimeView, isButtonSelected(1) && { borderColor: 'red', borderWidth: 4 }]}
                     onPress={() => handleButtonPress(1)} activeOpacity={0.5}>
                <Svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/Svg">
                    <Circle cx="32.4467" cy="32.5642" r="32.267" fill="#061624"/>
                    <Path d="M32.4467 0.297295C36.6841 0.297295 40.8799 1.1319 44.7947 2.75348C48.7095 4.37504 52.2666 6.75181 55.2629 9.74808C58.2592 12.7444 60.6359 16.3014 62.2575 20.2163C63.8791 24.1311 64.7137 28.3269 64.7137 32.5643C64.7137 36.8017 63.8791 40.9975 62.2575 44.9123C60.6359 48.8272 58.2592 52.3842 55.2629 55.3805C52.2666 58.3768 48.7095 60.7536 44.7947 62.3751C40.8799 63.9967 36.6841 64.8313 32.4467 64.8313L32.4467 32.5643L32.4467 0.297295Z" fill="#F0122D"/>
                    <Line x1="32.9063" y1="3.06299" x2="32.9063" y2="12.2821" stroke="white" stroke-width="0.921914"/>
                    <Line x1="32.9063" y1="52.8463" x2="32.9063" y2="62.0655" stroke="white" stroke-width="0.921914"/>
                    <Line x1="52.7285" y1="32.1033" x2="61.9477" y2="32.1033" stroke="white" stroke-width="0.921914"/>
                    <Line x1="2.94531" y1="32.1033" x2="12.1645" y2="32.1033" stroke="white" stroke-width="0.921914"/>
                </Svg>

                    <Text style={styles.TimeText}>Partie moyenne</Text>
                </TouchableOpacity>
                <Text style={styles.descriptionTimeText}>Evenement d’une journée ou longue soirée</Text>
            </View>
            <View style={styles.TimeContainer}>
                <TouchableOpacity style={[styles.TimeView, isButtonSelected(2) && { borderColor: 'red', borderWidth: 4 }]}
                        onPress={() => handleButtonPress(2)} activeOpacity={0.5}>
                <Svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/Svg">
                    <Circle cx="32.5775" cy="32.5642" r="32.267" fill="#061624"/>
                    <Path d="M32.5775 0.297295C38.9594 0.297295 45.1979 2.18972 50.5041 5.73526C55.8104 9.28081 59.9462 14.3202 62.3884 20.2163C64.8306 26.1123 65.4696 32.6001 64.2245 38.8593C62.9795 45.1185 59.9064 50.8679 55.3938 55.3805C50.8811 59.8931 45.1317 62.9663 38.8725 64.2113C32.6133 65.4563 26.1255 64.8173 20.2295 62.3751C14.3335 59.9329 9.29406 55.7972 5.74852 50.4909C2.20297 45.1846 0.310547 38.9461 0.310547 32.5643H32.5775L32.5775 0.297295Z" fill="#F0122D"/>
                    <Line x1="33.0371" y1="3.06299" x2="33.0371" y2="12.2821" stroke="white" stroke-width="0.921914"/>
                    <Line x1="33.0371" y1="52.8463" x2="33.0371" y2="62.0655" stroke="white" stroke-width="0.921914"/>
                    <Line x1="52.8594" y1="32.1033" x2="62.0785" y2="32.1033" stroke="white" stroke-width="0.921914"/>
                    <Line x1="3.07617" y1="32.1033" x2="12.2953" y2="32.1033" stroke="white" stroke-width="0.921914"/>
                </Svg>

                    <Text style={styles.TimeText}>Partie longue</Text>
                </TouchableOpacity>
                <Text style={styles.descriptionTimeText}>Pour week end et vacances</Text>
            </View>

        </View>

        
    );
};

const styles = StyleSheet.create({
    TopContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    TimeContainer: {
        width: '30%',
        
    },
    LayerContainer: {
        position: 'absolute',
        backgroundColor: 'gray',
        height: '100%',
        width: '100%',
        opacity: 0.5,
    },
    TimeView: {
        backgroundColor: 'white',
        aspectRatio: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        
        
    },
    TimeText: {
        fontFamily: 'Sen',
        fontSize: 12,
        color: '#061624',
        marginTop: 5,
        fontWeight: 'bold',
    },
    descriptionTimeText: {
        fontFamily: 'Sen',
        fontSize: 12,
        color: 'gray',
        marginTop: 5,
    },
});

export default TimeContainer;
