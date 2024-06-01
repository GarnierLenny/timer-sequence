import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, ScrollView, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Text, TextInput, Button, Portal, Modal } from 'react-native-paper';
import { InputForm } from "../../../utils/components/InputForm.utils";
import { commonStyles } from "../../../utils/styles.utils";
import { colors } from "../../../utils/colors.utils";
import { Module } from "../Home.screen";
import { formatSecondsString } from "../../../utils/utils.utils";
import ScrollPicker from "react-native-wheel-scrollview-picker";

const width = Dimensions.get('screen').width * 0.9;

const Picker = ({label, max, setter}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Text style={{marginBottom: 20}}>{label}</Text>
      <ScrollPicker
        dataSource={Array.from({ length: max + 1 }, (_, i) => i)}
        selectedIndex={1}
        style={{backgroundColor: '#f2f'}}
        renderItem={(data, index) => {
          return (
          <View style={{padding: 20}} key={index}>
            <Text variant="titleSmall" style={{fontFamily: 'Inter-Bold'}}>{data}</Text>
          </View>
        )}}
        onValueChange={(data, selectedIndex) => {
          //
        }}
        wrapperHeight={180}
        wrapperBackground="#fff"
        itemHeight={60}
        highlightColor="#d8d8d8"
        highlightBorderWidth={2}
      />
    </View>
  )
};

export const CreateSequence = ({ navigation }) => {
  const [name, setName] = useState<string>('');
  const [moduleTitle, setModuleTitle] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  // let sequence = ['3m', '4m', '', '', '', '', '', '']

  const [sequence, setSequence] = useState<Module[]>([
    { title: 'Start', duration: 3 },
    { title: 'test', duration: 5 },
    { title: '', duration: -1 },
    { title: 'End', duration: 0 },
  ]);

  // useEffect(() => {
  //   console.log('bb', sequence);
  // }, [sequence]);

  const deleteItem = (index: number) => {
    sequence.splice(index, 1);
    setSequence(sequence.map(item => item));
  };

  const createModule = (title: string, hours: any, minutes: any, seconds: any) => {
    setIsVisible(false);
    sequence.splice(sequence.length - 2, 0, {
      title: title,
      duration: 5,
    });
    // console.log('from', copy);
    // console.log('to', sequence);
    // console.log()
    setModuleTitle('');
  };

  return (
    <SafeAreaView style={{flex: 1, width: '90%', alignSelf: 'center', gap: 20}}>
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
        <InputForm capitalize="sentences" value={name} setter={setName} label="Enter sequence name" />
      </View>
      {/* <View style={{backgroundColor: '#0b2'}}> */}
        <Text variant="titleMedium" style={{fontFamily: 'Inter-Bold', marginBottom: 20}}>Organize your modules</Text>
        <ScrollView contentContainerStyle={styles.section3}>
        {sequence.map((item, index) => item.duration === -1 ?
        (
          <Button key={index} onPress={() => setIsVisible(true)} mode="contained" icon="plus" style={{borderRadius: 10}}>
            <Text variant="titleMedium" style={{color: colors.white}}>Create module</Text>
          </Button>
        )
        :
        (
          <View key={index} style={styles.mapElem}>
            <View style={{flexDirection: 'row', padding: 20}}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text variant="titleLarge" style={{fontFamily: 'Inter-Medium'}}>{item.title}</Text>
              </View>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontFamily: 'Inter-Medium'}}>{formatSecondsString(item.duration)}</Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', gap: 5}}>
                <Icon name="arrow-up" size={25} />
                <Icon name="arrow-down" size={25} />
                <Icon onPress={() => deleteItem(index)} name="delete" color={colors.redError} size={25} />
              </View>
            </View>
          </View>
        ))}
        </ScrollView>
      <Button style={{marginBottom: 15}}>
        <Text>Create sequence</Text>
      </Button>
      <Portal>
        <Modal dismissableBackButton={true} contentContainerStyle={styles.modalContainer} visible={isVisible} onDismiss={() => setIsVisible(false)}>
          <View style={{flex: 2, justifyContent: 'center', width: '85%'}}>
            <InputForm capitalize="sentences" value={moduleTitle} setter={setModuleTitle} label="Enter module name" />
          </View>
          <View style={{flex: 6, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{height: '80%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20}}>
              <Picker label="Hours" max={99} setter={() => {}} />
              <Picker label="Minutes" max={60} setter={() => {}} />
              <Picker label="Seconds" max={60} setter={() => {}} />
            </View>
          </View>
          <View style={{flex: 1, width: '95%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
            <Button onPress={() => setIsVisible(false)} mode="text">
              <Text style={{fontFamily: "Inter-Medium"}}>Cancel</Text>
            </Button>
            <Button onPress={() => createModule(moduleTitle, 0, 0, 0)} mode="text">
              <Text style={{fontFamily: "Inter-Medium"}}>Done</Text>
            </Button>
          </View>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.white,
    width: '80%',
    height: '50%',
    borderRadius: 5,
    alignSelf: 'center',
    alignItems: 'center',
  },
  section1: {
    marginTop: 20,
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
    backgroundColor: '#02f00000',
    justifyContent: 'flex-start',
    marginVertical: 30,
  },
  section3: {
    flex: 1,
    gap: 5,
    // backgroundColor: '#b3f',
  },
  mapElem: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
  },
});

{/* {sequences.map((item, index) => item.title === '' ?
(
  <View key={index} style={styles.mapElem}>
    {sequences[index - 1] !== undefined && <Icon name="plus" size={22} />}
  </View>
) :
(
  <View key={index} style={styles.mapElem}>
    <Text>toto</Text>
  </View>
))} */}