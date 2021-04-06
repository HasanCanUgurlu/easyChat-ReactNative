import React from "react";
import ChatPage from "./components/ChatPage";
import PickUserName from "./components/PickUserName";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const globalStatusBarOptions = {
  headerStyle: { backgroundColor: "dodgerblue" },
  headerTitleStyle: { color: "white" },
  headerTintColor: "white",
};
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalStatusBarOptions}>
        <Stack.Screen name="PickUserName" component={PickUserName} />
        <Stack.Screen name="ChatPage" component={ChatPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
