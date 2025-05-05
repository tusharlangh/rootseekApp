import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Pressable,
  Modal,
  Image,
  FlatList,
} from "react-native";
import DisplayPosts from "./display-posts";
import { useFonts } from "expo-font";
import { GrandHotel_400Regular } from "@expo-google-fonts/grand-hotel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useContext, useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { useColorMode } from "native-base";
import {
  AddIcon,
  CloseIcon,
  LeftArrowIcon,
  PatternInsightsIcon,
  RecentlyMadeIcon,
  RightArrow,
  ShuffleIcon,
  ThreadThemeIcon,
} from "./icons";
import Create from "./createpage/create";
import ViewPost from "./viewPost";
import DisplayHomePosts from "./display-home-posts";
import { RefreshValue } from "./navbar";
import { useFocusEffect } from "@react-navigation/native";
import SwipePage from "./swipe-page";
import StoryViewer from "./StoryViewer";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [shufflePosts, setShufflePosts] = useState([]);
  const [shuffleRandomNumber, setShuffleRandomNumber] = useState(0);
  let [fontsLoaded] = useFonts({
    GrandHotel_400Regular,
  });
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "black" : "white";
  const bgColor = colorMode === "light" ? "#F7F7F9" : "black";

  const { refreshValue, setRefreshValue } = useContext(RefreshValue);

  const [createVisible, setCreateVisible] = useState(false);
  const [shufflePostVisible, setShufflePostVisible] = useState(false);

  const [patternInsights, setPatternInsights] = useState([]);

  const [themeThreads, setThemeThreads] = useState({});

  const [selectedThemeText, setSelectedThemeText] = useState("");
  const [selectedTheme, setSelectedTheme] = useState([]);

  const [postIndex, setPostIndex] = useState(0);
  const [viewPostVisible, setViewPostVisible] = useState(false);

  const themesArray = Object.entries(themeThreads);

  const [storiesData, setStoriesData] = useState({});
  const [storiesLoading, setStoriesLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setRefreshValue((prev) => prev + 1);
    }, [])
  );

  useEffect(() => {
    console.log(selectedThemeText);
  }, [selectedThemeText]);

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
  }, [refreshValue, createVisible]);

  useEffect(() => {
    const fetchPatternInsights = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await axios.get(
          "http://localhost:5002/nlp/pattern-insights",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPatternInsights(response.data);
      } catch (error) {
        console.error("Error fetching the pattern insights of posts", error);
      }
    };
    fetchPatternInsights();
  }, []);

  useEffect(() => {
    const fetchThemeThreads = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await axios.get(
          "http://localhost:5002/nlp/topThemePosts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setThemeThreads(response.data);
      } catch (error) {
        console.error("Error fetching the theme threads", error);
      }
    };
    fetchThemeThreads();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={textColor} />
      </View>
    );
  }

  const FormatTime = (post) => {
    const formattedTime = new Date(post.date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    });
    return formattedTime;
  };

  const getHashTags = (hashTags) => {
    const ht = hashTags.split("#").filter((h) => h.length > 0);
    return ht;
  };

  const getStoriesRaw = async (posts, theme) => {
    try {
      setStoriesLoading(true);
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.post(
        "http://localhost:5002/nlp/stories",
        { posts: posts, theme: theme },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSelectedThemeText("");
      setSelectedTheme([]);
      setStoriesData(response.data);
    } catch (error) {
      console.error(error?.response?.data || error.message);
    } finally {
      setStoriesLoading(false);
    }
  };

  useEffect(() => {
    if (storiesLoading === false && Object.entries(storiesData).length > 0) {
      setViewPostVisible(true);
    }
  }, [storiesLoading]);

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.nestedContainer}>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginBottom: 10,
          }}
        >
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
        <ScrollView>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 8,
              gap: 8,
            }}
          >
            <View style={{ marginTop: 5 }}>
              <RecentlyMadeIcon size={24} color={textColor} />
            </View>

            <Text
              style={[
                {
                  color: textColor,
                  fontSize: 28,
                  fontWeight: 700,
                  marginBottom: -5,
                },
              ]}
            >
              Recently made
            </Text>
          </View>

          <View style={{ width: "100%" }}>
            <DisplayHomePosts posts={posts} />
          </View>

          <View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 8,
                gap: 8,
              }}
            >
              <View>
                <PatternInsightsIcon size={24} color={textColor} />
              </View>

              <Text
                style={[
                  {
                    color: textColor,
                    fontSize: 28,
                    fontWeight: 700,
                  },
                ]}
              >
                Pattern insights
              </Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
              }}
            >
              <View
                style={{
                  borderRadius: 10,
                  backgroundColor:
                    colorMode === "light" ? "#FFF9D6" : "#D2A13F",
                  padding: 18,
                  marginTop: 12,
                  width: 300,
                  marginRight: 10,
                  borderWidth: 1,
                  borderColor: colorMode === "light" ? "#F7EEB4" : "#E4BE73",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: textColor,
                      fontSize: 24,
                      fontWeight: 700,
                      marginBottom: 10,
                    }}
                  >
                    Insight
                  </Text>
                  <Text
                    style={{
                      color: textColor,
                      fontSize: 16,
                      textAlign: "center",
                    }}
                  >
                    {Object.values(patternInsights)[0]}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  borderRadius: 10,
                  backgroundColor:
                    colorMode === "light" ? "#F2E3AD" : "#816731",
                  padding: 18,
                  marginTop: 12,
                  width: 300,
                  marginRight: 10,
                  borderWidth: 1,
                  borderColor: colorMode === "light" ? "#E9D891" : "#917A45",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: textColor,
                      fontSize: 24,
                      fontWeight: 700,
                      marginBottom: 10,
                    }}
                  >
                    What you are good at
                  </Text>
                  <Text
                    style={{
                      color: textColor,
                      fontSize: 16,
                      textAlign: "center",
                    }}
                  >
                    {Object.values(patternInsights)[1]}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  borderRadius: 10,
                  backgroundColor:
                    colorMode === "light" ? "#E5CC79" : "#302C23",
                  padding: 18,
                  marginTop: 12,
                  width: 300,
                  marginRight: 10,
                  borderWidth: 1,
                  borderColor: colorMode === "light" ? "#E1C66F" : "#433D30",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: textColor,
                      fontSize: 24,
                      fontWeight: 700,
                      marginBottom: 10,
                    }}
                  >
                    What to improve on
                  </Text>
                  <Text
                    style={{
                      color: textColor,
                      fontSize: 16,
                      textAlign: "center",
                    }}
                  >
                    {Object.values(patternInsights)[2]}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>

          <View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 8,
                gap: 8,
                marginTop: 30,
              }}
            >
              <View>
                <ThreadThemeIcon size={24} color={textColor} />
              </View>

              <Text
                style={[
                  {
                    color: textColor,
                    fontSize: 28,
                    fontWeight: 700,
                  },
                ]}
              >
                Theme Thread View
              </Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 10,
                  marginTop: 12,
                }}
              >
                {themesArray.map(([theme, value], index) => (
                  <Pressable
                    key={theme}
                    style={{
                      backgroundColor:
                        index === 0
                          ? "#C79AF5"
                          : index === 1
                          ? "#E6876F"
                          : index === 2
                          ? "#818FEC"
                          : "#8ED1F7",
                      padding: 10,
                      borderRadius: 10,
                    }}
                    onPress={() => {
                      setSelectedTheme(value);
                      setSelectedThemeText(theme);
                      getStoriesRaw(value, theme);
                    }}
                  >
                    <Text style={{ fontSize: 20, fontWeight: 600 }}>
                      {theme}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
      <View style={{ position: "absolute", bottom: 100, right: 10 }}>
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
        animationType="fade"
        visible={viewPostVisible}
        transparent={false}
        onRequestClose={() => setViewPostVisible(false)}
      >
        {storiesLoading === false && Object.entries(storiesData).length > 0 ? (
          <StoryViewer
            storiesData={storiesData}
            setViewPostVisible={setViewPostVisible}
          />
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <ActivityIndicator size="large" color="black" />
          </View>
        )}
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
    position: "relative",
    flex: 1,
  },
  nestedContainer: {
    height: "100%",
    paddingHorizontal: 4,
  },
  dailyText: {
    marginLeft: 8,
    fontSize: 28,
  },
  closeButton: {
    marginLeft: 10,
    padding: 12,
    borderRadius: 50,
  },
  postContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    padding: 18,
    borderRadius: 10,
  },
  postTitle: {
    fontWeight: "600",
    fontSize: 20,
  },
  postContent: {
    fontWeight: "400",
    fontSize: 14,
    color: "#B3B3B3",
  },
  postHashTags: {
    marginTop: 6,
    fontWeight: "400",
    fontSize: 14,
    color: "white",
  },
  postTime: {
    marginTop: 4,
    fontWeight: "400",
    fontSize: 14,
    textAlign: "right",
  },
});

export default Home;
