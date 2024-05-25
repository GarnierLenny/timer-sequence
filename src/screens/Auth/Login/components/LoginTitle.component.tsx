import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { commonStyles } from '../../../../utils/styles.utils';

const LoginTitle = () => {
  return (
    <View style={{gap: 20, flex: 1, justifyContent: 'center'}}>
      <Text variant="headlineLarge" style={{...commonStyles.primaryText, fontFamily: 'Inter-Bold'}}>Sign in to your account</Text>
      <View>
        <Text variant="titleLarge" style={{...commonStyles.primaryText, fontFamily: 'Inter-Medium'}}>Welcome back!</Text>
        <Text variant="titleLarge" style={{...commonStyles.primaryText, fontFamily: 'Inter-Medium'}}>Ready to sequence?</Text>
      </View>
    </View>
  );
};

export default LoginTitle;
