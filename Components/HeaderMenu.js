import React from 'react';
import { TouchableOpacity, StyleSheet,  } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const HeaderMenu = (props)  => {
  return (
    <TouchableOpacity style={styles.View} onPress={props.onClick}>
      <Svg width="48" height="48" viewBox="0 0 24 24">
        <Path fill={props.fill} d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
      </Svg>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
    View: {
        padding: 20,
        paddingBottom: 0,

    },
  });
  

export default HeaderMenu;
