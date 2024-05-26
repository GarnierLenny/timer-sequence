import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import Home from "../screens/Home/Home.screen";

export const Stack = createNativeStackNavigator();
export const Tab = createMaterialBottomTabNavigator();

export const BottomTabParent = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen component={Home} options={{tabBarIcon: "home"}} name="Home" />
    </Tab.Navigator>
  );
};
