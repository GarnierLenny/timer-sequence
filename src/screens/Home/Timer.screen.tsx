import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { colors } from '../../utils/colors.utils';

const TimerActionButton = ({callback, label, name, size, color}: any) => {
  return (
    <TouchableOpacity style={{alignItems: 'center'}} onPress={callback}>
      <Icon name={name} size={size} color={color} />
      {/* <Text>{label}</Text> */}
    </TouchableOpacity>
  );
};

export const Timer = ({ navigation }: any) => {
  const back = () => {
    navigation.pop();
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.section1}>
        <View style={styles.section1Back}>
          <Icon name='chevron-left' size={40} />
        </View>
        <View style={styles.section1Title}>
          <Text style={{fontFamily: 'Inter-Bold'}} variant="headlineSmall">Pomodoro</Text>
        </View>
        <View style={styles.section1Options}>
          <Icon name='cog' size={30} />
        </View>
      </View>
      <View style={styles.section2}>
        <View style={{flex: 6, justifyContent: 'center'}}>
          <CountdownCircleTimer
            isPlaying
            size={250}
            strokeWidth={25}
            duration={7}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
          >
            {({ remainingTime }) => <Text variant="displayMedium" style={{fontFamily: 'Inter-Bold'}}>{remainingTime}</Text>}
          </CountdownCircleTimer>
        </View>
        <View style={styles.section2CurrentModule}>
          <Text style={{fontFamily: 'Inter', color: colors.gray4}} variant="titleMedium">Break</Text>
          <Text style={{fontFamily: 'Inter-Bold'}} variant="titleLarge">Study</Text>
          <Text style={{fontFamily: 'Inter', color: colors.gray4}} variant="titleMedium">Break</Text>
        </View>
      </View>
      <View style={styles.section3}>
        <TimerActionButton callback={() => console.log('toto')} name="play" label="Play" color={colors.black} size={40} />
        <TimerActionButton callback={() => console.log('toto')} name="pause" label="Pause" color={colors.black} size={40} />
        <TimerActionButton callback={() => console.log('toto')} name="replay" label="Restart" color={colors.black} size={40} />
        <TimerActionButton callback={() => console.log('toto')} name="skip-next" label="Skip" color={colors.black} size={40} />
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    // backgroundColor: '#9b2',
    width: '80%',
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