// PopUp.js
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import { useDispatch, useSelector } from "react-redux";

const HostLeave = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isHost = useSelector((state) => state.user.hostFlag);
  const [isComponentMounted, setIsComponentMounted] = useState(false);

  useEffect(() => {
    const getIsHost = async () => {
      const hostFlag = await AsyncStorage.getItem("hostFlag");
      console.log("hostFlag : ", hostFlag);
      if (isHost && isComponentMounted && hostFlag === "false") {
        setIsVisible(true);
        AsyncStorage.setItem("hostFlag", JSON.stringify(true));
      }
    };

    getIsHost();
  }, [isHost]);

  useEffect(() => {
    setIsComponentMounted(true);
  }, []);

  const handleCancel = () => {
    setIsVisible(false);
  };

  return (
    <Modal visible={isVisible} transparent onRequestClose={handleCancel}>
      <TouchableOpacity
        style={styles.View}
        onPress={handleCancel}
        activeOpacity={1}
      >
        <View style={styles.Container}>
          <TouchableOpacity activeOpacity={1}>
            <Text style={styles.Titre}>
              Tu deviens organisateur de la partie
            </Text>
            <Text style={styles.Description}>
              Tu peux maintenant enlever des joueurs de la partie, tu reçois une
              nouvelle cible et une nouvelle mission{" "}
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleCancel}
                activeOpacity={0.5}
              >
                <Text style={styles.buttonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
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
  },
  Description: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Sen",
    marginTop: 20,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    borderRadius: 50,
    width: 110,
    backgroundColor: "#F0122D",
    height: 50,
    justifyContent: "center",
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
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
});

export default HostLeave;
