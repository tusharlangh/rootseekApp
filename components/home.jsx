import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import DisplayPosts from "./display-posts";
import { useFonts } from "expo-font";
import { GrandHotel_400Regular } from "@expo-google-fonts/grand-hotel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  let [fontsLoaded] = useFonts({
    GrandHotel_400Regular,
  });
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await axios.get("http://localhost:5002/user/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

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
          <DisplayPosts posts={posts} />
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
    fontWeight: "800",
  },
});

export default Home;
