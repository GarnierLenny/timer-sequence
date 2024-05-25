import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from 'react-native-paper';
import { commonStyles } from "../../../utils/styles.utils";
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from "../../../utils/colors";
import { InputForm } from "../../../utils/components/InputForm.utils";
import { signUpUserEmailPassword } from "../../../utils/firebase/auth.utils";
import { Controller, useForm } from 'react-hook-form';
import RegisterForm from "./components/RegisterForm.component";

export const RegisterTitle = () => {
  return (
    <View style={{backgroundColor: '#40200000', paddingVertical: '15%', gap: 20}}>
      <Text variant="displaySmall" style={{...commonStyles.primaryText, fontFamily: 'Inter-Bold'}}>Sign in to your account</Text>
      <View>
        <Text variant="headlineSmall" style={{...commonStyles.primaryText, fontFamily: 'Inter-Medium'}}>Welcome Back,</Text>
        <Text variant="headlineSmall" style={{...commonStyles.primaryText, fontFamily: 'Inter-Medium'}}>Ready to sequence?</Text>
      </View>
    </View>
  );
};

const Register = ({navigation}: any) => {
  return (
    <SafeAreaView style={{...commonStyles.container}}>
      <View style={{...commonStyles.viewWrapper}}>
        <RegisterTitle />
        <RegisterForm navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default Register;
