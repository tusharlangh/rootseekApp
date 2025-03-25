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
  const bgColor = colorMode === "light" ? "white" : "#121212";

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
        <View style={{ position: "relative" }}>
          <TextInput
            style={[
              styles.searchBar,
              {
                backgroundColor: colorMode === "light" ? "#F9F9F9" : "#181818",
                color: textColor,
                borderColor: colorMode === "light" ? "#F0F0F0" : "#121212",
              },
            ]}
            placeholder="Search root"
            placeholderTextColor={textColor}
            value={search}
            onChangeText={setSearch}
          />
          <View style={{ position: "absolute", top: 11.5, left: 12 }}>
            <SearchIconOutline size={22} color={textColor} />
          </View>
        </View>
        <View>
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
  },
  nestedContainer: {
    paddingHorizontal: 4,
  },
  searchBar: {
    padding: 12,
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    fontWeight: 500,
    borderWidth: 1,
    fontSize: 16,
    paddingLeft: 36,
  },
});

export default Search;
