import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import DisplayPosts from "./display-posts";
import { use, useEffect, useState } from "react";
import { SearchIconOutline } from "./icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useColorMode } from "native-base";

const Search = () => {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "black" : "white";
  const bgColor = colorMode === "light" ? "#F2F1F5" : "black";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await axios.get(
          `http://localhost:5002/search/posts?q=${encodeURIComponent(search)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [search]);

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.nestedContainer}>
        <View style={{ position: "relative", paddingHorizontal: 2 }}>
          <TextInput
            style={[
              styles.searchBar,
              {
                backgroundColor: colorMode === "light" ? "#E4E3E8" : "#1C1C1E",
                color: textColor,
                borderColor: colorMode === "light" ? "#F0F0F0" : "#121212",
              },
            ]}
            placeholder="Search post"
            placeholderTextColor={colorMode === "light" ? "#494949" : "#97989F"}
            value={search}
            onChangeText={setSearch}
          />
          <View style={{ position: "absolute", top: 9, left: 12 }}>
            <SearchIconOutline
              size={22}
              color={colorMode === "light" ? "#848388" : "#97989F"}
            />
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <DisplayPosts posts={posts} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 5,
    height: "100%",
  },
  nestedContainer: {
    height: "100%",
    paddingHorizontal: 4,
  },
  searchBar: {
    padding: 8,
    borderRadius: 10,
    fontWeight: 400,
    fontSize: 20,
    paddingLeft: 40,
  },
});

export default Search;
