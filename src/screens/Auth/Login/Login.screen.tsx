import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from "../../../utils/colors.utils";
import { commonStyles } from "../../../utils/styles.utils";
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import LoginTitle from "./components/LoginTitle.component";
import LoginForm from "./components/LoginForm.component";

const Login = ({navigation}) => {

  return (
    <SafeAreaView style={{...commonStyles.viewWrapper, flex: 1}}>
      <LoginTitle />
      <LoginForm navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

});

export default Login;
