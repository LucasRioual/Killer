import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  StyleSheet,
  ScrollView,
} from "react-native";

import Header from "../Components/Header";
import MissionContainer from "../Components/MissionContainer";
import OptionContainer from "../Components/OptionContainer";
import TimeContainer from "../Components/TimeContainer";

const SettingGameScreen = ({ navigation }) => {
  const [time, setTime] = useState(3600);
  const [join, setJoin] = useState(false);
  const [changeMission, setChangeMission] = useState(0);
  const [selectedMissions, setSelectedMissions] = useState(["Test"]);

  const MoveSalon = async () => {
    console.log("missions", selectedMissions);

    navigation.navigate("Salon", {
      setting: { time, join, changeMission },
      tagMission: selectedMissions,
    });
  };

  return (
    <View style={styles.ViewMain}>
      <Header
        titre="Classique"
        navigation={navigation}
        visible={false}
        onClickBack={() => navigation.navigate("Home")}
      />

      <View style={styles.ViewBody}>
        <ScrollView style={styles.ScrollView}>
          <View style={styles.ScrollViewContent}>
            <TimeContainer />
            <MissionContainer
              selectedMissions={selectedMissions}
              setSelectedMissions={setSelectedMissions}
            />
            <OptionContainer
              time={time}
              setTime={setTime}
              join={join}
              setJoin={setJoin}
              changeMission={changeMission}
              setChangeMission={setChangeMission}
            />
            <TouchableOpacity style={styles.button} onPress={MoveSalon}>
              <Text style={styles.buttonText}>LANCER</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  ViewMain: {
    // Conteneur principal de l'écran
    flex: 1,
    backgroundColor: "#061624",
  },
  ViewBody: {
    flex: 5,
  },
  ScrollView: {
    padding: 20,
  },
  ScrollViewContent: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#F0122D",
    borderRadius: 50,
    paddingHorizontal: 40,
    paddingVertical: 10,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 30,
    fontFamily: "LuckiestGuy",
  },
});

export default SettingGameScreen;
