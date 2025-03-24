import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "./login";
import SigninPage from "./signin";
import VerifPage from "./verifPage";

const LoginStack = createNativeStackNavigator();

const LoginNavigator = () => {
  return (
    <LoginStack.Navigator screenOptions={{ headerShown: false }}>
      <LoginStack.Screen name="Login" component={LoginPage} />
      <LoginStack.Screen name="Sigin" component={SigninPage} />
      <LoginStack.Screen name="Verify" component={VerifPage} />
    </LoginStack.Navigator>
  );
};

export default LoginNavigator;
