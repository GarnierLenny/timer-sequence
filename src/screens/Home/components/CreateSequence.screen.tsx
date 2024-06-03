import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, ScrollView, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Text, TextInput, Button, Portal, Modal } from 'react-native-paper';
import { InputForm } from "../../../utils/components/InputForm.utils";
import { commonStyles } from "../../../utils/styles.utils";
import { colors } from "../../../utils/colors.utils";
import { Module, formatSecondsString } from "../../../utils/utils.utils";
import ScrollPicker from "react-native-wheel-scrollview-picker";
import { createSequenceDb } from "../../../utils/firebase/firestore.utils";
import { UserContext } from "../../../utils/context.utils";
import { useRoute } from "@react-navigation/native";

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
            <Text variant="titleSmall" style={{fontFamily: 'Inter-Bold'}}>{data.toString().padStart(2, "0")}</Text>
          </View>
        )}}
        onValueChange={(data, selectedIndex) => {
          setter(data);
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

const CreateModuleModal = ({units, index, visible, title, sequence}: any) => {
  const createModule = (hours: any, minutes: any, seconds: any) => {
    visible.setIsVisible(false);
    if (title.moduleTitle === '') {
      title.moduleTitle = 'Awesome module';
    }
    sequence.sequence.splice(sequence.sequence.length - 2, 0, {
      title: title.moduleTitle,
      duration: seconds + (minutes * 60) + (hours * 3600),
    });
    title.setModuleTitle('');
  };

  const deleteModule = () => {
    sequence.sequence.splice(index.selectedIndex, 1);
    sequence.setSequence(sequence.sequence.map(item => item));
    visible.setIsVisible(false);
    index.setSelectedIndex(-1);
  };

  return (
    <Portal>
        <Modal dismissableBackButton={true} contentContainerStyle={styles.modalContainer} visible={visible.isVisible} onDismiss={() => visible.setIsVisible(false)}>
          <View style={{flex: 2, justifyContent: 'center', width: '85%'}}>
            <InputForm capitalize="sentences" value={title.moduleTitle} setter={title.setModuleTitle} label="Enter module name" />
          </View>
          <View style={{flex: 6, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{height: '80%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20}}>
              <Picker label="Hours" max={99} setter={units.setSeconds} />
              <Picker label="Minutes" max={60} setter={units.setMinutes} />
              <Picker label="Seconds" max={60} setter={units.setHours} />
            </View>
          </View>
          <View style={{flex: 1, width: '95%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              {index.selectedIndex !== -1 && (
                <Button onPress={() => deleteModule()} mode="text">
                  <Text style={{fontFamily: "Inter-Bold", color: colors.redError}}>Delete module</Text>
                </Button>
              )}
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
              <Button onPress={() => visible.setIsVisible(false)} mode="text">
                <Text style={{fontFamily: "Inter-Medium"}}>Cancel</Text>
              </Button>
              <Button onPress={() => createModule(units.seconds, units.minutes, units.hours)} mode="text">
                <Text style={{fontFamily: "Inter-Medium"}}>Done</Text>
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
  );
}

export const CreateSequence = ({ navigation }) => {
  const [name, setName] = useState<string>('');
  const [moduleTitle, setModuleTitle] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [seconds, setSeconds] = useState<number>(1);
  const [minutes, setMinutes] = useState<number>(1);
  const [hours, setHours] = useState<number>(1);
  const {user, setUser} = useContext(UserContext);
  const {refresh} = useRoute().params;

  const [sequence, setSequence] = useState<Module[]>([
    { title: 'Start', duration: 3 },
    { title: '', duration: -1 },
    { title: 'End', duration: 0 },
  ]);

  const changeOrder = (index: number, offset: number) => {
    if ((index === 1 && offset === -1) || (index === sequence.length - 3 && offset === 1))
      return;
    const tmp = sequence[index];
    sequence[index] = sequence[index + offset];
    sequence[index + offset] = tmp;
    setSequence(sequence.map(item => item));
  }

  const createSequence = async () => {
    createSequenceDb(user, name === '' ? "Awesome sequence" : name, sequence.filter(item => item.duration !== -1));
    refresh();
    navigation.pop();
  };

  return (
    <SafeAreaView style={{flex: 1, width: '90%', alignSelf: 'center', gap: 20}}>
      <View style={styles.section1}>
        <View style={styles.section1Back}>
          <Icon onPress={() => navigation.pop()} name='chevron-left' size={40} />
        </View>
        <View style={styles.section1Title}>
          <Text style={{fontFamily: 'Inter-Bold'}} variant="headlineSmall">Create a sequence</Text>
        </View>
        <View style={styles.section1Options} />
      </View>
      <View style={styles.section2}>
        <InputForm capitalize="sentences" value={name} setter={setName} label="Enter sequence name" />
      </View>
      {/* <View style={{backgroundColor: '#0b2'}}> */}
        <View style={{flexDirection: 'row', marginBottom: 20}}>
          <View style={{flex: 5}}>
            <Text variant="titleMedium" style={{fontFamily: 'Inter-Bold'}}>Organize your modules</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Text variant="titleMedium" style={{fontFamily: 'Inter-Medium'}}>{sequence.length - 3}/8</Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.section3}>
        {sequence.map((item, index) => item.duration === -1 ?
        (
          sequence.length < 11 && (
          <Button key={index} onPress={() => setIsVisible(true)} mode="contained" icon="plus" style={{borderRadius: 10}}>
            <Text variant="titleMedium" style={{color: colors.white}}>Create module</Text>
          </Button>)
        )
        :
        (
          <View key={index} style={styles.mapElem}>
            <View style={{flexDirection: 'row', padding: 20}}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text variant="titleSmall" style={{fontFamily: 'Inter-Bold'}}>{item.title}</Text>
              </View>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontFamily: 'Inter-Medium'}}>{formatSecondsString(item.duration)}</Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', gap: 5}}>
                {index !== 0 && index !== sequence.length - 1 && (
                <>
                  <Icon name="arrow-up" onPress={() => changeOrder(index, -1)} color={index === 1 ? colors.gray4 : colors.black} size={25} />
                  <Icon name="arrow-down" onPress={() => changeOrder(index, 1)} color={index === sequence.length - 3 ? colors.gray4 : colors.black} size={25} />
                  <Icon name="pencil" onPress={() => {setSelectedIndex(index); setIsVisible(true)}} size={25} />
                </>
                )}
              </View>
            </View>
          </View>
        ))}
        </ScrollView>
      <Button onPress={() => createSequence()} mode="contained" style={{marginBottom: 15}}>
        <Text style={{fontFamily: 'Inter-Bold', color: colors.white, paddingVertical: '3%'}}>Create sequence</Text>
      </Button>
      <CreateModuleModal units={{seconds, setSeconds, minutes, setMinutes, hours, setHours}} index={{selectedIndex, setSelectedIndex}} visible={{isVisible, setIsVisible}} sequence={{sequence, setSequence}} title={{moduleTitle, setModuleTitle}} />
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
    // flex: 1,
    gap: 8,
    paddingBottom: '5%',
    // backgroundColor: '#b3f',
    borderRadius: 20,
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