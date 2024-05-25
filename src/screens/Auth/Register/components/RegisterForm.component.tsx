import { useForm, Controller } from "react-hook-form";
import { Button, Text } from "react-native-paper";
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';
import { colors } from "../../../../utils/colors";
import { InputForm } from "../../../../utils/components/InputForm.utils";
import { commonStyles } from "../../../../utils/styles.utils";
import { useEffect } from "react";

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
    <KeyboardAvoidingView enabled behavior="height">
      <ScrollView indicatorStyle="default" automaticallyAdjustsScrollIndicatorInsets={true} showsHorizontalScrollIndicator={true}>
        <View style={{paddingBottom: 50, backgroundColor: '#f2f00000', gap: 15}}>
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
        </View>
      </ScrollView>
      <Button mode="contained" style={{borderRadius: 0}} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.signupButtonText}>Sign up</Text>
      </Button>
    </KeyboardAvoidingView>
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
