import React from "react";
import { commonStyles } from "../../../utils/styles.utils";
import { SafeAreaView } from "react-native-safe-area-context";
import RegisterForm from "./components/RegisterForm.component";
import RegisterTitle from "./components/RegisterTitle.component";

const Register = ({ navigation }: any) => {
  return (
    <SafeAreaView style={{ ...commonStyles.viewWrapper, flex: 1 }}>
      <RegisterTitle />
      <RegisterForm navigation={navigation} />
    </SafeAreaView>
  );
};

export default Register;
