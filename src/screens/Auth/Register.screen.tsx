import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Text, TextInput } from 'react-native-paper';
import { commonStyles } from "../../utils/styles.utils";
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from "../../utils/colors";
import { InputForm } from "../../utils/components/InputForm.utils";

const Register = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <SafeAreaView style={{...commonStyles.container, justifyContent: 'center'}}>
      <View style={{...commonStyles.viewWrapper, gap: 20}}>
        <InputForm label="Your email" value={email} setter={setEmail} />
        <InputForm label="Your password" value={password} setter={setPassword} />
        <Button mode="outlined">
          <Text style={{...commonStyles.primaryText, color: colors.white}}>Sign up</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Register;
