import React from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Tabs from "./navigation/tabs";
import { OrderDelivery, Restaurant } from "./screens";
import * as Font from "expo-font";
import { useEffect } from "react";

const Stack = createStackNavigator();

const App = () => {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);
  async function loadFonts() {
    await Font.loadAsync({
      RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
      "Roboto-Black": {
        uri: require("./assets/fonts/Roboto-Black.ttf"),
      },
      "Roboto-Regular": {
        uri: require("./assets/fonts/Roboto-Regular.ttf"),
      },
    });
    setFontsLoaded(true);
  }

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="OrderDelivery"
      >
        <Stack.Screen name="Home" component={Tabs} />
        <Stack.Screen name="Restaurant" component={Restaurant} />
        <Stack.Screen name="OrderDelivery" component={OrderDelivery} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
