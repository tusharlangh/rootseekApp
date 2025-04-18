import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Pressable,
  Modal,
} from "react-native";
import DisplayPosts from "./display-posts";
import { useFonts } from "expo-font";
import { GrandHotel_400Regular } from "@expo-google-fonts/grand-hotel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { useColorMode } from "native-base";
import { AddIcon, CloseIcon, ShuffleIcon } from "./icons";
import Create from "./createpage/create";
import ViewPost from "./viewPost";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [shufflePosts, setShufflePosts] = useState([]);
  const [shuffleRandomNumber, setShuffleRandomNumber] = useState(0);
  let [fontsLoaded] = useFonts({
    GrandHotel_400Regular,
  });
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "black" : "white";
  const bgColor = colorMode === "light" ? "#F2F1F5" : "black";

  const [createVisible, setCreateVisible] = useState(false);
  const [shufflePostVisible, setShufflePostVisible] = useState(false);

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

  const activateShufflePost = async () => {
    try {
      if (shufflePosts.length === 0) {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          console.log("no token found.");
        }
        const response = await axios.get("http://localhost:5002/posts/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setShufflePosts(response.data);
      }

      const randomNumber = Math.floor(Math.random() * shufflePosts.length);
      setShuffleRandomNumber(randomNumber);
      setShufflePostVisible(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={textColor} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.nestedContainer}>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <View>
            <Text style={[styles.dailyText, { color: textColor }]}>
              Recently made
            </Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: textColor,
                width: 40,
                height: 40,
                borderRadius: 100,
              }}
            >
              <Text style={{ fontSize: 20, color: bgColor }}>T</Text>
            </View>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <DisplayPosts posts={posts} />
        </View>
      </View>
      <View style={{ position: "absolute", bottom: 72, right: 10 }}>
        <Pressable
          style={[
            styles.closeButton,
            {
              backgroundColor:
                colorMode === "light"
                  ? "rgba(207, 206, 206, 0.6)"
                  : "rgba(255, 255, 255, 0.8)",
              padding: 12,
            },
          ]}
          onPress={activateShufflePost}
        >
          <ShuffleIcon size={22} color="rgba(0, 0, 0, 0.8)" />
        </Pressable>
      </View>
      <View style={{ position: "absolute", bottom: 10, right: 10 }}>
        <Pressable
          style={[
            styles.closeButton,
            {
              backgroundColor:
                colorMode === "light"
                  ? "rgba(207, 206, 206, 0.6)"
                  : "rgba(255, 255, 255, 0.8)",
            },
          ]}
          onPress={() => setCreateVisible(true)}
        >
          <AddIcon size={32} color="rgba(0, 0, 0, 0.8)" />
        </Pressable>
      </View>
      <Modal
        visible={createVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setCreateVisible(false)}
      >
        <Create
          visible={createVisible}
          onClose={() => setCreateVisible(false)}
        />
      </Modal>

      <Modal
        visible={shufflePostVisible}
        animationType="none"
        transparent={true}
        onRequestClose={() => setShufflePostVisible(false)}
      >
        <ViewPost
          post={shufflePosts[shuffleRandomNumber]}
          setViewPostVisible={setShufflePostVisible}
          viewPostVisible={shufflePostVisible}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    color: "black",
    fontSize: 38,
    fontFamily: "GrandHotel_400Regular",
    marginTop: -10,
  },
  container: {
    height: "100%",
    paddingTop: 60,
    paddingHorizontal: 5,
  },
  nestedContainer: {
    height: "100%",
    paddingHorizontal: 4,
  },
  dailyText: {
    marginLeft: 8,
    fontSize: 32,
    fontWeight: "bold",
  },
  closeButton: {
    marginLeft: 10,
    padding: 12,
    borderRadius: 50,
  },
});

export default Home;
