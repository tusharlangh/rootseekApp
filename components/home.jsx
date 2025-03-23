import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import DisplayPosts from "./display-posts";
import { useFonts } from "expo-font";
import { GrandHotel_400Regular } from "@expo-google-fonts/grand-hotel";

const Home = () => {
  let [fontsLoaded] = useFonts({
    GrandHotel_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="white" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.nestedContainer}>
        <Text style={styles.dailyText}>Your daily log</Text>

        <View>
          <DisplayPosts />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    color: "black",
    fontSize: 30,
    fontFamily: "GrandHotel_400Regular",
    marginLeft: 10,
    marginTop: -10,
  },
  container: {
    marginTop: 60,
    paddingHorizontal: 5,
  },
  nestedContainer: {
    paddingHorizontal: 4,
  },
  dailyText: {
    marginLeft: 4,
    fontSize: 24,
    fontWeight: "700",
  },
});

export default Home;
