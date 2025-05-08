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
  OpenBookQuillIcon,
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
import { LinearGradient } from "expo-linear-gradient";

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
  const [patternLoading, setPatternLoading] = useState(false);

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
        setPatternLoading(true);
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
      } finally {
        setPatternLoading(false);
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
    <LinearGradient
      colors={["#F9FAFF", "#EAF0FF", "#FCEEF5"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ height: "100%" }}
    >
      <View style={[styles.container]}>
        <View style={styles.nestedContainer}>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "flex-end",
              marginBottom: 10,
              paddingHorizontal: 10,
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
                gap: 8,
              }}
            >
              <View style={{ marginTop: 5 }}>
                <RecentlyMadeIcon size={24} color="rgba(0,0,0,0.8)" />
              </View>

              <Text
                style={[
                  {
                    color: "rgba(0,0,0,0.8)",
                    fontSize: 28,
                    fontWeight: 700,
                    marginBottom: -5,
                  },
                ]}
              >
                Recently made
              </Text>
            </View>

            <View
              style={{
                width: "100%",
                marginTop: !posts || posts.length === 0 ? 18 : 0,
              }}
            >
              {!posts || posts.length === 0 ? (
                <View
                  style={{
                    padding: 20,
                    paddingVertical: 30,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    borderRadius: 20,
                    marginHorizontal: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: 600,
                      color: "rgba(0,0,0,0.8)",
                    }}
                  >
                    Nothing here yet
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: "rgba(0,0,0,0.8)",
                      marginTop: 6,
                      textAlign: "center",
                    }}
                  >
                    You haven't posted any roots recently. When you do, they'll
                    appear here.
                  </Text>
                  <Pressable
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                      backgroundColor: "rgba(154, 168, 245, 0.2)",
                      paddingHorizontal: 12,
                      borderRadius: 10,
                      paddingVertical: 8,
                      marginTop: 20,
                    }}
                  >
                    <View>
                      <AddIcon size={24} color="rgb(42, 51, 101)" />
                    </View>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "rgb(42, 51, 101)",
                        fontWeight: 500,
                      }}
                    >
                      Add a root
                    </Text>
                  </Pressable>
                </View>
              ) : (
                <DisplayHomePosts posts={posts} />
              )}
            </View>

            <View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 8,
                  gap: 8,
                  marginTop: !posts || posts.length === 0 ? 30 : 0,
                }}
              >
                <View>
                  <PatternInsightsIcon size={30} color="rgba(0,0,0,0.8)" />
                </View>

                <Text
                  style={[
                    {
                      color: "rgba(0,0,0,0.8)",
                      fontSize: 28,
                      fontWeight: 700,
                    },
                  ]}
                >
                  Pattern insights
                </Text>
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 10,
                    paddingHorizontal: 10,
                  }}
                >
                  <View
                    style={{
                      borderRadius: 20,
                      backgroundColor:
                        colorMode === "light" ? "white" : "#D2A13F",
                      padding: 25,
                      marginTop: 12,
                      width: 300,
                      marginRight: 10,
                      shadowColor: "rgba(0,0,0,0.7)",
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.07,
                      shadowRadius: 10,
                      elevation: 6,
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
                          color: "#232E54",
                          fontSize: 24,
                          fontWeight: 600,
                          marginBottom: 10,
                        }}
                      >
                        Insight
                      </Text>

                      <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ maxHeight: 220 }}
                      >
                        <Text
                          style={{
                            color: "#232E54",
                            fontSize: 16,
                            lineHeight: 20,
                          }}
                        >
                          {patternLoading ? (
                            <View
                              style={{
                                width: "100%",
                                height: 120,
                                justifyContent: "center",
                              }}
                            >
                              <ActivityIndicator size="small" color="#544023" />
                            </View>
                          ) : (
                            Object.values(patternInsights)[0]
                          )}
                        </Text>
                      </ScrollView>
                    </View>
                  </View>

                  <View
                    style={{
                      borderRadius: 20,
                      backgroundColor:
                        colorMode === "light" ? "white" : "#816731",
                      padding: 25,
                      marginTop: 12,
                      width: 300,
                      marginRight: 10,
                      shadowColor: "rgba(0,0,0,0.7)",
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.07,
                      shadowRadius: 10,
                      elevation: 6,
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
                          color: "#544023",
                          fontSize: 24,
                          fontWeight: 600,
                          marginBottom: 10,
                        }}
                      >
                        What you are good at
                      </Text>
                      <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ maxHeight: 220 }}
                      >
                        <Text
                          style={{
                            color: "#544023",
                            fontSize: 16,
                          }}
                        >
                          {patternLoading ? (
                            <ActivityIndicator size="small" color="#544023" />
                          ) : (
                            Object.values(patternInsights)[1]
                          )}
                        </Text>
                      </ScrollView>
                    </View>
                  </View>

                  <View
                    style={{
                      borderRadius: 20,
                      backgroundColor:
                        colorMode === "light" ? "white" : "#302C23",
                      padding: 25,
                      marginTop: 12,
                      width: 300,
                      marginRight: 10,
                      shadowColor: "rgba(0,0,0,0.7)",
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.07,
                      shadowRadius: 10,
                      elevation: 6,
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
                          color: "#234554",
                          fontSize: 24,
                          fontWeight: 600,
                          marginBottom: 10,
                        }}
                      >
                        What to improve on
                      </Text>
                      <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ maxHeight: 220 }}
                      >
                        <Text
                          style={{
                            color: "#234554",
                            fontSize: 16,
                          }}
                        >
                          {patternLoading ? (
                            <ActivityIndicator size="small" color="#234554" />
                          ) : (
                            Object.values(patternInsights)[2]
                          )}
                        </Text>
                      </ScrollView>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>

            <View style={{ marginBottom: 200 }}>
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
                  <ThreadThemeIcon size={24} color="rgba(0,0,0,0.8)" />
                </View>

                <Text
                  style={[
                    {
                      color: "rgba(0,0,0,0.8)",
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
                    paddingHorizontal: 10,
                  }}
                >
                  {themesArray.map(([theme, value], index) => (
                    <Pressable
                      key={theme}
                      style={{
                        backgroundColor:
                          index === 0
                            ? "rgba(199,154,245,0.2)"
                            : index === 1
                            ? "rgba(230,135,111,0.2)"
                            : index === 2
                            ? "rgba(129,143,236,0.2)"
                            : "rgba(142,209,247, 0.2)",
                        padding: 10,
                        borderRadius: 10,
                      }}
                      onPress={() => {
                        setSelectedTheme(value);
                        setSelectedThemeText(theme);
                        getStoriesRaw(value, theme);
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: 600,
                          color:
                            index === 0
                              ? "#482968"
                              : index === 1
                              ? "#8A4B3C"
                              : index === 2
                              ? "#31396F"
                              : "#385F76",
                        }}
                      >
                        {theme}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </ScrollView>
            </View>
          </ScrollView>
        </View>

        <Modal
          animationType="fade"
          visible={viewPostVisible}
          transparent={false}
          onRequestClose={() => setViewPostVisible(false)}
        >
          {storiesLoading === false &&
          Object.entries(storiesData).length > 0 ? (
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
    </LinearGradient>
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
    paddingHorizontal: 0,
    position: "relative",
    flex: 1,
  },
  nestedContainer: {
    height: "100%",
    paddingHorizontal: 0,
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
