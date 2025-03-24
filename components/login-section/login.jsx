import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useFonts } from "expo-font";
import { GrandHotel_400Regular } from "@expo-google-fonts/grand-hotel";
import { useEffect, useState } from "react";
import { EyeIconClosed, EyeIconOpen } from "../icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginPage = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    GrandHotel_400Regular,
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="white" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    const DataToSend = {
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:5002/user/login", DataToSend)
      .then((response) => {
        if (response.data && response.data.token) {
          AsyncStorage.setItem("token", response.data.token);
          navigation.navigate("Home");
        } else {
          console.log("Invalid response from server");
        }
      })
      .catch((error) => {
        const message = error.response.data.message;

        setTimeout(() => setIsLoading(false), 2000);
        setTimeout(() => setError(message), 2000);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={styles.logo}>RootSeek</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="E-mail address"
          placeholderTextColor="#808080"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <View style={styles.input}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#808080"
            value={password}
            onChangeText={setPassword} // Fixed: changed from onChange to onChangeText
            secureTextEntry={!seePassword}
            autoCapitalize="none"
          />
          <View style={{ position: "absolute", right: 10, top: 9 }}>
            <Pressable onPress={() => setSeePassword(!seePassword)}>
              {seePassword ? (
                <EyeIconOpen size={20} color="black" />
              ) : (
                <EyeIconClosed size={20} color="black" />
              )}
            </Pressable>
          </View>
        </View>

        <Text style={styles.forgotText}>Forgot your password?</Text>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.loginBtnText}>Log in to your account</Text>
          )}
        </TouchableOpacity>

        <Text style={{ color: "red" }}>{error}</Text>

        <View style={styles.orSection}>
          <View style={styles.line}></View>
          <Text>OR</Text>
          <View style={styles.line}></View>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.linkSignUp}>Don't have an account? </Text>

          <Pressable onPress={() => navigation.navigate("Sigin")}>
            <Text style={{ textDecorationLine: "underline" }}>Sign in</Text>
          </Pressable>
        </View>
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
    maxWidth: 350,
    color: "white",
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#DFDFDF",
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
