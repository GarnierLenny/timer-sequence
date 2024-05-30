import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Text } from 'react-native-paper';

export const CreateSequence = ({ navigation }) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.section1}>
        <View style={styles.section1Back}>
          <Icon onPress={() => navigation.pop()} name='chevron-left' size={40} />
        </View>
        <View style={styles.section1Title}>
          <Text style={{fontFamily: 'Inter-Bold'}} variant="headlineSmall">Create sequence</Text>
        </View>
        <View style={styles.section1Options} />
      </View>
      <View style={styles.section2}>
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
    flex: 6,
    backgroundColor: '#02f00000',
  },
});
