import React, { useEffect, useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles } from "../../utils/styles.utils";
import { Button, Text } from 'react-native-paper';
import { getAuth } from "firebase/auth";
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { colors } from "../../utils/colors.utils";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export const ActionButton = ({name, size, callback}: any) => {
  return (
    <TouchableOpacity style={{borderRadius: 10, padding: 10, borderWidth: 1}} onPress={callback}>
      <MaterialCommunityIcons name={name} size={size} />
    </TouchableOpacity>
  );
}

type Module = {
  title: string;
  duration: number;
};

const Home = ({ navigation }: any) => {
  // useEffect(() => {
  //   getAuth().signOut();
  // }, []);
  const sequences: {title: string; modules: Module[]}[] = [
    {
      title: 'Pomodoro',
      modules: [
        { title: 'Study', duration: 3 },
        { title: 'Break', duration: 2 },
      ],
    },
  ];

  return (
    <SafeAreaView style={{ ...commonStyles.viewWrapper, flex: 1 }}>
      <View style={styles.topContainer}>
        <Text variant="headlineSmall" style={{...commonStyles.primaryText}}>Your sequences</Text>
      </View>
      <View style={styles.bottomContainer}>
        <FlatList
          data={sequences}
          contentContainerStyle={styles.flatlist}
          renderItem={(sequence: any) => {
            return (
            <TouchableOpacity key={sequence.index} style={styles.flatlistElem}>
              <View style={styles.flatlistRight}>
                <View style={styles.flatlistTitleContainer}>
                  <Text variant="headlineSmall" style={styles.flatlistElemTitle}>{sequence.item.title}</Text>
                  <Text variant="labelMedium" style={styles.flatlistModuleNumber}>{sequence.item.modules.length} Modules</Text>
                </View>
                <View style={styles.flatlistElemModules}>
                  {sequence.item.modules.map((item: any, index: number) => (
                    <View key={index} style={styles.flatlistMapElem}>
                      <Text variant="labelSmall">{item.duration}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View style={styles.flatlistLeft}>
                <ActionButton name='play' size={20} callback={() => {navigation.navigate('Timer',  {sequence: sequences[sequence.index]})}} />
              </View>
            </TouchableOpacity>
          )}}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    backgroundColor: '#f2f00000',
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 7,
    backgroundColor: '#02f00000',
  },
  flatlistElem: {
    flexDirection: 'row',
    backgroundColor: colors.grayWhite,
    borderWidth: 1,
    padding:  '5%',
    alignItems: 'flex-start',
    borderColor: colors.gray5,
    borderRadius: 10,
  },
  flatlist: {
    gap: 10,
  },
  flatlistElemTitle: {
    fontFamily: 'Inter-Medium',
    marginBottom: '2%',
    // backgroundColor: '#ff2000'
  },
  flatlistLeft: {
    // backgroundColor: '#fad',
    marginLeft: '5%',
    alignSelf: 'center',
  },
  flatlistElemModules: {
    flex: 1,
    // backgroundColor: '#00f000',
    flexDirection: 'row',
    maxWidth: '100%',
    flexWrap: 'wrap',
  },
  flatlistRight: {
    flex: 4,
    // backgroundColor: '#00f',
  },
  flatlistMapElem:{
    paddingHorizontal: 5,
    borderWidth: 1,
    borderRadius: 15,
    margin: 2,
  },
  flatlistTitleContainer: {
    flexDirection: 'row',
    backgroundColor: '#ff200000',
    gap: 10
  },
  flatlistModuleNumber: {
    fontFamily: 'Inter-Medium',
    color: colors.gray4,
    alignSelf: 'center'
  },
});

export default Home;
