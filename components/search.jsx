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

const Search = () => {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);

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
    <View style={styles.container}>
      <View style={styles.nestedContainer}>
        <View style={{ position: "relative" }}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search root"
            placeholderTextColor="#898989"
            value={search}
            onChangeText={setSearch}
          />
          <View style={{ position: "absolute", top: 11.5, left: 12 }}>
            <SearchIconOutline size={22} color="black" />
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
    marginTop: 60,
    paddingHorizontal: 5,
  },
  nestedContainer: {
    paddingHorizontal: 4,
  },
  searchBar: {
    padding: 12,
    backgroundColor: "#F8F8F8",
    borderRadius: 60,
    fontWeight: 400,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    fontSize: 16,
    paddingLeft: 36,
  },
});

export default Search;
