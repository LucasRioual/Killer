import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Svg, { Circle, Path, Line } from "react-native-svg";

const OptionContainer = (props) => {
  const options = [
    { key: 3600, label: "1 h" },
    { key: 7200, label: "2 h" },
    { key: 10800, label: "3 h" },
    { key: 14400, label: "4 h" },
  ];

  const changeMissionOptions = [
    { key: 0, label: "Non" },
    { key: 1, label: "1 fois" },
    { key: 2, label: "2 fois" },
    { key: 3, label: "3 fois" },
  ];

  const handleOptionSelection = (key, setter) => {
    setter(key === setter ? null : key);
  };

  return (
    <View style={styles.MainContainer}>
      <OptionSection
        title="Durée de la partie :"
        options={options}
        selectedOption={props.time}
        onOptionSelect={(key) => handleOptionSelection(key, props.setTime)}
        info="Un chronomètre sera lancé au début de la partie. Si la partie n'est pas terminée à la fin du temps imparti, le joueurs avec le plus de kill remportera la partie"
      />

      <OptionSection
        title="Rejoindre en cours de partie :"
        options={[
          { key: true, label: "Oui" },
          { key: false, label: "Non" },
        ]}
        selectedOption={props.join}
        onOptionSelect={(key) => handleOptionSelection(key, props.setJoin)}
        info="Si un joueurs souhaite rejoindre une partie en cours de route, tu recevras une demande d'intégration. Les missions et les cibles seront réarrangées pour le bon fonctionnement de la partie"
      />

      <OptionSection
        title="Possibilité de changer de missions :"
        options={changeMissionOptions}
        selectedOption={props.changeMission}
        onOptionSelect={(key) =>
          handleOptionSelection(key, props.setChangeMission)
        }
        info="Si tu ne souhaites pas changer de mission, tu pourras la refaire autant de fois que tu le souhaites"
      />
    </View>
  );
};

const OptionSection = ({
  title,
  options,
  selectedOption,
  onOptionSelect,
  info,
}) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      <View style={styles.TitleContainer}>
        <Text style={styles.TextOption}>{title}</Text>
        <TouchableOpacity
          style={styles.ImgInfo}
          onPress={() => setShowInfo(!showInfo)}
        >
          <Svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM11 11V17H13V11H11ZM11 7V9H13V7H11Z"
              fill="white"
            />
          </Svg>
        </TouchableOpacity>
      </View>
      {showInfo && (
        <View style={styles.InfoContainer}>
          <Text style={styles.TextInfo}>{info}</Text>
        </View>
      )}

      <View style={styles.ChoiceContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.ButtonChoice,
              index === 0 && styles.FirstButtonChoice,
              index === options.length - 1 && styles.LastButtonChoice,
              {
                backgroundColor:
                  selectedOption === option.key ? "#F0122D" : "white",
              },
            ]}
            onPress={() => onOptionSelect(option.key)}
          >
            <Text
              style={[
                styles.TextChoice,
                { color: selectedOption === option.key ? "white" : "black" },
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  TitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ImgInfo: {
    marginLeft: 10,
  },
  InfoContainer: {
    width: "90%",
    marginVertical: 5,
  },
  TextInfo: {
    color: "gray",
    fontSize: 12,
    fontFamily: "Sen",
  },

  TextOption: {
    color: "white",
    fontSize: 15,
    fontFamily: "Sen",
  },
  ChoiceContainer: {
    flexDirection: "row",
    marginVertical: 20,
  },
  FirstButtonChoice: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  ButtonChoice: {
    marginHorizontal: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#FFF",
  },
  LastButtonChoice: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  TextChoice: {
    fontSize: 15,
    fontFamily: "Sen",
  },
});

export default OptionContainer;
