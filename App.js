import LoginPage from './components/login-section/login';
import SigninPage from './components/login-section/signin';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const LoginStack = createNativeStackNavigator();

const LoginNavigator = () => {
  return (
    <LoginStack.Navigator screenOptions={{ headerShown: false }}>
      <LoginStack.Screen name="Login" component={LoginPage} />
      <LoginStack.Screen name="Sigin" component={SigninPage} />
    </LoginStack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="User" component={LoginNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

