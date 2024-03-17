import React from 'react';
import LottieView from 'lottie-react-native';

export default function Animation() {
  return (
    <LottieView source={require('../assets/animations/sadFace.json')} autoPlay loop />
  );
}