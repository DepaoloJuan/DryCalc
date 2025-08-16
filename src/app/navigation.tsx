import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import MuroFormScreen from "../screens/MuroFormScreen";
import ResultadoScreen from "../screens/ResultadoScreen";
import CatalogoScreen from "../screens/CatalogoScreen";

export type RootStackParamList = {
  Home: undefined;
  MuroForm: undefined;
  Resultado: { ejemplo?: boolean } | undefined;
  Catalogo: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#2563eb",
    background: "#f8fafc",
    card: "#ffffff",
    text: "#334155",
    border: "#e2e8f0",
    notification: "#2563eb",
  },
};

export default function AppNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "DryCalc" }} />
        <Stack.Screen name="MuroForm" component={MuroFormScreen} options={{ title: "Muro" }} />
        <Stack.Screen
          name="Resultado"
          component={ResultadoScreen}
          options={{ title: "Resultado" }}
        />
        <Stack.Screen name="Catalogo" component={CatalogoScreen} options={{ title: "Catálogo" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
