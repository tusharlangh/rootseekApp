import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./home";
import MockUp from "./themeThread/mockup";
import { SafeAreaProvider } from "react-native-safe-area-context";

const HomeNavbar = () => {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaProvider>
      <Stack.Navigator
        initialRouteName="home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="mockup" component={MockUp} />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
};

export default HomeNavbar;
