import axios from "axios";
import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

const VerifPage = ({ route, navigation }) => {
  const [verifCode, setVerifCode] = useState("");
  const [message, setMessage] = useState("");
  const { extrEmail } = route.params;
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    const DataToSend = {
      email: extrEmail,
      verificationCode: verifCode,
    };
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5002/user-verify/verify",
        DataToSend
      );
      setTimeout(() => navigation.navigate("Login"), 2000);
    } catch (error) {
      const message = error.response.data.message;
      setMessage(message);
      setTimeout(() => setIsLoading(false), 2000);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Please verify yourself</Text>
      <Text style={styles.headerText}>
        Please enter the verification code we sent to your inbox below
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your code*"
        value={verifCode}
        onChangeText={setVerifCode}
      />
      <Text style={{ color: "red" }}>{message}</Text>

      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text
            style={{ color: "white", fontWeight: "500", textAlign: "center" }}
          >
            Continue
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  header: {
    fontWeight: "800",
    fontSize: 24,
  },
  headerText: {
    fontSize: 16,
    marginHorizontal: 24,
    textAlign: "center",
  },
  input: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: 250,
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 6,
    width: 250,
  },
});

export default VerifPage;
