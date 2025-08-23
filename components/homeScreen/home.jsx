import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Pressable,
  Modal,
  RefreshControl,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useColorMode } from "native-base";
import { GrowthTraceContext, RefreshValue } from "../navbar";
import { useFocusEffect } from "@react-navigation/native";

import { PhoneContext } from "../../App";

import Header from "./header";
import ScrollableSection from "./ScrollableSection";
import StoryViewer from "../StoryViewer";
import RecentlyMadePosts from "./recentlyMadePosts";
import PatternInsightsPosts from "./patternInsightsPosts";
import ThemeThreadPosts from "./themeThreadPosts";
import { theme } from "../../theme";
import StoryView from "../storyViewer/storyView";
import GrowthTrace from "../createpage/growthTrace/growthTrace";
import HomeLoading from "../loadingScreen/homeLoading";
import ViewRoot from "../rootScreen/viewRoot";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = ({ navigation }) => {
  const { usePhone } = useContext(PhoneContext);

  const { growthTrace, setGrowthTrace } = useContext(GrowthTraceContext);

  const address = usePhone ? "192.168.1.80:5002" : "localhost:5002";

  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);

  const { refreshValue, setRefreshValue } = useContext(RefreshValue);

  const [createVisible, setCreateVisible] = useState(false);

  const [patternInsights, setPatternInsights] = useState([]);
  const [patternLoading, setPatternLoading] = useState(false);

  const [themeThreads, setThemeThreads] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  const [viewPostVisible, setViewPostVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  {
    /*
    useFocusEffect(
    useCallback(() => {
      setRefreshValue((prev) => prev + 1);
    }, [])
  );
    */
  }
  //fetches recent posts
  const fetchPosts = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      setPostsLoading(true);

      const response = await axios.get(
        `http://${address}/24-hours/twenty-four-h-posts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setPostsLoading(false);
    }
  };

  //fetches pattern insights
  const fetchPatternInsights = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      setPatternLoading(true);

      const response = await axios.get(
        `http://${address}/nlp/collect/pattern-insights`,
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

  //fetches theme threads
  const fetchThemeThreads = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.get(
        `http://${address}/nlp/theme-thread-toptheme/topThemePosts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setThemeThreads(response.data);
    } catch (error) {
      console.error("Error fetching the theme threads", error);
    }
  };

  const fetchThemeProgression = useCallback(async (theme, themeColor) => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.get(
        `http://${address}/nlp/progression/themeProgression`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { theme },
        }
      );
      navigation.navigate("theme_thread", {
        _theme: theme,
        _theme_color: themeColor,
        _progression: response.data,
      });
    } catch (error) {
      console.error("Error fetching theme progressions", error);
    }
  });

  //on refresh what to fetch
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      fetchPosts();
      //fetchPatternInsights();
      fetchThemeThreads();
      setRefreshing(false);
    }, 2000);
  }, []);

  //calls fetchPosts
  useEffect(() => {
    fetchPosts();
  }, [refreshValue, createVisible]);

  //calls fetchPatterInsights
  useEffect(() => {
    fetchPatternInsights();
  }, []);

  //calls fetchThemeThreads
  useEffect(() => {
    fetchThemeThreads();
  }, []);

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

  if (patternLoading || postsLoading) return <HomeLoading />;

  return (
    <>
      {growthTrace && <GrowthTrace />}

      <SafeAreaView
        edges={["top", "left", "right"]}
        style={{
          flex: 1,
          backgroundColor: theme.main_background,
        }}
      >
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["white"]}
              tintColor="white"
            />
          }
        >
          <Header headerText={"Recently Made"} headerIcon={"recentlyMade"} />

          <ScrollableSection gap={18}>
            <RecentlyMadePosts
              posts={posts}
              setCurrentIndex={setCurrentIndex}
              setViewPostVisible={setViewPostVisible}
            />
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
              themeThreads={themeThreads}
              fetchThemeProgression={fetchThemeProgression}
            />
          </ScrollableSection>
        </ScrollView>

        {/*below is single root view*/}
        <Modal
          animationType="fade"
          visible={viewPostVisible}
          transparent={true}
          onRequestClose={() => setViewPostVisible(false)}
        >
          <ViewRoot
            currentIndex={currentIndex}
            posts={posts}
            setViewPostVisible={setViewPostVisible}
            viewPostVisible={viewPostVisible}
          />
        </Modal>
      </SafeAreaView>
    </>
  );
};

export default Home;
