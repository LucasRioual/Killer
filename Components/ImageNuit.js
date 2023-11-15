import React from 'react';

import {StyleSheet, View, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const ImageNuit = (props) =>{
    
    return (
      <TouchableOpacity style={styles.View} onPress={props.onClick} activeOpacity={0.5}>
          <Svg  width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <Path fill={props.fill} d={props.d}/>
          </Svg>

            
        </TouchableOpacity>
      
    );
  }
  
  
  const styles = StyleSheet.create({
    View: {
        padding: 20,
 
    },
  });
  
export default ImageNuit;
  
  
  
  
  
  