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
import { useContext, useState } from "react";
import tw from "tailwind-react-native-classnames";
import { EyeIconClosed, EyeIconOpen } from "../icons";
import axios from "axios";
import { Box, useColorMode } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { PhoneContext } from "../../App";

const SigninPage = ({ navigation }) => {
  const { usePhone } = useContext(PhoneContext);

  const address = usePhone ? "192.168.1.80:5002" : "localhost:5002";
  let [fontsLoaded] = useFonts({
    GrandHotel_400Regular,
  });

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [seePassword, setSeePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const onSignin = async () => {
    setIsLoading(true);

    try {
      const DataToSend = {
        email,
        firstName,
        lastName,
        username,
        password,
      };

      const response = await axios.post(
        `http://${address}/user/signin`,
        DataToSend
      );
      navigation.navigate("Verify", { extrEmail: email });
    } catch (error) {
      const message = error.response.data.message;
      setTimeout(() => setIsLoading(false), 2000);
      setTimeout(() => setMessage(message), 2000);
    }
  };

  return (
    <LinearGradient
      colors={["#F9FAFF", "#EAF0FF", "#FCEEF5"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ height: "100%" }}
    >
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text style={[styles.logo, { color: textColor }]}>RootSeek</Text>
        <Text style={[styles.slogan, { color: textColor }]}>
          Every day is a new story. Let's write yours.{" "}
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              { color: textColor, borderColor: borderColor },
            ]}
            placeholder="example@gmail.com"
            placeholderTextColor="#808080"
            value={email}
            onChangeText={setEmail}
          />

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <TextInput
              style={[
                styles.input,
                { color: textColor, flex: 1, borderColor: borderColor },
              ]}
              placeholder="First name"
              placeholderTextColor="#808080"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              style={[
                styles.input,
                { color: textColor, flex: 1, borderColor: borderColor },
              ]}
              placeholder="Last name"
              placeholderTextColor="#808080"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>

          <TextInput
            style={[
              styles.input,
              { color: textColor, borderColor: borderColor },
            ]}
            placeholder="Username"
            placeholderTextColor="#808080"
            value={username}
            onChangeText={setUsername}
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

          <TouchableOpacity
            style={[styles.loginBtn, { backgroundColor: textColor }]}
            onPress={onSignin}
          >
            {isLoading ? (
              <ActivityIndicator color={bgColor} />
            ) : (
              <Text style={[styles.loginBtnText, { color: bgColor }]}>
                Sign in to your account
              </Text>
            )}
          </TouchableOpacity>

          <Text style={{ color: "red" }}>{message}</Text>

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
              Have an account?{" "}
            </Text>

            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text
                style={{ textDecorationLine: "underline", color: textColor }}
              >
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </Box>
    </LinearGradient>
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
  slogan: {
    color: "black",
    fontSize: 10,
    fontWeight: 800,
    marginBottom: 4,
    marginTop: -8,
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
    marginTop: 10,
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

export default SigninPage;
