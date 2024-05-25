import { useForm, Controller } from "react-hook-form";
import { Button, Text } from "react-native-paper";
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { colors } from "../../../../utils/colors";
import { InputForm } from "../../../../utils/components/InputForm.utils";
import { commonStyles } from "../../../../utils/styles.utils";
import { useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type RegisterForm = {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm = ({navigation}: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (data: any) => {
    console.log(data);
  }

  const defaultRules = {
    required: true,
    maxLength: 20,
  };
  return (
    <View style={{flex: 2}}>
      <View style={{display: 'flex', flex: 2, justifyContent: 'center'}}>
        <KeyboardAwareScrollView contentContainerStyle={{justifyContent: 'center', flex: 1, gap: 15}}>
            <Controller
            control={control}
            rules={defaultRules}
            render={({field: {onChange, value}}) => (
              <View>
              <InputForm label="Username" value={value} setter={onChange}/>
              {errors.displayName && (<Text style={{...styles.errorText, marginTop: 5}}>This field is required</Text>)}
              </View>
            )}
            name="displayName"
            />
            <Controller
              control={control}
              rules={defaultRules}
              render={({field: {onChange, value}}) => (
              <View>
                <InputForm label="Email" value={value} setter={onChange} />
                {errors.displayName && (<Text style={{...styles.errorText, marginTop: 5}}>This field is required</Text>)}
              </View>
            )}
              name="email"
            />
            <Controller
              control={control}
              rules={defaultRules}
              render={({field: {onChange, value}}) => (
              <View>
                <InputForm label="Password" value={value} setter={onChange} />
                {errors.displayName && (<Text style={{...styles.errorText, marginTop: 5}}>This field is required</Text>)}
              </View>
            )}
              name="password"
            />
            <Controller
              control={control}
              rules={defaultRules}
              render={({field: {onChange, value}}) => (
              <View>
                <InputForm label="Confirm password" value={value} setter={onChange} />
                {errors.displayName && (<Text style={{...styles.errorText, marginTop: 5}}>This field is required</Text>)}
              </View>
              )}
              name="confirmPassword"
            />
        </KeyboardAwareScrollView>
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Button mode="contained" style={{borderRadius: 0}} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.signupButtonText}>Sign up</Text>
        </Button>
        <View style={{flexDirection: 'row', gap: 5, alignSelf: 'center', marginTop: '5%'}}>
          <Text style={{...commonStyles.secondaryText, color: colors.gray3}}>
            Already have an account?
          </Text>
          <Text onPress={() => navigation.navigate('Login')} style={{...commonStyles.secondaryText, color: colors.clickable, fontFamily: 'Inter-Bold'}}>
            Sign in
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: colors.redError,
    fontFamily: 'Inter-Medium',
    fontWeight: '800',
  },
  signupButtonText: {
    ...commonStyles.primaryText,
    color: colors.white,
    fontFamily: 'Inter-Bold',
    paddingVertical: 5
  }
});

export default RegisterForm;
