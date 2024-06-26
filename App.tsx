import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import Toast from "react-native-toast-message";
import { LogBox } from "react-native";
import { useState } from "react";
import { StackScreen } from "./src/utils/navigators.utils";
import { UserContext } from "./src/utils/context.utils";
import { theme } from "./src/utils/styles.utils";

export default function App() {
  LogBox.ignoreLogs([
    "Warning: TextInput.Icon: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.",
    "Warning: TextInput.Icon: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.",
    'Non-serializable values were found in the navigation state',
  ]);
  const [user, setUser] = useState<any>(null);

  // useEffect(() => {
  //   if (user !== null) {
  //     console.log('(App.tsx) - user change!');
  //   }
  // }, [user]);

  const [fontsLoaded, fontError] = useFonts({
    Inter: require("./assets/fonts/Inter.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <PaperProvider>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <NavigationContainer theme={theme}>
          <UserContext.Provider value={{user, setUser}}>
            <StackScreen />
          </UserContext.Provider>
        </NavigationContainer>
        <Toast />
      </SafeAreaProvider>
    </PaperProvider>
  );
}
