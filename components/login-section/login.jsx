import {
  StyleSheet,
  View,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Pressable,
  Text,
} from "react-native";
import { useFonts } from "expo-font";
import { GrandHotel_400Regular } from "@expo-google-fonts/grand-hotel";
import { useState } from "react";
import { EyeIconClosed, EyeIconOpen } from "../icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Box, useColorModeValue, useColorMode } from "native-base";

const LoginPage = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    GrandHotel_400Regular,
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "black" : "white";
  const bgColor = colorMode === "light" ? "white" : "black";
  const borderColor = colorMode === "light" ? "#DFDFDF" : "#4A4A44";

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="white" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const handleLogin = async () => {
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
          navigation.navigate("Navbar");
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
    <Box flex={1} justifyContent="center" alignItems="center" bg={bgColor}>
      <Text style={[styles.logo, { color: textColor }]}>RootSeek</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { color: textColor, borderColor: borderColor }]}
          placeholder="E-mail address"
          placeholderTextColor="#808080"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <View>
          <TextInput
            style={[
              styles.input,
              { color: textColor, borderColor: borderColor },
            ]}
            placeholder="Password"
            placeholderTextColor="#808080"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!seePassword}
            autoCapitalize="none"
          />
          <View style={{ position: "absolute", right: 10, top: 9 }}>
            <Pressable onPress={() => setSeePassword(!seePassword)}>
              {seePassword ? (
                <EyeIconOpen size={20} color={textColor} />
              ) : (
                <EyeIconClosed size={20} color={textColor} />
              )}
            </Pressable>
          </View>
        </View>

        <Text style={[styles.forgotText, { color: textColor }]}>
          Forgot your password?
        </Text>

        <TouchableOpacity
          style={[
            styles.loginBtn,
            {
              backgroundColor: textColor,
            },
          ]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={bgColor} />
          ) : (
            <Text
              style={[
                styles.loginBtnText,
                { color: colorMode === "light" ? "white" : "black" },
              ]}
            >
              Log in to your account
            </Text>
          )}
        </TouchableOpacity>

        <Text style={{ color: "red" }}>{error}</Text>

        <View style={styles.orSection}>
          <View style={[styles.line, { backgroundColor: textColor }]}></View>
          <Text style={{ color: textColor }}>OR</Text>
          <View style={[styles.line, { backgroundColor: textColor }]}></View>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Text style={[styles.linkSignUp, { color: textColor }]}>
            Don't have an account?{" "}
          </Text>

          <Pressable onPress={() => navigation.navigate("Sigin")}>
            <Text style={{ textDecorationLine: "underline", color: textColor }}>
              Sign in
            </Text>
          </Pressable>
        </View>
      </View>
    </Box>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "white",
    fontSize: 20,
    marginTop: 10,
  },
  logo: {
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
    borderRadius: 6,
  },
  forgotText: {
    fontSize: 12,
    textAlign: "right",
  },
  loginBtn: {
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
  },
  linkSignUp: {
    textAlign: "center",
  },
});

export default LoginPage;
