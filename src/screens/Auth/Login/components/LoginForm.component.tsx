import { useForm, Controller } from "react-hook-form";
import { Button, Text, TextInput } from "react-native-paper";
import { ScrollView, StyleSheet, View } from "react-native";
import { colors } from "../../../../utils/colors.utils";
import { InputForm } from "../../../../utils/components/InputForm.utils";
import { commonStyles } from "../../../../utils/styles.utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  signInEmailPassword,
} from "../../../../utils/firebase/auth.utils";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { featureComingSoon } from "../../../../utils/utils.utils";
import { defaulFormRules } from "../../../../utils/constants.utils";

type LoginForm = {
  email: string;
  password: string;
}

const LoginForm = ({ navigation }: any) => {
  const [secure, setSecure] = useState<boolean>(true);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: any) => {
    signInEmailPassword(data.email, data.password);
  };

  return (
    <View style={{ flex: 2 }}>
      <View style={{ display: "flex", flex: 3, justifyContent: "center" }}>
        <KeyboardAwareScrollView
          contentContainerStyle={{ justifyContent: "center", flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{
              gap: 15,
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Controller
              control={control}
              rules={defaulFormRules}
              render={({ field: { onChange, value } }) => (
                <View>
                  <InputForm
                    type="email-address"
                    label="Email"
                    value={value}
                    setter={onChange}
                  />
                  {errors.email && (
                    <Text style={{ ...styles.errorText, marginTop: 5 }}>
                      This field is required
                    </Text>
                  )}
                </View>
              )}
              name="email"
            />
            <Controller
              control={control}
              rules={defaulFormRules}
              render={({ field: { onChange, value } }) => (
                <View>
                  <InputForm
                    label="Password"
                    value={value}
                    setter={onChange}
                    secure={secure}
                    right={
                      <TextInput.Icon
                        forceTextInputFocus={false}
                        onPress={() => setSecure(!secure)}
                        icon={secure ? "eye" : "eye-off"}
                      />
                    }
                  />
                  {errors.password && (
                    <Text style={{ ...styles.errorText, marginTop: 5 }}>
                      This field is required
                    </Text>
                  )}
                </View>
              )}
              name="password"
            />
            <View>
              <Text
                onPress={featureComingSoon}
                style={{
                  ...commonStyles.secondaryText,
                  color: colors.clickable,
                  alignSelf: "flex-end",
                  fontFamily: "Inter-Bold",
                }}
              >
                Forgot password ?
              </Text>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
      </View>
      <View style={{ flex: 1.5, justifyContent: "center" }}>
        <Button
          mode="contained"
          style={{ borderRadius: 0 }}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.signupButtonText}>Sign in</Text>
        </Button>
      </View>
      <View style={{ flex: 1.5, alignItems: "center" }}>
        <View
          style={{
            flex: 0.5,
            width: "100%",
            borderTopWidth: 1,
            borderColor: colors.gray4,
          }}
        >
          <Text
            style={{
              top: -10,
              backgroundColor: "#fff",
              alignSelf: "center",
              zIndex: 1,
            }}
          >
            OR
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            gap: 20,
            alignItems: "flex-start",
          }}
        >
          <Ionicons
            onPress={featureComingSoon}
            name="logo-google"
            size={30}
            color="#000"
          />
          <Ionicons
            onPress={featureComingSoon}
            name="logo-facebook"
            size={30}
            color="#000"
          />
          <Ionicons
            onPress={featureComingSoon}
            name="logo-apple"
            size={30}
            color="#000"
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            gap: 5,
            alignItems: "flex-start",
          }}
        >
          <Text style={{ ...commonStyles.secondaryText, color: colors.gray3 }}>
            Already have an account?
          </Text>
          <Text
            onPress={() => navigation.navigate("Register")}
            style={{
              ...commonStyles.secondaryText,
              color: colors.clickable,
              fontFamily: "Inter-Bold",
            }}
          >
            Sign up
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: colors.redError,
    fontFamily: "Inter-Medium",
    fontWeight: "800",
  },
  signupButtonText: {
    ...commonStyles.primaryText,
    color: colors.white,
    fontFamily: "Inter-Bold",
    paddingVertical: 5,
  },
});

export default LoginForm;
