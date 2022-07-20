import * as React from "react";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import Users from "./src/screens/Users";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} 
          options={{headerShown: false}}
        />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Users" component={Users} 
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}