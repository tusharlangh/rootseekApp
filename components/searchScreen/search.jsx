import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  withTiming,
} from "react-native-reanimated";
import SearchInput from "./searchInput";
import StickyOptions from "./stickyOptions";
import { StyleSheet, View, Text, Dimensions, Modal } from "react-native";
import { useCallback, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { RefreshValue } from "../navbar";
import { useFocusEffect } from "@react-navigation/native";

import { PhoneContext } from "../../App";
import DisplayRoots from "./displayRoots";
import moment from "moment";
import { theme } from "../../theme";
import ViewRoot from "../rootScreen/viewRoot";
import ThreeDotLoader from "../loadingScreen/threeDotLoading";
import NoRootsFoundLoading from "../loadingScreen/noRootsFoundLoading";

const { height, width } = Dimensions.get("window");

const Search = () => {
  const { usePhone } = useContext(PhoneContext);

  const address = usePhone ? "192.168.1.80:5002" : "localhost:5002";

  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);

  const [postsByDate, setPostsByDate] = useState([]);

  const [flatPosts, setFlatPosts] = useState([]);

  const [selectedFilter, setSelectedFilter] = useState("all");

  const { refreshValue, setRefreshValue } = useContext(RefreshValue);

  const [viewPostVisible, setViewPostVisible] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

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

        setIsLoading(true);

        const response = await axios.get(
          `http://${address}/search/posts?q=${encodeURIComponent(search)}`,
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
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [search, refreshValue]);

  const getFilteredByDate = (posts) => {
    const sorted = posts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    const grouped = {};
    const unGrouped = [];

    if (selectedFilter === "all") {
      sorted.forEach((post) => {
        unGrouped.push(post);
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
    } else if (selectedFilter === "today") {
      sorted.forEach((post) => {
        let dateKey;
        const date = moment(post.createdAt);

        if (date.isSame(moment(), "day")) {
          dateKey = date.format("MMMM D");
          if (!grouped[dateKey]) grouped[dateKey] = [];
          grouped[dateKey].push(post);
          unGrouped.push(post);
        }
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
          unGrouped.push(post);
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
          unGrouped.push(post);
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
          unGrouped.push(post);
        }
      });
    }
    return [grouped, unGrouped];
  };

  useEffect(() => {
    const returnedValue = getFilteredByDate(posts);

    setFlatPosts(returnedValue[1]);

    const result = Object.keys(returnedValue[0]).map((date) => ({
      title: date,
      data: returnedValue[0][date],
    }));

    setPostsByDate(result);
  }, [selectedFilter, posts]);

  //___________________________BELOW IS ANIMATION______________________//

  const [scrollViewHeight, setScrollViewHeight] = useState(0);
  const scrollY = useSharedValue(0);
  const scrollDummyY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const y = event.contentOffset.y;
      const prevY = scrollY.value;
      const layoutH = scrollViewHeight - event.layoutMeasurement.height;

      scrollY.value = y;

      const scrollingUp = prevY > y;

      if (y > 100 && y <= layoutH) {
        if (scrollingUp) {
          scrollDummyY.value = withTiming(0, { duration: 200 });
        } else {
          scrollDummyY.value = withTiming(100, { duration: 200 });
        }
      } else {
        scrollDummyY.value = y;
      }
    },
  });

  const stickyOptionsStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY:
            scrollY.value > 100
              ? interpolate(
                  scrollDummyY.value,
                  [0, 110],
                  [55, 10],
                  Extrapolation.CLAMP
                )
              : interpolate(
                  scrollDummyY.value,
                  [0, 100],
                  [120, 10],
                  Extrapolation.CLAMP
                ),
        },
      ],
    };
  });

  const stickyStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [0, 110],
            [110, 50],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  const stickyShadow = useAnimatedStyle(() => {
    return {
      shadowOpacity: interpolate(
        scrollY.value,
        [0, 100],
        [0, 0.7],
        Extrapolation.CLAMP
      ),
    };
  });

  return (
    <View
      style={{
        paddingTop: 50,
        flex: 1,
        zIndex: 100,
        backgroundColor: theme.main_background,
      }}
    >
      <SearchInput
        stickyStyle={stickyStyle}
        stickyShadow={stickyShadow}
        search={search}
        setSearch={setSearch}
      />

      <StickyOptions
        stickyOptionsStyle={stickyOptionsStyle}
        setSelectedFilter={setSelectedFilter}
        selectedFilter={selectedFilter}
      />

      <Animated.ScrollView
        onContentSizeChange={(width, height) => {
          setScrollViewHeight(height);
        }}
        style={{
          paddingTop: 50,
        }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        indicatorStyle="white"
      >
        <View>
          <Text style={styles.textInput_duplicate}></Text>
        </View>

        <View style={styles.rootsContainer}>
          {isLoading ? (
            <View style={styles.threeDotLoadingContainer}>
              <ThreeDotLoader />
            </View>
          ) : posts.length === 0 && search !== "" ? (
            <NoRootsFoundLoading
              subText={
                "No roots found for your search. Maybe try different keywords..."
              }
            />
          ) : posts.length === 0 ? (
            <NoRootsFoundLoading
              subText={"Haven't created any roots yet might want to now..."}
            />
          ) : (
            <DisplayRoots
              posts={postsByDate}
              setViewPostVisible={setViewPostVisible}
              setCurrentIndex={setCurrentIndex}
              flatPosts={flatPosts}
            />
          )}
        </View>

        <View style={{ height: 100 }} />
      </Animated.ScrollView>
      <Modal
        animationType="fade"
        visible={viewPostVisible}
        transparent={true}
        onRequestClose={() => setViewPostVisible(false)}
      >
        <ViewRoot
          currentIndex={currentIndex}
          posts={flatPosts}
          setViewPostVisible={setViewPostVisible}
          viewPostVisible={viewPostVisible}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput_duplicate: {
    height: 60,
    borderRadius: 30,
    padding: 20,
    backgroundColor: "transparent",
    fontSize: 24,
    marginTop: 10,
  },

  rootsContainer: {
    marginTop: 30,
  },

  threeDotLoadingContainer: {
    height: height / 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Search;
