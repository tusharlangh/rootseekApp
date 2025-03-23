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
import { useState } from "react";
import { SearchIconOutline } from "./icons";

const Search = () => {
  const [search, setSearch] = useState("");
  return (
    <View style={styles.container}>
      <View style={styles.nestedContainer}>
        <View style={{ position: "relative" }}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search root"
            placeholderTextColor="#898989"
            value={search}
            onChange={(el) => setSearch(el.target.value)}
          />
          <View style={{ position: "absolute", top: 11.5, left: 12 }}>
            <SearchIconOutline size={22} color="black" />
          </View>
        </View>

        <DisplayPosts />
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
