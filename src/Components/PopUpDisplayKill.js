// PopUp.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Animated,
} from "react-native";

const PopUpDisplayKill = (props) => {
  return (
    <Modal visible={props.visible} transparent onRequestClose={props.exit}>
      <TouchableOpacity
        style={styles.View}
        onPress={props.exit}
        activeOpacity={1}
      >
        {props.isConfirmKill ? (
          <View style={styles.Container}>
            <Text style={styles.Titre}>Félicitation</Text>
            <Text style={styles.sousTitre}>
              Ta cible a confirmé sa mort. Tu viens de recevoir une nouvelle
              cible et une nouvelle mission
            </Text>
          </View>
        ) : (
          <View style={styles.Container}>
            <Text style={styles.Titre}>Dommage</Text>
            <Text style={styles.sousTitre}>
              Ta cible n'a pas confirmé sa mort. Tu n'as pas reçu de nouvelle
              cible
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  View: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  Container: {
    backgroundColor: "#FFF",
    width: "85%",
    borderRadius: 15,
    padding: 20,
  },
  Titre: {
    fontFamily: "LuckiestGuy",
    textAlign: "center",
    fontSize: 26,
    marginBottom: 5,
    color: "#F0122D",
  },
  sousTitre: {
    fontFamily: "Sen",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 5,
  },
});

export default PopUpDisplayKill;
