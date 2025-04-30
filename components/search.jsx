import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Modal,
  Text,
  ScrollView,
  FlatList,
} from "react-native";
import DisplayPosts from "./display-posts";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { SearchIconOutline, ShuffleIcon } from "./icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useColorMode } from "native-base";
import ShuffledPost from "./shuffledPost";
import moment from "moment";
import { RefreshValue } from "./navbar";
import { useFocusEffect } from "@react-navigation/native";

export const PostsContext = createContext();

const Search = () => {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const [groupedPosts, setGroupedPosts] = useState([]);

  const [shufflePosts, setShufflePosts] = useState([]);
  const [shuffleRandomNumber, setShuffleRandomNumber] = useState(0);
  const [shufflePostVisible, setShufflePostVisible] = useState(false);

  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "black" : "white";
  const bgColor = colorMode === "light" ? "#F2F1F5" : "black";

  const [selectedFilter, setSelectedFilter] = useState("all");

  const { refreshValue, setRefreshValue } = useContext(RefreshValue);

  useFocusEffect(
    useCallback(() => {
      setRefreshValue((prev) => prev + 1);
    }, [])
  );

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
        setPosts(assignGradientColors(response.data, colorMode === "light"));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [search, refreshValue]);

  const assignGradientColors = (posts, isLight) => {
    const palette = isLight
      ? ligherColorsForLightTheme
      : darkerColorsForDarkTheme;
    return posts.map((post, index) => ({
      ...post,
      gradientColor: palette[index % palette.length],
    }));
  };

  const ligherColorsForLightTheme = [
    "#8AA7B7", // Alice Blue (darker)
    "#B28A6A", // Antique White (darker)
    "#D1A57B", // Blanched Almond (darker)
    "#A4A4D1", // Lavender (darker)
    "#9F7FAE", // Thistle (darker)
    "#8AB9B5", // Light Cyan (darker)
    "#6D9F89", // Mint Green (darker)
    "#A69F7C", // Beige (darker)
    "#E4A97A", // Pastel Peach (darker)
    "#CDA74D", // Light Gold (darker)
    "#8BAF8A", // Pale Green (darker)
    "#9F8AC9", // Soft Lavender (darker)
    "#5E8CC8", // Baby Blue (darker)
    "#E0A3A1", // Misty Rose (darker)
    "#A4D3B9", // Soft Seafoam (darker)
    "#C5A6C2", // Light Lilac (darker)
    "#D2A75C", // Wheat (darker)
    "#E3B2B6", // Pale Rose (darker)
    "#D28396", // Light Magenta (darker)
    "#8DAFBF", // Powder Blue (darker)
  ];
  const darkerColorsForDarkTheme = [
    "#7F5B83", // Muted Purple
    "#D32F2F", // Dark Red
    "#1565C0", // Dark Blue
    "#388E3C", // Dark Green
    "#8E24AA", // Dark Magenta
    "#0288D1", // Deep Sky Blue
    "#8B4513", // Saddle Brown
    "#6A1B9A", // Deep Purple
    "#FF7043", // Burnt Orange
    "#FBC02D", // Deep Yellow
    "#388E3C", // Forest Green
    "#C2185B", // Dark Pink
    "#5D4037", // Cocoa Brown
    "#9E9D24", // Olive Green
    "#0288D1", // Royal Blue
    "#D32F2F", // Crimson Red
    "#1B5E20", // Dark Forest Green
    "#1976D2", // Medium Blue
    "#7B1FA2", // Dark Violet
    "#FF5722", // Deep Orange
  ];

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

  const groupPostsByDate = (posts) => {
    const sorted = posts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    const grouped = {};

    if (selectedFilter === "all") {
      sorted.forEach((post) => {
        let dateKey;
        const date = moment(post.createdAt);

        if (date.isSame(moment(), "day")) {
          dateKey = "Today";
        } else if (date.isSame(moment().subtract(1, "days"), "day")) {
          dateKey = "Yesterday";
        } else {
          dateKey = date.format("MMMM D");
        }
        if (!grouped[dateKey]) grouped[dateKey] = [];
        grouped[dateKey].push(post);
      });
    } else if (selectedFilter === "week") {
      sorted.forEach((post) => {
        let dateKey;
        const date = moment(post.createdAt);

        if (
          date.isBetween(
            moment().subtract(7, "days"),
            moment().add(1, "days"),
            "day"
          )
        ) {
          dateKey = date.format("MMMM D");
          if (!grouped[dateKey]) grouped[dateKey] = [];
          grouped[dateKey].push(post);
        }
      });
    } else if (selectedFilter === "month") {
      sorted.forEach((post) => {
        let dateKey;
        const date = moment(post.createdAt);

        if (date.isSame(moment(), "month")) {
          dateKey = date.format("MMMM D");
          if (!grouped[dateKey]) grouped[dateKey] = [];
          grouped[dateKey].push(post);
        }
      });
    } else if (selectedFilter === "year") {
      sorted.forEach((post) => {
        let dateKey;
        const date = moment(post.createdAt);

        if (date.isSame(moment(), "year")) {
          dateKey = date.format("MMMM D");
          if (!grouped[dateKey]) grouped[dateKey] = [];
          grouped[dateKey].push(post);
        }
      });
    }

    const result = Object.keys(grouped).map((date) => ({
      title: date,
      data: grouped[date],
    }));

    return result;
  };

  useEffect(() => {
    const rawPosts = groupPostsByDate(posts);
    const groupedResult = rawPosts.flatMap((post) => post.data);
    setGroupedPosts(groupedResult);
  }, [selectedFilter, posts]);

  const options = [
    {
      name: "All",
      id: "all",
    },
    {
      name: "This week",
      id: "week",
    },
    {
      name: "This month",
      id: "month",
    },
    {
      name: "This year",
      id: "year",
    },
    {
      name: "Custom",
      id: "custom",
    },
  ];

  return (
    <PostsContext.Provider value={{ groupedPosts, setGroupedPosts }}>
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <View
          style={{ position: "absolute", bottom: 100, right: 10, zIndex: 100 }}
        >
          <Pressable
            style={[
              styles.closeButton,
              {
                backgroundColor:
                  colorMode === "light"
                    ? "rgba(207, 206, 206, 0.6)"
                    : "rgba(255, 255, 255, 0.8)",
                padding: 14,
              },
            ]}
            onPress={activateShufflePost}
          >
            <ShuffleIcon size={32} color="rgba(0, 0, 0, 0.8)" />
          </Pressable>
        </View>

        <View style={styles.nestedContainer}>
          <View
            style={{
              position: "relative",
              paddingHorizontal: 2,
            }}
          >
            <TextInput
              style={[
                styles.searchBar,
                {
                  backgroundColor:
                    colorMode === "light" ? "#E4E3E8" : "#1C1C1E",
                  color: textColor,
                  borderColor: colorMode === "light" ? "#F0F0F0" : "#121212",
                },
              ]}
              placeholder="Search post"
              placeholderTextColor={
                colorMode === "light" ? "#494949" : "#97989F"
              }
              value={search}
              onChangeText={setSearch}
            />
            <View style={{ position: "absolute", top: 12, left: 12 }}>
              <SearchIconOutline
                size={18}
                color={colorMode === "light" ? "black" : "white"}
              />
            </View>
          </View>
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{
                marginTop: 10,
                zIndex: 1,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 10,
                  paddingHorizontal: 2,
                }}
              >
                {options.map((option, index) => (
                  <Pressable
                    key={index}
                    style={{
                      backgroundColor:
                        colorMode === "light"
                          ? selectedFilter === option.id
                            ? "#1C1C1E"
                            : "#E4E3E8"
                          : selectedFilter === option.id
                          ? "#E4E3E8"
                          : "#1C1C1E",
                      borderRadius: 16,
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      justifyContent: "center",
                    }}
                    onPress={() => setSelectedFilter(option.id)}
                  >
                    <Text
                      style={{
                        color:
                          colorMode === "light"
                            ? selectedFilter === option.id
                              ? "white"
                              : "black"
                            : selectedFilter === option.id
                            ? "black"
                            : "white",
                        fontSize: 16,
                      }}
                    >
                      {option.name}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </View>

          <View style={{ flex: 1, height: "100%" }}>
            <DisplayPosts
              groupedPostsByDate={groupPostsByDate(posts)}
              setSearch={setSearch}
            />
          </View>
        </View>

        <Modal
          visible={shufflePostVisible}
          animationType="none"
          transparent={true}
          onRequestClose={() => setShufflePostVisible(false)}
        >
          <ShuffledPost
            post={shufflePosts[shuffleRandomNumber]}
            setViewPostVisible={setShufflePostVisible}
            viewPostVisible={shufflePostVisible}
          />
        </Modal>
      </View>
    </PostsContext.Provider>
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
    paddingHorizontal: 2,
  },
  searchBar: {
    padding: 10,
    borderRadius: 14,
    fontWeight: 400,
    fontSize: 18,
    paddingLeft: 36,
  },
  closeButton: {
    marginLeft: 10,
    padding: 12,
    borderRadius: 50,
  },
});

export default Search;
