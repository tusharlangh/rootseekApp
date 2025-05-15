import { BlurView } from "expo-blur";
import { useColorMode } from "native-base";
import { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  Pressable,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList } from "react-native";
import {
  LeftArrowIcon,
  VolumeUpIcon,
  VolumeDownIcon,
  ShareIcon,
  ThreeDotsIcon,
  AddLibraryIcon,
  CheckmarkIcon,
} from "./icons";
import axios from "axios";
import { Audio } from "expo-av";
import { PostsContext } from "./search";
import BottomPage from "./bottom-page";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DefualtCover } from "../additional";
import { RefreshValue } from "./navbar";
import ContentWithoutPicture from "./contentWithoutPicture";
import ContentWithPicture from "./contentWithPicture";
import FuturaCyrillicBold from "../assets/fonts/FuturaCyrillicBold.ttf";
import FuturaCyrillicMedium from "../assets/fonts/FuturaCyrillicMedium.ttf";
import FuturaCyrillicLight from "../assets/fonts/FuturaCyrillicLight.ttf";
import FuturaCyrillicBook from "../assets/fonts/FuturaCyrillicBook.ttf";
import FuturaCyrillicDemi from "../assets/fonts/FuturaCyrillicDemi.ttf";
import { useFonts } from "expo-font";

const { width, height } = Dimensions.get("window");

const ViewPost = ({
  currentIndex,
  setViewPostVisible,
  viewPostVisible,
  posts,
}) => {
  let [fontsLoaded] = useFonts({
    FuturaCyrillicBold,
    FuturaCyrillicMedium,
    FuturaCyrillicLight,
    FuturaCyrillicBook,
    FuturaCyrillicDemi,
  });

  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "#0D0D0D" : "#8E8D93";
  const bgColor = "black";
  const __dirname =
    "file:///Users/tusharlanghnoda/Desktop/Projects/RootSeek/rootseek/server";

  const [currIndex, setCurrIndex] = useState(currentIndex);
  const [song, setSong] = useState(null);

  const [mute, setMute] = useState(false);
  const [sound, setSound] = useState(null);

  const [albums, setAlbums] = useState([]);
  const [isAddToLibraryModal, setIsAddToLibraryModal] = useState(false);
  const [checkedMarked, setCheckedMarked] = useState(posts[currIndex].albumId);
  const [selectedPost, setSelectedPost] = useState(null);

  const { refreshValue, setRefreshValue } = useContext(RefreshValue);

  const [showMoreContent, setShowMoreContent] = useState(false);
  const animatedController = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(0);

  const toggleContent = () => {
    Animated.spring(animatedController, {
      toValue: showMoreContent ? 0 : 1,
      friction: 8,
      tension: 40,
    }).start(() => {
      setShowMoreContent(!showMoreContent);
    });
  };

  const translateYInterpolate = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -200],
  });

  const opacityInterpolate = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1],
  });

  useEffect(() => {
    if (posts[currIndex]) {
      setCheckedMarked(posts[currIndex].albumId);
    }
  }, [currIndex]);

  useEffect(() => {
    const fetchSong = async () => {
      if (posts[currIndex].trackId === "undefined") {
        stopPreviousSound();
      }
      if (mute) {
        setMute(!mute);
      }
      try {
        const response = await axios.get(
          `http://localhost:5002/deezer-search-song?trackId=${posts[currIndex].trackId}`
        );
        setSong(response.data);
      } catch (error) {
        console.error("Error searching music:", error);
      }
    };
    fetchSong();
  }, [currIndex]);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = await AsyncStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:5002/library/albums-all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAlbums(response.data);
      } catch (error) {}
    };
    fetchPosts();
  }, []);

  const stopPreviousSound = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
    }
  };

  const playSound = async () => {
    if (!song) return;

    try {
      await stopPreviousSound();
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: song },
        { shouldPlay: true }
      );
      await newSound.setIsLoopingAsync(true);
      setSound(newSound);

      await newSound.playAsync();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  const toggleMute = async () => {
    if (sound) {
      const newMuted = !mute;
      setMute(newMuted);
      await sound.setIsMutedAsync(newMuted);
    }
  };

  {
    /*
    useEffect(() => {
    if (song) {
      playSound();
    }
  }, [song]);
  */
  }

  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 90 };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      if (index !== currIndex) {
        setCurrIndex(index);
        setRefreshValue((prev) => prev + 1);
      }
    }
  }).current;

  const AddToSelectedAlbum = async () => {
    const token = await AsyncStorage.getItem("token");

    try {
      const response = await axios.patch(
        `http://localhost:5002/library/albums/${checkedMarked}/add-post`,
        {
          post: selectedPost,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsAddToLibraryModal(false);
      setSelectedPost(null);
      setRefreshValue((prev) => prev + 1);
      console.log(response.data.message);
    } catch (error) {
      console.log(error.data);
    }
  };

  return (
    <View>
      <FlatList
        initialScrollIndex={currentIndex}
        data={posts}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        decelerationRate="fast"
        snapToInterval={width}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })} 
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        renderItem={({ item }) =>
          !item.picture ? (
            <ContentWithoutPicture
              item={item}
              toggleMute={toggleMute}
              mute={mute}
              stopPreviousSound={stopPreviousSound}
              setIsAddToLibraryModal={setIsAddToLibraryModal}
              setSelectedPost={setSelectedPost}
              setViewPostVisible={setViewPostVisible}
            />
          ) : (
            <ContentWithPicture
              item={item}
              toggleMute={toggleMute}
              translateYInterpolate={translateYInterpolate}
              opacityInterpolate={opacityInterpolate}
              showMoreContent={showMoreContent}
              mute={mute}
              stopPreviousSound={stopPreviousSound}
              toggleContent={toggleContent}
              setIsAddToLibraryModal={setIsAddToLibraryModal}
              setSelectedPost={setSelectedPost}
              setViewPostVisible={setViewPostVisible}
              setContentHeight={setContentHeight}
            />
          )
        }
      />
      <BottomPage
        isModalVisible={isAddToLibraryModal}
        setIsModalVisible={setIsAddToLibraryModal}
        height={90}
      >
        <View style={{ height: "100%" }}>
          <View
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 40,
                height: 5,
                borderRadius: 10,
                backgroundColor: "rgb(192, 192, 192)",
                marginTop: -10,
              }}
            ></View>
          </View>

          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              fontWeight: 600,
              marginTop: 10,
              color: colorMode === "light" ? "black" : "white",
            }}
          >
            Pick an album or goal to add to
          </Text>

          <View>
            {albums.map((album, index) => (
              <Pressable
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 12,
                  marginTop: 20,
                  backgroundColor:
                    checkedMarked === album._id ? "rgba(255,255,255,0.25)" : "",
                  borderRadius: 8,
                }}
                onPress={() => {
                  if (checkedMarked) {
                    setCheckedMarked(null);
                  } else {
                    setCheckedMarked(album._id);
                  }
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  {!album.picture ? (
                    <Image
                      source={DefualtCover}
                      style={{ height: 50, width: 50, borderRadius: 4 }}
                    />
                  ) : (
                    <Image
                      source={{ uri: __dirname + album.picture }}
                      style={{ height: 50, width: 50, borderRadius: 4 }}
                    />
                  )}
                  <View style={{ marginLeft: 8 }}>
                    <Text
                      style={{
                        color: colorMode === "light" ? "black" : "white",
                        fontSize: 16,
                        fontWeight: 500,
                      }}
                    >
                      {album.title}
                    </Text>
                    <Text style={{ color: textColor }}>
                      {album.totalPosts} roots
                    </Text>
                  </View>
                </View>

                {checkedMarked === album._id ? (
                  <Pressable style={{}} onPress={() => setCheckedMarked(null)}>
                    <CheckmarkIcon size={24} color={textColor} />
                  </Pressable>
                ) : (
                  <Pressable
                    style={{
                      height: 20,
                      width: 20,
                      borderWidth: 2,
                      borderRadius: 10,
                      borderColor: textColor,
                      marginRight: 2,
                    }}
                    onPress={() => setCheckedMarked(album._id)}
                  ></Pressable>
                )}
              </Pressable>
            ))}
          </View>
          <View
            style={{
              alignSelf: "center",
              position: "absolute",
              bottom: 60,
              shadowColor: "black",
              shadowOffset: { width: 6, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 10,
              elevation: 6,
            }}
          >
            <Pressable
              style={{
                paddingHorizontal: 18,
                paddingVertical: 10,
                backgroundColor: colorMode === "light" ? "black" : "white",
                borderRadius: 16,
              }}
              onPress={AddToSelectedAlbum}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: colorMode === "light" ? "white" : "black",
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                Done
              </Text>
            </Pressable>
          </View>
        </View>
      </BottomPage>
    </View>
  );
};

export default ViewPost;
