import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

const TargetAndMission = (props) => {
  return (
    <View>
      <View style={styles.mainContainer}>
        <Text style={styles.TextTitre}>Cible</Text>
        <View style={styles.targetContainer}>
          <Text style={styles.TextTarget}>{props.target}</Text>
        </View>
      </View>
      <View style={styles.mainContainer}>
        <Text style={styles.TextTitre}>Mission</Text>
        <View style={styles.targetContainer}>
          <Text style={styles.TextMission}>{props.mission}</Text>
        </View>
        <MessageMission number={props.number} />
      </View>
    </View>
  );
};

const MessageMission = (props) => {
  if (props.number === 0) {
    return (
      <Text style={styles.TextMissionRestante}>
        Tu ne peux plus changer de mission
      </Text>
    );
  } else {
    return (
      <Text style={styles.TextMissionRestante}>
        Tu peux encore changer de mission
        <Text style={{ fontWeight: "bold", color: "#FFF" }}>
          {" "}
          {props.number} fois{" "}
        </Text>
      </Text>
    );
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 20,
    alignItems: "center",
    maxWidth: "90%",
  },
  TextTitre: {
    fontSize: 46,
    fontFamily: "LuckiestGuy",
    color: "white",
  },
  targetContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    borderColor: "#F0122D",
    borderWidth: 2,
    borderRadius: 10,
  },
  TextTarget: {
    color: "white",
    textAlign: "center",
    fontSize: 35,
    fontFamily: "Sen",
  },
  TextMission: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Sen",
  },
  TextMissionRestante: {
    color: "gray",
    fontSize: 15,
    fontFamily: "Sen",
    marginTop: 10,
  },
});

export default TargetAndMission;
