import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login from './src/screens/Auth/Login/Login.screen';
import Register from './src/screens/Auth/Register/Register.screen';
import { useFonts } from 'expo-font';
import Toast from 'react-native-toast-message'
import { LogBox } from 'react-native';
const Stack = createNativeStackNavigator();

export default function App() {
  LogBox.ignoreLogs(['Warning: TextInput.Icon: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.']);

  const [fontsLoaded, fontError] = useFonts({
    'Inter': require('./assets/fonts/Inter.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#fff',
    },
  };

  return (
    <PaperProvider>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <NavigationContainer theme={theme}>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </SafeAreaProvider>
    </PaperProvider>
  );
}
