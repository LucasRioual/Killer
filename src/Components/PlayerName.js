import React from "react";
import { StyleSheet, View, Text } from "react-native";

const PlayerName = (props) => {
  return (
    <View style={styles.ViewPlayer}>
      <View style={styles.NameContainer}>
        <Text style={styles.Name}>{props.label}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  NameContainer: {
    marginHorizontal: 4,
    marginVertical: 10,
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: "#061624",
    borderRadius: 5,
  },
  Name: {
    fontSize: 18,
    fontFamily: "Sen",
    color: "white",
  },
});

export default PlayerName;
