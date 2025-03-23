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

const SigninPage = ({ navigation }) => {
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
      <Text style={styles.slogan}>
        Every day is a new story. Let's write yours.{" "}
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="example@gmail.com"
          placeholderTextColor="#808080"
          value={email}
          onChange={(el) => setEmail(el.target.value)}
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
            style={[styles.input, { flex: 1 }]}
            placeholder="First name"
            placeholderTextColor="#808080"
            value={email}
            onChange={(el) => setEmail(el.target.value)}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Last name"
            placeholderTextColor="#808080"
            value={email}
            onChange={(el) => setEmail(el.target.value)}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Username"
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
            secureTextEntry={!seePassword}
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

        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginBtnText}>Sign in to your account</Text>
        </TouchableOpacity>
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
          <Text style={styles.linkSignUp}>Have an account? </Text>

          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={{ textDecorationLine: "underline" }}>Login</Text>
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
