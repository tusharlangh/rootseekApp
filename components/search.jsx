import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Modal,
  Text,
  ScrollView,
  FlatList,
  Animated,
  ActivityIndicator,
} from "react-native";
import DisplayPosts from "./display-posts";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
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
import { GrandHotel_400Regular } from "@expo-google-fonts/grand-hotel";
import { LinearGradient } from "expo-linear-gradient";
import FuturaCyrillicBold from "../assets/fonts/FuturaCyrillicBold.ttf";
import FuturaCyrillicMedium from "../assets/fonts/FuturaCyrillicMedium.ttf";
import FuturaCyrillicLight from "../assets/fonts/FuturaCyrillicLight.ttf";
import FuturaCyrillicBook from "../assets/fonts/FuturaCyrillicBook.ttf";
import FuturaCyrillicDemi from "../assets/fonts/FuturaCyrillicDemi.ttf";
import FuturaCyrillicHeavy from "../assets/fonts/FuturaCyrillicHeavy.ttf";
import { useFonts } from "expo-font";

export const PostsContext = createContext();

const Search = () => {
  let [fontsLoaded] = useFonts({
    GrandHotel_400Regular,
    FuturaCyrillicBold,
    FuturaCyrillicMedium,
    FuturaCyrillicLight,
    FuturaCyrillicBook,
    FuturaCyrillicDemi,
    FuturaCyrillicHeavy,
  });
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

  const animatedValue = useRef(new Animated.Value(0)).current;
  const colorChangeValue = useRef(new Animated.Value(0)).current;

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

  const [hashtagAnimMap, setHashtagAnimMap] = useState(
    options.reduce((acc, option) => {
      acc[option.id] = new Animated.Value(0);
      return acc;
    }, {})
  );

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
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [search, refreshValue]);

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
    setGroupedPosts(posts);
  }, [selectedFilter, posts]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: [0, -50],
    extrapolate: "clamp",
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  useEffect(() => {
    animateHashtag("all");
  }, []);

  const animateHashtag = (id) => {
    const anim = hashtagAnimMap[id];
    anim.setValue(0);
    Animated.timing(anim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <PostsContext.Provider value={{ groupedPosts, setGroupedPosts }}>
      <LinearGradient
        colors={["#F9FAFF", "#EAF0FF", "#FCEEF5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ height: "100%" }}
      >
        <View style={[styles.container]}>
          <Animated.View
            style={[
              styles.nestedContainer,
              { transform: [{ translateY: translateY }] },
            ]}
          >
            <Animated.View
              style={{
                position: "relative",
                paddingHorizontal: 2,
                opacity: opacity,
              }}
            >
              <TextInput
                style={[
                  styles.searchBar,
                  {
                    backgroundColor:
                      colorMode === "light"
                        ? "rgba(255,255,255,0.5)"
                        : "#1C1C1E",
                    color: textColor,
                    shadowColor: "rgba(0,0,0,0.7)",
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.07,
                    shadowRadius: 10,
                    elevation: 6,
                    fontFamily: "FuturaCyrillicBook",
                  },
                ]}
                placeholder="Search"
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
            </Animated.View>
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
                  {options.map((option, index) => {
                    const bgColor = hashtagAnimMap[option.id].interpolate({
                      inputRange: [0, 1],
                      outputRange: ["rgba(255,255,255,0.5)", "rgba(0,0,0, 1)"],
                    });

                    return (
                      <Animated.View
                        key={index}
                        style={{
                          borderRadius: 16,
                          backgroundColor:
                            selectedFilter === option.id
                              ? bgColor
                              : "rgba(255,255,255,0.5)",
                        }}
                      >
                        <Pressable
                          style={{
                            paddingHorizontal: 12,
                            paddingVertical: 6,
                            justifyContent: "center",
                          }}
                          onPress={() => {
                            setSelectedFilter(option.id);
                            animateHashtag(option.id);
                          }}
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
                              fontFamily: "FuturaCyrillicDemi",
                            }}
                          >
                            {option.name}
                          </Text>
                        </Pressable>
                      </Animated.View>
                    );
                  })}
                </View>
              </ScrollView>
            </View>

            <View style={{ flex: 1, height: "100%" }}>
              {!posts ||
              posts.length === 0 ||
              !groupPostsByDate(posts) ||
              groupPostsByDate(posts).length === 0 ? (
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    paddingBottom: 60,
                  }}
                >
                  <Text style={{ fontSize: 20, fontWeight: 600 }}>
                    Try searching something else
                  </Text>
                  <Text>No result found.</Text>
                </View>
              ) : (
                <DisplayPosts
                  groupedPostsByDate={groupPostsByDate(posts)}
                  setSearch={setSearch}
                  animatedValue={animatedValue}
                />
              )}
            </View>
          </Animated.View>

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
      </LinearGradient>
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
