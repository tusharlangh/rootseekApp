import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Pressable,
  Modal,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useColorMode } from "native-base";
import { RefreshValue } from "../navbar";
import { useFocusEffect } from "@react-navigation/native";

import { PhoneContext } from "../../App";

import Header from "./header";
import ScrollableSection from "./ScrollableSection";
import StoryViewer from "../StoryViewer";
import RecentlyMadePosts from "./recentlyMadePosts";
import PatternInsightsPosts from "./patternInsightsPosts";
import ThemeThreadPosts from "./themeThreadPosts";

const MainHome = () => {
  const { usePhone } = useContext(PhoneContext);

  const address = usePhone ? "192.168.1.80:5002" : "localhost:5002";

  const [posts, setPosts] = useState([]);

  const { refreshValue, setRefreshValue } = useContext(RefreshValue);

  const [createVisible, setCreateVisible] = useState(false);

  const [patternInsights, setPatternInsights] = useState([]);
  const [patternLoading, setPatternLoading] = useState(false);

  const [themeThreads, setThemeThreads] = useState({});

  const [selectedThemeText, setSelectedThemeText] = useState("");
  const [selectedTheme, setSelectedTheme] = useState([]);

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

  const getStoriesRaw = useCallback(async (posts, theme) => {
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
  }, []);

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

  return (
    <View style={{ flex: 1, paddingTop: 50, backgroundColor: "black" }}>
      <ScrollView>
        <Header headerText={"Recently Made"} headerIcon={"recentlyMade"} />

        <ScrollableSection gap={18}>
          <RecentlyMadePosts posts={posts} />
        </ScrollableSection>

        <Header
          headerText={"Pattern Insights"}
          headerIcon={"patternInsights"}
        />

        <ScrollableSection>
          <PatternInsightsPosts posts={flatListData} />
        </ScrollableSection>

        <Header
          headerText={"Theme Thread View"}
          headerIcon={"themeThreadView"}
        />

        <ScrollableSection>
          <ThemeThreadPosts
            posts={themesArray}
            setSelectedTheme={setSelectedTheme}
            setSelectedThemeText={setSelectedTheme}
            getStoriesRaw={getStoriesRaw}
          />
        </ScrollableSection>
      </ScrollView>

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

export default MainHome;
