import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

const { useSelector } = require("react-redux");

const Timer = () => {
  const coutdown = useSelector((state) => state.game.coutdown);

  const formatTime = (time) => {
    const days = Math.floor(time / (3600 * 24));
    const hours = Math.floor((time % (3600 * 24)) / 3600);
    const minutes = Math.floor((time % 3600) / 60);

    const formattedDays = String(days);
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const remainingSeconds = time % 60;

    if (days === 0) {
      if (hours === 0) {
        return `${formattedMinutes} m `;
      } else {
        return `${formattedHours} h ${formattedMinutes}`;
      }
    } else {
      return `${formattedDays} j ${formattedHours} h ${formattedMinutes} m`;
    }
  };

  return (
    <View style={styles.timerContainer}>
      <Svg
        width="45"
        height="45"
        viewBox="0 0 61 61"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M30.5 53.375C35.5557 53.375 40.4043 51.3666 43.9792 47.7917C47.5541 44.2168 49.5625 39.3682 49.5625 34.3125C49.5625 29.2568 47.5541 24.4082 43.9792 20.8333C40.4043 17.2584 35.5557 15.25 30.5 15.25C25.4443 15.25 20.5957 17.2584 17.0208 20.8333C13.4459 24.4082 11.4375 29.2568 11.4375 34.3125C11.4375 39.3682 13.4459 44.2168 17.0208 47.7917C20.5957 51.3666 25.4443 53.375 30.5 53.375ZM30.5 57.1875C24.4332 57.1875 18.6148 54.7775 14.3249 50.4876C10.035 46.1977 7.625 40.3793 7.625 34.3125C7.625 28.2457 10.035 22.4273 14.3249 18.1374C18.6148 13.8475 24.4332 11.4375 30.5 11.4375C36.5668 11.4375 42.3852 13.8475 46.6751 18.1374C50.965 22.4273 53.375 28.2457 53.375 34.3125C53.375 40.3793 50.965 46.1977 46.6751 50.4876C42.3852 54.7775 36.5668 57.1875 30.5 57.1875Z"
          fill="#F0122D"
        />
        <Path
          d="M30.4992 19.0625C31.0048 19.0625 31.4897 19.2633 31.8472 19.6208C32.2047 19.9783 32.4055 20.4632 32.4055 20.9688L32.375 34.3125C32.375 34.8181 32.1742 35.3029 31.8167 35.6604C31.4592 36.0179 30.9743 36.2188 30.4688 36.2188C29.9632 36.2188 29.4783 36.0179 29.1208 35.6604C28.7633 35.3029 28.5625 34.8181 28.5625 34.3125L28.593 20.9688C28.593 20.4632 28.7938 19.9783 29.1513 19.6208C29.5088 19.2633 29.9937 19.0625 30.4992 19.0625Z"
          fill="#F0122D"
        />
        <Path
          d="M26.6875 34.3125C26.6875 35.3236 27.0892 36.2934 27.8042 37.0083C28.5191 37.7233 29.4889 38.125 30.5 38.125C31.5111 38.125 32.4809 37.7233 33.1958 37.0083C33.9108 36.2934 34.3125 35.3236 34.3125 34.3125C34.3125 33.3014 33.9108 32.3316 33.1958 31.6167C32.4809 30.9017 31.5111 30.5 30.5 30.5C29.4889 30.5 28.5191 30.9017 27.8042 31.6167C27.0892 32.3316 26.6875 33.3014 26.6875 34.3125ZM32.4062 7.625V15.25H28.5938V7.625H22.875C22.3694 7.625 21.8846 7.42416 21.5271 7.06667C21.1696 6.70918 20.9688 6.22432 20.9688 5.71875C20.9688 5.21318 21.1696 4.72832 21.5271 4.37083C21.8846 4.01334 22.3694 3.8125 22.875 3.8125H38.125C38.6306 3.8125 39.1154 4.01334 39.4729 4.37083C39.8304 4.72832 40.0312 5.21318 40.0312 5.71875C40.0312 6.22432 39.8304 6.70918 39.4729 7.06667C39.1154 7.42416 38.6306 7.625 38.125 7.625H32.4062Z"
          fill="#F0122D"
        />
      </Svg>
      <Text style={styles.TextTimer}>{formatTime(coutdown)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  TextTimer: {
    color: "#F0122D",
    fontSize: 30,
    fontFamily: "LuckiestGuy",
    marginLeft: 10,
  },
});

export default Timer;
