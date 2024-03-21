import React from 'react';
import LottieView from 'lottie-react-native';
import { View } from 'react-native';

export default function Animation() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
       <LottieView source={{ uri: 'https://assets8.lottiefiles.com/packages/lf20_wbeqyqgv.json' }} autoPlay loop />
    </View>
     
    

    
  );
}