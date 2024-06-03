import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import Home from "../screens/Home/Home.screen";
import { theme } from "./styles.utils";
import Login from "../screens/Auth/Login/Login.screen";
import Register from "../screens/Auth/Register/Register.screen";
import { Timer } from "../screens/Home/Timer.screen";
import { CreateSequence } from "../screens/Home/components/CreateSequence.screen";

export const Stack = createNativeStackNavigator();
export const Tab = createMaterialBottomTabNavigator();

export const StackScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Timer" component={Timer} />
      <Stack.Screen name="CreateSequence" component={CreateSequence} />
      <Stack.Screen name="TabParent" component={BottomTabParent} />
    </Stack.Navigator>
  );
};

export const BottomTabParent = () => {
  return (
    <Tab.Navigator theme={theme}>
      <Tab.Screen component={Home} options={{tabBarIcon: "circle-multiple", tabBarLabel: 'Sequences'}} name="Home" />
    </Tab.Navigator>
  );
};
