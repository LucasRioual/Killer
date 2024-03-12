import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const Podium = ({first, second, third}) => {
  return (
    <View style={styles.mainContainer}>
      <PodiumContainer name={second.userName} place="2" killNumber={second.numberKill} />
      <PodiumContainer name={first.userName} place="1" killNumber={first.numberKill} />
      <PodiumContainer name={third.userName} place="3" killNumber={third.numberKill} />
    </View>
  );
}

const PodiumContainer = ({ name, place, killNumber }) => {
  const podiumSize = getPodiumSize(place);

  return (
    <View style={[styles.podiumContainer, { marginHorizontal: 15 }]}>
      <Text style={styles.textPlayer}>{name}</Text>
      <View style={[styles.podium, podiumSize]}>
        <Text style={styles.textPodium}>{place}</Text>
      </View>
      <View style={styles.killContainer}>
        <Text style={styles.textKills}>{`${killNumber} kills`}</Text>
        <Svg  width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{transform: [{translateY: 2}]}}>
            <Path d="M5.55769 7.33333C5.10508 7.33333 4.66263 7.47018 4.28629 7.72657C3.90996 7.98296 3.61664 8.34738 3.44343 8.77374C3.27022 9.2001 3.2249 9.66926 3.3132 10.1219C3.4015 10.5745 3.61946 10.9903 3.93951 11.3166C4.25955 11.6429 4.66732 11.8651 5.11124 11.9552C5.55515 12.0452 6.01529 11.999 6.43345 11.8224C6.85161 11.6458 7.20902 11.3467 7.46048 10.963C7.71194 10.5793 7.84615 10.1282 7.84615 9.66667C7.84615 9.04783 7.60505 8.45434 7.17588 8.01675C6.74671 7.57917 6.16463 7.33333 5.55769 7.33333ZM5.55769 10.6667C5.36371 10.6667 5.17409 10.608 5.01281 10.4981C4.85152 10.3883 4.72581 10.2321 4.65158 10.0493C4.57735 9.86662 4.55792 9.66556 4.59577 9.47158C4.63361 9.2776 4.72702 9.09941 4.86418 8.95956C5.00135 8.81971 5.1761 8.72447 5.36635 8.68588C5.5566 8.6473 5.7538 8.6671 5.93302 8.74279C6.11223 8.81847 6.2654 8.94665 6.37317 9.1111C6.48094 9.27555 6.53846 9.46889 6.53846 9.66667C6.53846 9.93188 6.43513 10.1862 6.2512 10.3738C6.06727 10.5613 5.81781 10.6667 5.55769 10.6667ZM11.4423 7.33333C10.9897 7.33333 10.5472 7.47018 10.1709 7.72657C9.79457 7.98296 9.50125 8.34738 9.32804 8.77374C9.15484 9.2001 9.10952 9.66926 9.19782 10.1219C9.28612 10.5745 9.50407 10.9903 9.82412 11.3166C10.1442 11.6429 10.5519 11.8651 10.9959 11.9552C11.4398 12.0452 11.8999 11.999 12.3181 11.8224C12.7362 11.6458 13.0936 11.3467 13.3451 10.963C13.5966 10.5793 13.7308 10.1282 13.7308 9.66667C13.7308 9.04783 13.4897 8.45434 13.0605 8.01675C12.6313 7.57917 12.0492 7.33333 11.4423 7.33333ZM11.4423 10.6667C11.2483 10.6667 11.0587 10.608 10.8974 10.4981C10.7361 10.3883 10.6104 10.2321 10.5362 10.0493C10.462 9.86662 10.4425 9.66556 10.4804 9.47158C10.5182 9.2776 10.6116 9.09941 10.7488 8.95956C10.886 8.81971 11.0607 8.72447 11.251 8.68588C11.4412 8.6473 11.6384 8.6671 11.8176 8.74279C11.9968 8.81847 12.15 8.94665 12.2578 9.1111C12.3656 9.27555 12.4231 9.46889 12.4231 9.66667C12.4231 9.93188 12.3197 10.1862 12.1358 10.3738C11.9519 10.5613 11.7024 10.6667 11.4423 10.6667ZM8.5 0C3.81274 0 0 3.73833 0 8.33333C0 11.175 1.49322 13.8333 3.92308 15.3567V16.6667C3.92308 17.0203 4.06085 17.3594 4.30609 17.6095C4.55133 17.8595 4.88395 18 5.23077 18H11.7692C12.1161 18 12.4487 17.8595 12.6939 17.6095C12.9391 17.3594 13.0769 17.0203 13.0769 16.6667V15.3567C15.5068 13.8333 17 11.175 17 8.33333C17 3.73833 13.1873 0 8.5 0ZM12.106 14.3908C12.0039 14.4486 11.9188 14.5331 11.8596 14.6357C11.8004 14.7383 11.7692 14.8551 11.7692 14.9742V16.6667H10.4615V14.6667C10.4615 14.4899 10.3927 14.3203 10.27 14.1953C10.1474 14.0702 9.9811 14 9.80769 14C9.63428 14 9.46797 14.0702 9.34535 14.1953C9.22273 14.3203 9.15385 14.4899 9.15385 14.6667V16.6667H7.84615V14.6667C7.84615 14.4899 7.77727 14.3203 7.65465 14.1953C7.53203 14.0702 7.36572 14 7.19231 14C7.0189 14 6.85259 14.0702 6.72997 14.1953C6.60735 14.3203 6.53846 14.4899 6.53846 14.6667V16.6667H5.23077V14.9742C5.23083 14.8551 5.19963 14.7383 5.14041 14.6357C5.0812 14.5331 4.99613 14.4486 4.89404 14.3908C2.68159 13.1408 1.30769 10.82 1.30769 8.33333C1.30769 4.47333 4.53442 1.33333 8.5 1.33333C12.4656 1.33333 15.6923 4.47333 15.6923 8.33333C15.6923 10.8192 14.3184 13.1408 12.106 14.3908Z" fill="#F0122D"/>
        </Svg>

      </View>
    </View>
  );
}

const getPodiumSize = (place) => {
  let height;

  switch (place) {
    case '1':
      height = 150;
      break;
    case '2':
      height = 110;
      break;
    case '3':
      height = 80;
      break;
    default:
      height = 130;
  }

  return {
    height,
  };
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },

  podiumContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  podium: {
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    width:70,
  },
  textPlayer: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'LuckiestGuy',
    marginBottom: 8,
  },
  textPodium: {
    fontSize: 48,
    fontFamily: 'LuckiestGuy',
  },
  killContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  textKills: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'LuckiestGuy',
    marginTop: 8,
    marginRight: 5,
  },
});

export default Podium;
