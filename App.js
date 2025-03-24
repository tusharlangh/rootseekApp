import LoginNavigator from './components/login-section/login-navigator';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navbar from './components/navbar';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="User" component={LoginNavigator} />
        <Stack.Screen name="Home" component={Navbar} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

