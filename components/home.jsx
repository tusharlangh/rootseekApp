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
  Dimensions,
  Animated,
} from "react-native";
import DisplayPosts from "./display-posts";
import { useFonts } from "expo-font";
import { GrandHotel_400Regular } from "@expo-google-fonts/grand-hotel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
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
import InterBold from "../assets/fonts/Inter-Bold.otf";
import InterMedium from "../assets/fonts/Inter-Medium.otf";
import InterSemiBold from "../assets/fonts/Inter-SemiBold.otf";
import { PhoneContext } from "../App";

const { width, height } = Dimensions.get("window");

const Home = () => {
  const { usePhone } = useContext(PhoneContext);

  const address = usePhone ? "192.168.1.80:5002" : "localhost:5002";

  let [fontsLoaded] = useFonts({
    GrandHotel_400Regular,
    InterBold,
    InterMedium,
    InterSemiBold,
  });

  const [posts, setPosts] = useState([]);

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
    const fetchPosts = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await axios.get(`http://${address}/user/posts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
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
          `http://${address}/nlp/pattern-insights`,
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
          `http://${address}/nlp/topThemePosts`,
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

  const getStoriesRaw = async (posts, theme) => {
    try {
      setStoriesLoading(true);
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.post(
        `http://${address}/nlp/stories`,
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

  const flatListData = [
    {
      title: "Insight One",
      data: Object.values(patternInsights)[0],
      color: "#0A1230",
      bg: "white",
    },
    {
      title: "Insight Two",
      data: Object.values(patternInsights)[1],
      color: "#0A302F",
      bg: "white",
    },
  ];

  const scrollX = useRef(new Animated.Value(0)).current;

  const scrollY = useRef(new Animated.Value(0)).current;

  const translateY = scrollY.interpolate({
    inputRange: [0, 180],
    outputRange: [0, -40],
    extrapolate: "clamp",
  });

  const opacity = scrollY.interpolate({
    inputRange: [0, 180],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <LinearGradient
      colors={["#F9FAFF", "#EAF0FF", "#FCEEF5"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ height: "100%" }}
    >
      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              {
                translateY: translateY,
              },
            ],
          },
        ]}
      >
        <View style={styles.nestedContainer}>
          <Animated.View
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "flex-end",
              marginBottom: 10,
              paddingHorizontal: 10,
              opacity,
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
          </Animated.View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false }
            )}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
                gap: 8,
              }}
            >
              <View style={{ marginTop: 3 }}>
                <RecentlyMadeIcon size={24} color="rgba(0,0,0,0.8)" />
              </View>

              <Text
                style={[
                  {
                    color: "rgba(0,0,0,0.8)",
                    fontSize: 26,
                    fontWeight: 700,
                    paddingTop: 2,
                    fontFamily: "InterBold",
                  },
                ]}
              >
                Recently Made
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
                      fontSize: 26,
                      fontWeight: 700,
                      fontFamily: "InterBold",
                    },
                  ]}
                >
                  Pattern Insight
                </Text>
              </View>
              <FlatList
                data={flatListData}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={360}
                snapToAlignment="start"
                decelerationRate="fast"
                contentContainerStyle={{
                  paddingHorizontal: (width - 340) / 2,
                }}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                  { useNativeDriver: false }
                )}
                renderItem={({ item, index }) => (
                  <View
                    style={{
                      width: 340,
                      marginRight: index !== flatListData.length - 1 ? 20 : 0,
                      borderRadius: 20,
                      backgroundColor:
                        colorMode === "light" ? item.bg : "#D2A13F",
                      padding: 25,
                      marginTop: 12,
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
                          color: item.color,
                          fontSize: 24,
                          fontWeight: 600,
                          marginBottom: 10,
                          fontFamily: "InterSemiBold",
                        }}
                      >
                        {item.title}
                      </Text>

                      <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ maxHeight: 210 }}
                      >
                        <Text
                          style={{
                            color: item.color,
                            fontSize: 15,
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
                            item.data
                          )}
                        </Text>
                      </ScrollView>
                    </View>
                  </View>
                )}
              />
              <View
                style={{
                  display: "flex",
                  width,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <View style={{ display: "flex", flexDirection: "row", gap: 4 }}>
                  {flatListData.map((_, i) => {
                    const inputRange = [(i - 1) * 360, i * 360, (i + 1) * 360];
                    const opacity = scrollX.interpolate({
                      inputRange,
                      outputRange: [0.3, 0.8, 0.3],
                      extrapolate: "clamp",
                    });
                    return (
                      <Animated.View
                        key={i}
                        style={{
                          height: 4,
                          width: 20,
                          backgroundColor: "rgb(194, 194, 194)",
                          borderRadius: 4,
                          overflow: "hidden",
                          opacity,
                        }}
                      >
                        <Animated.View
                          style={{
                            height: "100%",
                            width: "100%",
                            transform: [
                              {
                                translateX: scrollX.interpolate({
                                  inputRange,
                                  outputRange: [-20, 0, 20],
                                  extrapolate: "clamp",
                                }),
                              },
                            ],
                            backgroundColor: "black",
                          }}
                        ></Animated.View>
                      </Animated.View>
                    );
                  })}
                </View>
              </View>
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
                      fontSize: 26,
                      fontWeight: 700,
                      fontFamily: "InterBold",
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
                          fontFamily: "InterSemiBold",
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
      </Animated.View>
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
    paddingTop: 50,
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
