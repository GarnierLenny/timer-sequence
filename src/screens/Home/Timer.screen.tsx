import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { colors } from '../../utils/colors.utils';
import { useRoute } from '@react-navigation/native';
import { formatSeconds } from '../../utils/utils.utils';

const TimerActionButton = ({callback, label, name, size, color, disabled}: any) => {
  return (
    <TouchableOpacity disabled={disabled ? true : false} style={{alignItems: 'center'}} onPress={callback}>
      <Icon name={name} size={size} color={disabled ? colors.gray4 : colors.black} />
      {/* <Text>{label}</Text> */}
    </TouchableOpacity>
  );
};

export const Timer = ({ navigation }: any) => {
  const {sequence} = useRoute().params;
  const [currentModule, setCurrentModule] = useState<number>(0);
  const [play, setPlay] = useState<boolean>(true);
  const [restart, setRestart] = useState(0);

  const back = () => {
    navigation.pop();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.section1}>
        <View style={styles.section1Back}>
          <Icon onPress={back} name='chevron-left' size={40} />
        </View>
        <View style={styles.section1Title}>
          <Text style={{fontFamily: 'Inter-Bold'}} variant="headlineSmall">{sequence.title}</Text>
        </View>
        <View style={styles.section1Options}>
          <Icon name='cog' size={30} />
        </View>
      </View>
      <View style={styles.section2}>
        <View style={{flex: 6, justifyContent: 'center'}}>
          <CountdownCircleTimer
            isPlaying={play}
            size={250}
            key={restart}
            updateInterval={0}
            onComplete={() => {
              setCurrentModule(currentModule + 1);
              setRestart(restart + 1);
              const newDuration = sequence.modules[currentModule];
              if (newDuration === undefined)
                return;
              return { newInitialRemainingTime: sequence.modules[currentModule] ? 0 : newDuration.duration, shouldRepeat: currentModule === sequence.modules.length - 1 ? false : true, delay: 0 };
            }}
            strokeWidth={25}
            duration={sequence.modules[currentModule] === undefined ? 0 : sequence.modules[currentModule].duration}
            colors={[colors.primary, colors.primary]}
            colorsTime={[100, 0]}
          >
            {({ remainingTime }) => <Text variant="displaySmall" style={{fontFamily: 'Inter-Bold'}}>{formatSeconds(remainingTime)}</Text>}
          </CountdownCircleTimer>
        </View>
        <View style={styles.section2CurrentModule}>
          <View style={styles.moduleTextContainer}>
            {currentModule !== 0 && (
              <Text style={{fontFamily: 'Inter', color: colors.gray4}} variant="titleMedium">{sequence.modules[currentModule - 1] === undefined ? '' : sequence.modules[currentModule - 1].title}</Text>
            )}
          </View>
          <View style={styles.moduleTextContainer}>
            <Text style={{fontFamily: 'Inter-Bold'}} variant="titleLarge">{sequence.modules[currentModule] === undefined ? '' : sequence.modules[currentModule].title}</Text>
          </View>
          <View style={styles.moduleTextContainer}>
            {currentModule !== sequence.modules.length - 1 && (
              <Text style={{fontFamily: 'Inter', color: colors.gray4}} variant="titleMedium">{sequence.modules[currentModule + 1] === undefined ? '' : sequence.modules[currentModule + 1].title}</Text>
            )}
          </View>
        </View>
      </View>
      <View style={styles.section3}>
        <TimerActionButton callback={() => setPlay(true)} name="play" disabled={play} label="Play" color={colors.black} size={40} />
        <TimerActionButton callback={() => setPlay(false)} name="pause" disabled={!play} label="Pause" color={colors.black} size={40} />
        <TimerActionButton callback={() => {
          setCurrentModule(0);
          setRestart(restart + 1);
        }} name="replay" label="Restart" color={colors.black} size={40} />
        <TimerActionButton callback={() => {
          setCurrentModule(currentModule + 1);
          setRestart(restart + 1);
        }} name="skip-next" disabled={currentModule === sequence.modules.length - 1} label="Skip" color={colors.black} size={40} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  section1: {
    flex: 1,
    // backgroundColor: '#ff2',
    flexDirection: 'row',
  },
  section1Back: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
    // backgroundColor: '#0ff',
  },
  section1Title: {
    flex: 5,
    alignItems: 'center',
    justifyContent: "center",
    // backgroundColor: '#0af',
  },
  section1Options: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
    // backgroundColor: '#0ab',
  },
  section2: {
    flex: 5,
    // backgroundColor: '#fa2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  section2CurrentModule: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    // backgroundColor: '#9b2',
    width: '80%',
  },
  moduleTextContainer: {
    flex: 1,
    // backgroundColor: '#9b2',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center'
  },
  section3: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    flexDirection: 'row',
    // backgroundColor: '#af2',
  },
});