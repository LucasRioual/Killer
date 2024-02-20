// PopUp.js
import React, { useRef } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const PopUpRegle = (props) => {
  return (
    <Modal visible={props.visible} transparent onRequestClose={props.exit}>
      <TouchableOpacity
        style={styles.View}
        onPress={props.exit}
        activeOpacity={1}
      >
        <View style={styles.Container}>
          <ScrollView style={styles.Scroll}>
            <TouchableOpacity activeOpacity={1}>
              <Text style={styles.Titre}>Règle du jeu</Text>
              <View style={styles.TextContainer}>
                <Text style={styles.SousTitre}>
                  Le but du jeu est d'être le dernier survivant en éliminant les
                  autres participants.{"\n"}
                  {"\n"}
                  <Text style={{ fontWeight: "bold" }}>
                    Comment se déroule une partie ?
                  </Text>
                  {"\n"}
                  {"\n"}• Au début du jeu, chaque joueur reçoit une cible (un
                  autre joueur) et une mission à réaliser {"\n"}
                  {"\n"}• Lorsqu’un joueur parvient à réaliser sa mission, il
                  reprend à son tour la mission et la cible du malheureux
                  défunt.
                  <Text style={{ fontStyle: "italic" }}>
                    {" "}
                    Il est conseillé de garder cette mort discrète.
                  </Text>
                  {"\n"}
                  {"\n"}• Une partie se termine lorsqu'il ne reste qu'un seul
                  joueur ou lorsque le chrono est terminé. Dans ce cas là, le
                  gagnant est le joueur qui a éliminé le plus de personne.{"\n"}
                  {"\n"}
                  <Text style={{ fontWeight: "bold" }}>
                    Les différents modes de jeu :
                  </Text>
                  {"\n"}
                  {"\n"}
                  <Text style={{ fontWeight: "bold", color: "#F0122D" }}>
                    • Classique :{" "}
                  </Text>
                  partie du Killer classique avec toutes les règles présentées
                  plus haut.{"\n"}
                  {"\n"}
                  <Text style={{ fontWeight: "bold", color: "#F0122D" }}>
                    • Mission ou pas mission :{" "}
                  </Text>
                  Le but est de réaliser une mission sans que les autres s'en
                  aperçoivent.
                </Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={props.exit}
                activeOpacity={0.5}
              >
                <Text style={styles.buttonText}>OK</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </ScrollView>
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
  Scroll: {
    padding: 20,
  },
  Container: {
    backgroundColor: "#FFF",
    width: 350,
    height: 400,
    borderRadius: 15,
  },
  Titre: {
    fontFamily: "LuckiestGuy",
    fontSize: 28,
    textAlign: "center",
    color: "#F0122D",
  },
  TextContainer: {
    marginTop: 10,
  },
  SousTitre: {
    fontFamily: "Sen",
    fontSize: 16,
    textAlign: "justify",
  },
  button: {
    backgroundColor: "#F0122D",
    borderRadius: 50,
    marginBottom: 40,
    alignSelf: "center",
    width: 120,
    height: 50,
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "LuckiestGuy",
    color: "white",
    textAlign: "center",
    fontSize: 28,
  },
});

export default PopUpRegle;
