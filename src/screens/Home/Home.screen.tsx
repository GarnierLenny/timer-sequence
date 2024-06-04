import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles } from "../../utils/styles.utils";
import { Button, Text } from 'react-native-paper';
import { getAuth } from "firebase/auth";
import { StyleSheet, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { colors } from "../../utils/colors.utils";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { UserContext } from "../../utils/context.utils";
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { getSequencesDb } from "../../utils/firebase/firestore.utils";
import { Module, featureComingSoon } from "../../utils/utils.utils";
import Logo from '../../assets/nothing.svg';

export const ActionButton = ({name, size, callback}: any) => {
  return (
    <TouchableOpacity style={{borderRadius: 10, padding: 10, borderWidth: 1}} onPress={callback}>
      <MaterialCommunityIcons name={name} size={size} />
    </TouchableOpacity>
  );
}

const formatModulesMap = (seconds: number) => {
  if (seconds > 3600) {
    const hours = Math.floor(seconds / 3600);
    return `${hours}h`;
  }
  if (seconds > 60) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m`;
  }
  return `${seconds}s`;
};

const Home = ({ navigation }: any) => {
  const {user} = useContext(UserContext);
  // useEffect(() => {
  //   getAuth().signOut();
  // }, []);

  const [sequences, setSequences] = useState<{title: string; modules: Module[]}[][]>([]);
  const [key, setKey] = useState<number>(0);

  useEffect(() => {
    // console.log('Render');
    const getSequences = async () => {
      const tmp: {title: string; modules: Module[]}[] = await getSequencesDb(user);
      setSequences(tmp);
    }

    if (user !== null)
      getSequences();

    return () => {};
  }, [user, key]);

  return (
    <SafeAreaView style={{ ...commonStyles.viewWrapper, flex: 1 }}>
      <View style={styles.topContainer}>
        <Text variant="headlineSmall" style={{...commonStyles.primaryText, fontFamily: 'Inter-Bold'}}>Your sequences</Text>
        <View style={{backgroundColor: colors.white, flexDirection: 'row'}}>
          <Icon name="plus" size={30} onPress={() => navigation.push('CreateSequence', {refresh: () => setKey(key + 1)})} />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        {sequences.length === 0 ?
        (
          <View style={{flex: 1}}>
            <View style={{flex: 2, backgroundColor: '#f0f20000', justifyContent: 'center', gap: 5}}>
              <Logo style={{alignSelf: 'center'}} width="60%" height="60%" />
              <Text variant="titleLarge" style={{fontFamily: 'Inter-Bold', alignSelf: 'center'}}>Time is running!</Text>
              <Text variant="titleMedium" style={{fontFamily: 'Inter-Medium', alignSelf: 'center'}}>You have no saved sequences yet</Text>
            </View>
            <View style={{flex: 1, backgroundColor: '#f0000002', gap: 10}}>
              <Button onPress={() => navigation.push("CreateSequence", {refresh: () => setKey(key + 1)})} mode="contained" style={{borderRadius: 10, paddingVertical: '2%'}}>
                <Text style={{fontFamily: 'Inter-Bold', color: colors.white}}>Create a sequence</Text>
              </Button>
              <Text style={{fontFamily: "Inter-Medium", alignSelf: 'center'}}>OR</Text>
              <Button onPress={() => featureComingSoon()} mode="outlined" style={{borderRadius: 10, paddingVertical: '2%'}}>
                <Text style={{fontFamily: 'Inter-Bold'}}>Browse public sequences</Text>
              </Button>
            </View>
          </View>
        )
        :
        (<FlatList
          data={sequences}
          contentContainerStyle={styles.flatlist}
          renderItem={(sequence: any) => {
            return (
            <TouchableOpacity key={sequence.index} style={styles.flatlistElem}>
              <View style={styles.flatlistRight}>
                <View style={styles.flatlistTitleContainer}>
                  <Text variant="titleMedium" style={styles.flatlistElemTitle}>{sequence.item.title}</Text>
                  <Text variant="labelMedium" style={styles.flatlistModuleNumber}>{sequence.item.modules.length} Modules</Text>
                </View>
                <View style={styles.flatlistElemModules}>
                  {sequence.item.modules.map((item: any, index: number) => (
                    <View key={index} style={styles.flatlistMapElem}>
                      <Text variant="labelSmall">{formatModulesMap(item.duration)}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View style={styles.flatlistLeft}>
                <ActionButton name='play' size={20} callback={() => {navigation.navigate('Timer',  {sequence: sequences[sequence.index]})}} />
              </View>
            </TouchableOpacity>
          )}}
        />)}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f2f00000',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    backgroundColor: '#fff',
    margin: 2,
  },
  flatlistTitleContainer: {
    backgroundColor: '#ff200000',
  },
  flatlistModuleNumber: {
    fontFamily: 'Inter-Medium',
    color: colors.gray4,
    marginBottom: '5%',
  },
});

export default Home;
