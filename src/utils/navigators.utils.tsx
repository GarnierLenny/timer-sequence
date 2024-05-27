import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import Home from "../screens/Home/Home.screen";
import { theme } from "./styles.utils";

export const Stack = createNativeStackNavigator();
export const Tab = createMaterialBottomTabNavigator();

export const BottomTabParent = () => {
  return (
    <Tab.Navigator theme={theme}>
      <Tab.Screen component={Home} options={{tabBarIcon: "circle-multiple", tabBarLabel: 'Sequences'}} name="Home" />
    </Tab.Navigator>
  );
};
