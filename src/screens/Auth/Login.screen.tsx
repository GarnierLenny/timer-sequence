import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from "../../utils/colors";
import { commonStyles } from "../../utils/styles.utils";
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';

const Login = ({navigation}) => {

  return (
    <SafeAreaView style={commonStyles.container}>
      <Text variant="headlineMedium" style={commonStyles.primaryText}>Log in to your account</Text>
      <Text variant="titleLarge" style={commonStyles.secondaryText}>Welcome back!</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

});

export default Login;
