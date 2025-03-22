import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useFonts } from "expo-font";
import { GrandHotel_400Regular } from "@expo-google-fonts/grand-hotel";
import { useState } from "react";
import tw from "tailwind-react-native-classnames";
import { EyeIconClosed, EyeIconOpen } from "../icons";

const LoginPage = () => {
  let [fontsLoaded] = useFonts({
    GrandHotel_400Regular,
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [seePassword, setSeePassword] = useState(false);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="white" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={styles.logo}>RootSeek</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="E-mail address"
          placeholderTextColor="#808080"
          value={email}
          onChange={(el) => setEmail(el.target.value)}
        />
        <View style={styles.input}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#808080"
            value={password}
            onChange={(el) => setPassword(el.target.value)}
            secureTextEntry={seePassword}
          />
          <View style={{ position: "absolute", right: 10, top: 9 }}>
            <Pressable onPress={() => setSeePassword(!seePassword)}>
              {seePassword ? (
                <EyeIconClosed size={20} color="black" />
              ) : (
                <EyeIconOpen size={20} color="black" />
              )}
            </Pressable>
          </View>
        </View>

        <Text style={styles.forgotText}>Forgot your password?</Text>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginBtnText}>Log in to your account</Text>
        </TouchableOpacity>
        <View style={styles.orSection}>
          <View style={styles.line}></View>
          <Text>OR</Text>
          <View style={styles.line}></View>
        </View>
        <Text style={styles.linkSignUp}>
          Don't have an account?{" "}
          <Text style={{ textDecorationLine: "underline" }}>Sign Up</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "black",
  },
  loadingText: {
    color: "white",
    fontSize: 20,
    marginTop: 10,
  },
  logo: {
    color: "black",
    fontSize: 50,
    fontFamily: "GrandHotel_400Regular",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    gap: 12,
    marginTop: 12,
    maxWidth: 300,
    color: "white",
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    borderRadius: 6,
    color: "black",
  },
  forgotText: {
    color: "black",
    fontSize: 12,
    textAlign: "right",
  },
  loginBtn: {
    backgroundColor: "black",
    borderRadius: 6,
    padding: 14,
  },
  loginBtnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "500",
  },
  orSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    marginTop: 20,
  },
  line: {
    height: 1,
    width: "40%",
    backgroundColor: "black",
  },
  linkSignUp: {
    textAlign: "center",
  },
});

export default LoginPage;
