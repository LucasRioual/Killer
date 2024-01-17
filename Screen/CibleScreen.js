import React, { useEffect, useState, useRef} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Animated, Easing } from 'react-native';
import Header from '../Components/Header';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setKilledBy, setConfirmKill } from '../Store/Reducer/gameSlice';
import PopUpConfirm from '../Components/PopUpConfirm';
import socket from '../Socket/socketManager';
import PopUpDisplayKill from '../Components/PopUpDisplayKill';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Path } from "react-native-svg";





const CibleScreen = ({navigation}) => {
  const listPlayer = useSelector((state) => state.game.listPlayer);
  const userId = useSelector((state) => state.user.userId);
  const userSurname = useSelector((state) => state.user.surname);
  const expoToken = useSelector((state) => state.user.expoToken);
  const gameCode = useSelector((state) => state.game.gameCode);
  const killedBy = useSelector((state) => state.game.killedBy);
  const isConfirmKill = useSelector((state) => state.game.isConfirmKill);
  const dispatch = useDispatch();
  const [targetAndMission, setTargetAndMission] = useState([]);
  const [isPopUpConfirmationVisible, setIsPopUpConfirmationVisible] = useState(false);
  const [isPopUpKilledConfirmationVisible, setIsPopUpKilledConfirmationVisible] = useState(false);
  const [messagePopUp, setMessagePopUp] = useState('');
  const [isPopUpDisplayKill, setIsPopUpDisplayKill] = useState(false);
  const [isPopUpLeaveVisible, setIsPopUpLeaveVisible] = useState(false);

  const [messagePopUpKilled, setMessagePopUpKilled] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const scaleAnim = useRef(new Animated.Value(2)).current;
  const scaleAnimMouth = useRef(new Animated.Value(1)).current;
  const opacityMouth = useRef(new Animated.Value(0)).current;
  const opacityFinger = useRef(new Animated.Value(0)).current;
  const txtChutOpacity = useRef(new Animated.Value(0)).current;
  const opacityBody = useRef(new Animated.Value(0)).current;

  const getTargetAndMission = () => {
   
    for (let i = 0; i < listPlayer.length; i++) {

      if (listPlayer[i].surname === userSurname) {
        return [listPlayer[i].target,listPlayer[i].mission];
      }
    }
    return ['',''];
  }

  useEffect(() => {

   
      
      const targetAndMission = getTargetAndMission();
      setTargetAndMission(targetAndMission);
    
    
    setMessagePopUp('Confirmes-tu le meurtre de ' + targetAndMission[0] + ' ?')
  },[listPlayer]);


  useEffect(() => {
    if (killedBy !== null) {
      setMessagePopUpKilled('Tu as été tué par ' + killedBy + ' ?');
      setIsPopUpKilledConfirmationVisible(true);
    }
  }, [killedBy]);

  useEffect(() => {
    if (isConfirmKill !== null) {
      setIsLoading(false);
      setIsPopUpDisplayKill(true);
    }  
  }, [isConfirmKill]);

  useEffect(() => {
        AsyncStorage.setItem('gameCode', gameCode);
        if(gameCode !== null){
          const dataToSend = {surname: userSurname, code: gameCode, expoToken: expoToken};
          socket.emit('connectRoom', dataToSend);
        }
       
  }, [gameCode]);

  
  useEffect(() => {
    
    animationDebut();
  }, []);


  const animationDebut = () => {
    Animated.sequence([
      Animated.parallel([
      Animated.timing(opacityMouth, {
        toValue: 1,
        duration: 200, // Durée de l'animation en millisecondes
        useNativeDriver: true, // Ajouter cette ligne pour améliorer les performances
      }),
      
        // after decay, in parallel:
        Animated.timing(scaleAnim, {
          toValue: 1,
           // Animate to smaller size
          duration: 500, // Durée de l'animation en millisecondes
          useNativeDriver: true, // Ajouter cette ligne pour améliorer les performances
        }),
        Animated.timing(opacityFinger, {
          toValue: 1,
           // Animate to smaller size
          duration: 200, // Durée de l'animation en millisecondes
          useNativeDriver: true, // Ajouter cette ligne pour améliorer les performances
        }),
      ]),
      Animated.timing(txtChutOpacity, {
        toValue: 1,
         // Animate to smaller size
        duration: 1500, // Durée de l'animation en millisecondes
        useNativeDriver: true, // Ajouter cette ligne pour améliorer les performances
      }),
      Animated.delay(1000),
      Animated.parallel([
        Animated.timing(txtChutOpacity, {
          toValue: 0,
           // Animate to smaller size
          duration: 300, // Durée de l'animation en millisecondes
          useNativeDriver: true, // Ajouter cette ligne pour améliorer les performances
        }),
        Animated.timing(opacityFinger, {
          toValue: 0,
           // Animate to smaller size
          duration: 300, // Durée de l'animation en millisecondes
          useNativeDriver: true, // Ajouter cette ligne pour améliorer les performances
        }),
        Animated.timing(opacityMouth, {
          toValue: 0,
           // Animate to smaller size
          duration: 300, // Durée de l'animation en millisecondes
          useNativeDriver: true, // Ajouter cette ligne pour améliorer les performances
        }),
        Animated.timing(opacityBody, {
          toValue: 1,
           // Animate to smaller size
          duration: 1500, // Durée de l'animation en millisecondes
          useNativeDriver: true, // Ajouter cette ligne pour améliorer les performances
        }),


      ])


      
    ]).start(); // start the sequence group
  };



  
  const handlePressKill = () => {
    setIsPopUpConfirmationVisible(true);
    
  };

  const getSocketId = (target) => {
    for (let i = 0; i < listPlayer.length; i++) {
      if (listPlayer[i].surname === target) {
        return listPlayer[i].socketId;
      }
    }
  }

  const getExpoToken = (target) => {
    for (let i = 0; i < listPlayer.length; i++) {
      if (listPlayer[i].surname === target) {
        return listPlayer[i].expoToken;
      }
    }
  }

  const handleConfirmationKilled = () => {
    console.log('Tu est mort');
    const socketKiller = getSocketId(killedBy);
    console.log('gameCode : ', gameCode);
    socket.emit("killed", gameCode, socketKiller, targetAndMission[0], targetAndMission[1]);
    setIsPopUpKilledConfirmationVisible(false);
    navigation.navigate('EndGame');

  };

  const handleCancelKilled = () => {
    const socketKiller = getSocketId(killedBy);
    dispatch(setKilledBy(null));
    setIsPopUpKilledConfirmationVisible(false);
    socket.emit("notKilled", socketKiller);
    //Il faut dire au tueur que la cible a refusé
  };


  const handleConfirmation = () => {
    const socketTarget = getSocketId(targetAndMission[0]);
    const expoTokenTarget = getExpoToken(targetAndMission[0]);
    socket.emit("confirmKill", socketTarget, userSurname, expoTokenTarget);
    setIsLoading(true);
    setIsPopUpConfirmationVisible(false);
  }

  const handleCancel = () => {
    setIsPopUpConfirmationVisible(false);
  }

  const handleCancelPopUpDisplayKill = () => {
    setIsPopUpDisplayKill(false);
    dispatch(setConfirmKill(null));
  }

  const leaveGame = () => {
    setIsPopUpLeaveVisible(false);
    socket.emit("leaveGame", gameCode, userSurname);
    AsyncStorage.removeItem('gameCode');
    navigation.navigate('Home');
  }
  


  return (
    <View style={styles.ViewMain}>
      
      <Header titre={""} navigation= {navigation} visible = {true} onClick = {()=>{setIsPopUpLeaveVisible(true)}}  />
      <Animated.View style={[styles.ViewBody, {opacity: opacityBody}]}>
          <View>
          <View style={styles.mainContainer}>
            <Text style={styles.TextTitre}>Cible</Text>
            <View style={styles.targetContainer}>
              <Text style={styles.TextTarget}>{targetAndMission[0]}</Text>

            </View>

          </View>
          <View style={styles.mainContainer}>
            <Text style={styles.TextTitre}>Mission</Text>
            <View style={styles.targetContainer}>
              <Text style={styles.TextMission}>{targetAndMission[1]}</Text>

            </View>

          </View>

          <View style={styles.buttonContainer}>

            {isLoading ? (
              <View style={styles.ViewLoading}>
                <ActivityIndicator size={50} color="#F0122D" />
                <Text style={styles.TextLoading}>En attente de ta cible ...</Text>
              </View>
            ) : (
              <TouchableOpacity style={styles.button} onPress={handlePressKill}>
              <Text style={styles.buttonText}>KILL</Text>
            </TouchableOpacity>
            )}

          </View>
        </View>
        
      </Animated.View>
      <PopUpConfirm message={messagePopUp} visible={isPopUpConfirmationVisible} exit={handleCancel} confirm= {handleConfirmation} />
      <PopUpConfirm message={messagePopUpKilled} visible={isPopUpKilledConfirmationVisible} exit={handleCancelKilled} confirm= {handleConfirmationKilled} />
      <PopUpConfirm message={'Es-tu sûr de vouloir quitter la partie ?'} visible={isPopUpLeaveVisible} exit={()=>setIsPopUpLeaveVisible(false)} confirm= {leaveGame} />
      <PopUpDisplayKill visible={isPopUpDisplayKill} exit={handleCancelPopUpDisplayKill} isConfirmKill={isConfirmKill} />
      <View style = {styles.ViewAnimation}>

        <Animated.View
          style={[
            styles.ChutContainer,
            {
              opacity: txtChutOpacity,
            }
          ]}>
        
          <Text style={styles.txtChut}>CHUUUUT !</Text>
        </Animated.View>

          <Animated.View style={[
              styles.SvgContainerMouth,
              {
                transform: [{ scale: scaleAnimMouth }],
                opacity: opacityMouth,
              }
            ]}>
            <Svg  width="100%" height="100%" viewBox="0 0 657 359" fill="none" xmlns="http://www.w3.org/2000/svg">
              <Path d="M334.035 28.8237L334.039 28.8221L351.141 20.0252L351.363 20.4731C351.364 20.4729 351.364 20.4727 351.364 20.4726C371.788 10.3353 391.815 0.421019 415.681 1.30922C475.573 3.56819 534.02 33.1507 575.904 61.8778C578.382 63.5775 581.09 65.3946 583.964 67.3233C596.531 75.7571 612.276 86.3232 625.828 98.5291C642.495 113.541 655.708 130.915 655.708 149.708C655.708 172.038 641.68 194.881 623.775 215.424C606.939 234.74 586.755 251.937 571.815 264.665C570.879 265.463 569.963 266.243 569.07 267.005C515.032 313.008 434.08 357.75 328.499 357.75C222.918 357.75 141.966 313.008 87.9283 266.945L87.9281 266.945C73.373 254.55 51.6975 235.975 33.6609 215.106C15.6041 194.212 1.29102 171.126 1.29102 149.708C1.29102 130.331 14.2773 113.105 30.8228 98.3181C43.8237 86.6994 58.9393 76.657 71.5041 68.3092C74.9206 66.0394 78.1484 63.8948 81.0939 61.878L81.0942 61.8778C122.979 33.1507 181.426 3.56819 241.318 1.30922L241.318 1.30921C265.183 0.39135 285.239 10.3346 305.663 20.4719C311.372 23.3686 317.139 26.1523 322.958 28.8214L322.963 28.8237C325.275 29.8527 326.872 30.4086 328.499 30.4086C330.127 30.4086 331.724 29.8527 334.035 28.8237ZM596.777 168.328L598.396 167.81L596.754 167.369C551.702 155.264 505.249 149.158 458.599 149.208C413.557 149.208 369.913 154.803 328.499 165.28C285.963 154.57 242.263 149.172 198.399 149.208C150.42 149.208 104.05 155.56 60.2442 167.369L58.6011 167.812L60.2227 168.328C146.965 195.944 237.468 209.932 328.5 209.792C422.485 209.792 512.775 195.186 596.777 168.328Z" fill="#F0122D" stroke="#F0122D"/>
            </Svg>

          </Animated.View>
          
          
          <Animated.View // Vue animée spéciale de React Native
           style={[
            styles.SvgContainerFinger,
            {
              transform: [{ scale: scaleAnim }],
              opacity: opacityFinger,
            }
          ]}>
            <Svg  width="100%" height="100%" viewBox="0 0 376 633" fill="none" xmlns="http://www.w3.org/2000/svg">
              <Path d="M142.315 113.996L143.317 213.22L142.926 235.287C142.536 255.147 142.146 263.455 141.756 267.998C141.626 269.036 134.602 269.556 117.954 269.945C92.2017 270.464 89.7305 270.984 82.8372 278.383C78.0248 283.575 76.5941 290.195 76.5941 307.719C76.5941 322.257 76.4641 323.166 73.3426 326.151C71.6517 327.969 69.5707 329.396 68.7903 329.396C68.01 329.396 65.2786 327.19 62.4173 324.334C53.703 315.637 34.9739 310.704 22.0976 313.82C17.4153 314.988 13.6435 317.065 8.18085 322.127C0.89731 328.747 0.637183 329.137 0.11693 336.795C-0.66345 347.31 2.32801 356.915 11.1723 372.492C20.2767 388.588 22.6179 395.078 27.3002 415.458C32.5027 438.434 36.6647 450.246 44.0783 463.097C47.59 469.198 51.1017 476.856 51.8821 479.972C59.6859 512.942 62.9375 520.731 74.9033 536.697C88.56 554.87 115.483 577.067 135.903 587.062C149.612 593.467 163.953 598.427 178.694 601.86C201.455 607.052 232.41 614.71 250.879 619.773C262.715 623.018 274.16 626.133 276.241 626.653C278.322 627.172 284.695 628.989 290.288 630.547C316.821 637.946 295.1 627.172 264.536 617.696C257.382 615.489 238.393 609.648 222.265 604.715C206.137 599.783 184.937 593.552 175.052 590.956C152.421 584.985 138.244 579.144 124.067 569.797C111.841 561.62 93.2422 545.394 84.3979 534.75C75.6837 524.625 66.8394 507.361 60.8565 488.539C57.3679 478.146 53.2859 467.961 48.6305 458.034C39.5261 439.342 31.5922 415.198 28.4707 396.117C27.4302 389.367 25.8695 385.213 22.6179 380.54C11.7056 364.833 2.7182 342.689 4.92927 336.795C7.27041 330.694 19.6264 322.257 29.3812 320.18C33.9378 318.947 38.7413 318.947 43.2979 320.18C50.7116 321.868 61.2467 328.747 62.8074 332.901C63.3277 334.069 62.8074 340.17 61.5068 346.401L59.4258 357.564L64.8884 369.766C69.3106 379.502 70.6112 384.304 71.6517 393.65C72.8223 404.814 72.6922 405.463 70.091 407.54C66.8394 410.136 60.7264 411.953 50.9717 413.251C37.0549 415.068 45.379 418.443 60.4663 417.145L70.091 416.367V425.972C70.0806 431.098 70.7364 436.203 72.0419 441.16C73.9929 446.482 73.9929 447.001 71.7818 448.558C69.3171 449.942 66.6978 451.031 63.978 451.804C60.8565 452.582 58.3853 453.751 58.3853 454.27C58.3853 455.828 70.8714 455.568 74.5131 453.881C77.1144 452.712 78.285 452.842 81.0163 454.789C84.3459 457.307 85.6335 460.643 83.0713 460.488C72.9264 459.904 66.1631 470.522 71.8208 478.946C74.305 482.646 75.2935 483.204 75.2935 481.14C75.2935 476.597 83.0973 466.991 89.0802 464.135C94.6729 461.409 95.1932 461.279 96.6239 463.356C97.6644 464.654 98.7049 471.924 99.2252 480.621C100.136 496.846 101.956 503.077 106.639 506.452C108.33 507.75 122.246 515.798 137.464 524.495L165.297 540.332L168.549 548.769C171.15 555.519 173.881 559.283 182.336 567.85C191.96 577.716 196.252 580.571 196.252 577.456C196.252 576.807 193.781 573.172 190.66 569.278C177.523 552.923 173.491 544.485 172.321 530.596C171.232 517.173 169.364 503.824 166.728 490.616C163.867 477.116 164.907 461.539 168.939 454.27C171.67 449.467 173.751 447.909 182.856 443.496C188.839 440.77 193.911 438.434 194.301 438.434C197 437.488 199.648 436.405 202.235 435.188C213.421 430.256 209.909 428.568 195.602 431.943C182.986 435.059 178.824 434.669 176.613 430.386C174.792 427.14 174.402 414.939 175.832 409.487C176.483 407.02 176.353 405.982 175.052 405.982C173.101 405.982 168.939 417.794 168.939 423.246C169.068 425.587 169.506 427.9 170.24 430.126C171.41 433.112 171.15 434.15 168.679 436.876C166.208 439.602 164.907 439.991 158.534 439.342C153.982 438.953 147.219 436.746 139.805 433.371C133.432 430.386 127.839 428.439 127.449 428.828C126.018 430.256 133.042 434.929 145.268 440.64C158.144 446.611 160.875 449.727 159.314 455.957C157.884 461.799 153.201 465.174 143.187 467.64C133.952 469.847 129.66 473.222 138.114 471.664C151.771 469.198 155.673 469.198 156.973 471.664C157.624 473.092 158.534 480.88 158.924 489.058C159.314 497.236 160.615 507.231 161.786 511.125C163.606 517.875 164.517 530.596 163.086 530.596C162.176 530.596 119.515 506.063 113.792 502.168C110.671 500.221 108.2 497.236 107.679 495.159C104.688 483.736 102.737 420.78 105.078 406.891C106.769 396.766 111.841 392.872 135.513 383.396C142.697 380.501 149.653 377.073 156.323 373.141C174.272 361.978 181.685 358.862 191.7 358.213C203.796 357.435 207.178 359.252 217.193 371.973C225.647 382.747 228.118 384.824 229.419 382.487C230.719 380.54 219.144 364.055 212.77 358.473C205.227 352.112 199.504 350.685 188.319 352.372C178.434 353.93 165.297 359.641 152.291 368.079C146.722 371.517 140.844 374.429 134.732 376.776C112.492 385.083 107.289 388.458 101.696 397.804C98.1847 403.905 98.0546 404.684 97.6644 424.804C97.2742 449.467 96.884 451.414 93.3723 451.414C86.479 451.414 81.1464 444.145 79.8457 433.241C79.4555 429.347 78.9353 414.939 78.6752 401.439C78.1549 375.607 77.2445 370.285 71.0014 361.459C64.4983 351.983 68.2701 338.483 79.4555 331.603C85.5685 327.709 86.8691 327.579 120.816 323.685C178.564 317.065 201.715 314.858 209.259 315.377C220.184 316.156 231.89 321.997 241.905 331.603C246.067 335.497 250.099 338.353 250.749 337.834C254.651 335.497 240.214 320.18 228.768 314.339C222.395 311.224 219.794 310.704 205.227 310.185C195.449 309.69 185.645 310.168 175.962 311.613C158.924 314.339 153.201 314.858 123.937 316.546C110.281 317.195 95.8435 318.622 91.8115 319.531L84.6581 321.219L83.8777 315.377C82.447 304.863 82.9672 291.623 85.0483 287.339C86.8753 284.26 89.4754 281.71 92.5919 279.94C97.7945 276.955 99.2252 276.825 118.865 276.825C130.31 276.955 146.178 277.604 153.982 278.512C161.786 279.421 179.474 281.368 193.001 282.666C233.581 286.95 236.312 287.469 246.587 292.402C257.768 297.819 266.662 307.018 271.689 318.363C277.412 330.694 277.542 332.122 283.395 403.386C284.695 419.742 289.638 447.26 292.629 454.919C293.28 456.866 294.97 464.005 296.271 470.755C299.523 487.111 303.685 497.885 308.627 502.817C312.009 506.192 314.09 507.101 321.113 507.88C333.209 509.308 338.542 511.774 345.305 519.433C352.588 527.481 361.563 533.971 367.025 535.269C370.277 535.918 371.448 535.529 373.529 533.062L376 530.077L370.277 528.519C361.943 526.351 354.628 521.347 349.597 514.37C343.614 506.063 338.672 503.467 326.966 502.168C318.772 501.26 316.301 500.351 313.309 497.495C304.595 489.188 297.442 457.905 289.248 393.001C281.704 333.42 278.452 319.272 269.218 305.252C262.585 295.128 258.553 291.493 247.627 286.301L238.653 282.017L236.312 272.282C234.231 263.195 229.939 236.715 228.118 220.229L227.207 212.96L222.837 166.451L219.521 127.34L216.204 75.4175L212.731 17.485C212.495 13.5647 211.02 9.82006 208.517 6.78898L208.127 6.32168C205.633 3.35955 202.123 1.43 198.281 0.908762L192.897 0.168866C190.206 -0.221088 187.46 0.0507243 184.898 0.960684C170.461 6.15293 158.885 20.6393 151.849 31.7377C146.756 39.7304 143.916 48.9454 143.629 58.4129L142.315 113.996ZM198.724 6.95773C202.365 8.3856 204.316 10.0731 205.227 12.9288C206.787 17.2124 207.178 50.1832 205.877 55.1158C204.837 58.8802 199.504 59.1398 197.553 55.6351C195.862 52.2601 192.741 37.592 191.7 26.5585C191.18 21.7556 190.139 17.8615 189.489 17.8615C187.668 17.8615 188.969 51.0918 190.92 56.4139C192.611 60.5677 197.423 63.2936 203.406 63.2936C206.007 63.2936 206.397 64.2023 207.048 71.3416C208.088 81.3367 210.039 110.024 211.86 143.773C212.77 157.663 213.941 172.85 214.591 177.523C215.242 182.196 217.193 196.085 219.013 208.547C220.753 220.203 221.839 231.947 222.265 243.724C222.265 252.551 223.045 258.392 224.606 263.325C225.985 267.043 227.072 270.862 227.858 274.748L228.768 279.161L216.802 278.253C201.065 277.084 150.6 271.243 149.95 270.594C149.69 270.335 149.039 262.806 148.649 253.979C147.739 236.585 149.43 220.1 152.681 213.869C155.282 208.936 162.046 207.119 175.572 207.638C183.246 207.898 185.847 207.638 185.847 206.34C185.847 203.744 179.604 202.056 166.728 201.278L154.892 200.499L153.462 192.581C152.031 184.013 148.779 157.793 147.479 142.995C146.438 132.61 148.649 115.346 151.641 109.505C153.462 106 153.982 105.87 159.575 106.649C168.939 107.817 169.85 106.13 163.216 100.548C151.771 91.0722 146.828 72.1205 150.6 52.2601C154.112 33.4382 166.728 16.0442 182.206 8.77502C191.7 4.2318 191.96 4.2318 198.724 6.95773Z" fill="white"/>
            </Svg>
          </Animated.View>
      
          
        
      </View>
      
   </View>
  );
};

const styles = StyleSheet.create({
  ViewMain: {
    flex: 1, 
    backgroundColor: '#061624',
  },
  View1: {
    justifyContent: "flex-end",
    alignItems: "flex-end",

  },

  ChutContainer: {
    
    position: 'absolute',
    top: '20%',
    alignSelf: 'center',
   
    
    
  },

  txtChut: {
    color: 'white',
    fontSize: 60,
    fontFamily: 'LuckiestGuy',
    alignSelf: 'center',
    
    
    
  },

  SvgContainerMouth: {
    position: 'absolute',
    alignSelf: 'center',
    width:"80%",
    height:"100%"
    
  },
  SvgContainerFinger: {
    position: 'absolute',
    bottom: -150,
    alignSelf: 'center',
    width:"60%",
    height:"100%",
    
    
  },
  ViewAnimation: {
    height: '100%',
    position: 'absolute',
    width: '100%',
    zIndex: -10,
    opacity: 1
  },
  
  ViewBody: {
    flex: 5, 
    alignItems:'center',
    
    
    
    
  },
  ViewLoading: {
    borderRadius: 20,
    padding: 40,
  },
  mainContainer: {
    marginTop: 0,
    marginBottom: 40,
    
    alignItems:'center',
    maxWidth: '90%',

  },
  
  menuButton: {
    
    position: 'absolute',
    right: 10,
    top: 10,
  },
  TextTitre: {
    fontSize: 46,
    fontFamily: 'LuckiestGuy',
    color: 'white',
  },
  targetContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    borderColor: '#F0122D',
    borderWidth: 2,
    borderRadius: 10,
    
    
  },
  TextTarget: {
    color: 'white',
    textAlign: 'center',
    fontSize: 35,
    fontFamily: 'Sen',
  },
  TextMission: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'Sen',
  },
  TextLoading: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Sen',
    marginTop: 20,
  },
  actionContainer: {
    marginBottom: 40,
    padding: 10,
    borderColor: 'red', // Couleur de la bordure de l'action
    borderWidth: 2,
    borderRadius: 10,
  },
  
  button: {
    backgroundColor:'#F0122D',
    borderRadius: 50,
    paddingHorizontal:40,
    paddingVertical:10,
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonContainer:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 42,
    fontFamily: 'LuckiestGuy',
    
  },
});

export default CibleScreen;
