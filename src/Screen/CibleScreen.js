import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState, useRef } from "react";
import {
  BackHandler,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Animated,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import GameAnimation from "../Components/GameAnimation";
import HeaderGame from "../Components/HeaderGame";
import PopUpConfirm from "../Components/PopUpConfirm";
import PopUpDisplayKill from "../Components/PopUpDisplayKill";
import ConfirmKilled from "../Components/PopUpGame/ConfirmKilled";
import HostLeave from "../Components/PopUpGame/HostLeave";
import LeaveGame from "../Components/PopUpGame/LeaveGame";
import NewPlayer from "../Components/PopUpGame/NewPlayer";
import TargetAndMission from "../Components/TargetAndMission";
import Timer from "../Components/Timer";
import socket from "../Socket/socketManager";
import {
  setConfirmKill,
  setMission,
  setNumberMission,
} from "../Store/Reducer/gameSlice";

const CibleScreen = ({ navigation }) => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  //const listPlayer = useSelector((state) => state.game.listPlayer);
  const target = useSelector((state) => state.game.target);
  const mission = useSelector((state) => state.game.mission);

  const userSurname = useSelector((state) => state.user.surname);
  const gameCode = useSelector((state) => state.game.gameCode);

  const isConfirmKill = useSelector((state) => state.game.isConfirmKill);
  const isHost = useSelector((state) => state.user.hostFlag);
  const dispatch = useDispatch();

  //const [targetAndMission, setTargetAndMission] = useState([]);
  const [isPopUpConfirmationVisible, setIsPopUpConfirmationVisible] =
    useState(false);

  const [isPopUpDisplayKill, setIsPopUpDisplayKill] = useState(false);
  const [isPopUpLeaveVisible, setIsPopUpLeaveVisible] = useState(false);
  const numberMission = useSelector((state) => state.game.numberMission);
  const [showSecondButton, setShowSecondButton] = useState(false);

  const [isTargetLoading, setIsTargetLoading] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const opacityBody = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const handleHardwareBackPress = () => {
      setIsPopUpLeaveVisible(true);
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", handleHardwareBackPress);
    if (numberMission > 0) {
      setShowSecondButton(true);
    }
    AsyncStorage.setItem("numberMission", JSON.stringify(numberMission));
    setIsTargetLoading(true);

    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleHardwareBackPress,
      );
    };
  }, []);

  useEffect(() => {
    /* if(target === userSurname){
      navigation.navigate('EndGame', {isWinner: true});
    } */
    if (target !== null) {
      setIsTargetLoading(false);
    }
  }, [target]);

  useEffect(() => {
    if (isConfirmKill !== null) {
      setIsLoading(false);
      setIsPopUpDisplayKill(true);
    }
  }, [isConfirmKill]);

  const handlePressKill = () => {
    setIsPopUpConfirmationVisible(true);
  };
  const handleConfirmation = () => {
    socket.emit("confirmKill", gameCode);
    setIsLoading(true);
    setIsPopUpConfirmationVisible(false);
  };
  const handleCancel = () => {
    setIsPopUpConfirmationVisible(false);
  };
  const handleCancelPopUpDisplayKill = () => {
    setIsPopUpDisplayKill(false);
    dispatch(setConfirmKill(null));
  };
  const leaveGame = () => {
    setIsPopUpLeaveVisible(false);
    socket.emit("leaveGame", gameCode, userSurname);
    AsyncStorage.removeItem("gameCode");
    AsyncStorage.removeItem("hostFlag");
    navigation.navigate("Home");
  };

  const getNewMission = async () => {
    const response = await fetch(
      `${apiUrl}/api/game/${gameCode}/${userSurname}`,
    );
    const data = await response.json();
    if (response.ok) {
      console.log(data);
      return data.mission;
    } else return;
  };

  const changeMission = async () => {
    if (numberMission > 0) {
      const newMission = await getNewMission();
      dispatch(setMission(newMission));
      dispatch(setNumberMission(numberMission - 1));
      AsyncStorage.setItem("numberMission", JSON.stringify(numberMission - 1));
      if (numberMission == 1) {
        setShowSecondButton(false);
      }
    }
  };

  return (
    <View style={styles.ViewMain}>
      <HeaderGame
        titre={gameCode}
        navigation={navigation}
        visible
        onClick={() => {
          setIsPopUpLeaveVisible(true);
        }}
        host={isHost}
      />
      {isTargetLoading ? (
        <View style={styles.TargetLoadingView}>
          <ActivityIndicator size={100} color="#F0122D" />
        </View>
      ) : (
        <Animated.View style={[styles.AnimationView, { opacity: opacityBody }]}>
          <View style={styles.ViewBody}>
            <ScrollView style={styles.ScrollView}>
              <View style={styles.ScrollViewContent}>
                <Timer />
                <TargetAndMission
                  target={target}
                  mission={mission}
                  number={numberMission}
                />
                <View style={styles.bottomContainer}>
                  {isLoading ? (
                    <View style={styles.ViewLoading}>
                      <ActivityIndicator size={50} color="#F0122D" />
                      <Text style={styles.TextLoading}>
                        En attente de ta cible ...
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.buttonContainer}>
                      {showSecondButton && (
                        <TouchableOpacity
                          style={styles.buttonChange}
                          onPress={changeMission}
                        >
                          <Text style={styles.buttonTextChange}>
                            Changer de mission
                          </Text>
                        </TouchableOpacity>
                      )}

                      <TouchableOpacity
                        style={styles.buttonKill}
                        onPress={handlePressKill}
                      >
                        <Text style={styles.buttonTextKill}>KILL</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            </ScrollView>
          </View>
        </Animated.View>
      )}

      <ConfirmKilled navigation={navigation} gameCode={gameCode} />
      <NewPlayer gameCode={gameCode} />
      <PopUpDisplayKill
        visible={isPopUpDisplayKill}
        exit={handleCancelPopUpDisplayKill}
        isConfirmKill={isConfirmKill}
      />
      <PopUpConfirm
        message={"Confirmes-tu le meurtre de " + target + " ?"}
        visible={isPopUpConfirmationVisible}
        exit={handleCancel}
        confirm={handleConfirmation}
      />
      <PopUpConfirm
        message="Es-tu sûr de vouloir quitter la partie ?"
        visible={isPopUpLeaveVisible}
        exit={() => setIsPopUpLeaveVisible(false)}
        confirm={leaveGame}
      />
      <HostLeave />
      <LeaveGame />

      <GameAnimation opacityBody={opacityBody} gameCode={gameCode} />
    </View>
  );
};

const styles = StyleSheet.create({
  ViewMain: {
    flex: 1,
    backgroundColor: "#061624",
  },
  View1: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },

  AnimationView: {
    flex: 5,
  },
  TargetLoadingView: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  ViewBody: {
    flex: 1,
  },
  ScrollView: {
    padding: 20,
  },
  ScrollViewContent: {
    alignItems: "center",
  },
  ViewLoading: {
    borderRadius: 20,
    padding: 40,
  },

  TextLoading: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Sen",
    marginTop: 20,
  },
  actionContainer: {
    marginBottom: 40,
    padding: 10,
    borderColor: "red", // Couleur de la bordure de l'action
    borderWidth: 2,
    borderRadius: 10,
  },

  buttonKill: {
    backgroundColor: "#F0122D",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    width: 160,
    height: 70,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonChange: {
    backgroundColor: "gray",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    width: 160,
    height: 70,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bottomContainer: {
    paddingVertical: 20,
    width: "100%",
    marginVertical: 20,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  buttonTextKill: {
    color: "white",
    textAlign: "center",
    fontSize: 36,
    fontFamily: "LuckiestGuy",
  },
  buttonTextChange: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "LuckiestGuy",
    padding: 10,
  },
});

export default CibleScreen;
