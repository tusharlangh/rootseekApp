import { BlurView } from "expo-blur";
import { useColorMode } from "native-base";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Animated,
  Dimensions,
  PanResponder,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList } from "react-native";
import {
  CloseIcon,
  LeftArrowIcon,
  VolumeUpIcon,
  VolumeDownIcon,
  ShareIcon,
  ThreeDotsIcon,
} from "./icons";
import axios from "axios";
import { Audio } from "expo-av";

const { width, height } = Dimensions.get("window");

const ViewPost = ({
  posts,
  currentIndex,
  setViewPostVisible,
  viewPostVisible,
}) => {
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "#0D0D0D" : "#8E8D93";
  const bgColor = colorMode === "light" ? "#ECEBEF" : "black";
  const __dirname =
    "file:///Users/tusharlanghnoda/Desktop/Projects/RootSeek/rootseek/server";

  const [currIndex, setCurrIndex] = useState(currentIndex);
  const [song, setSong] = useState(null);

  const [mute, setMute] = useState(false);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    const fetchSong = async () => {
      if (posts[currIndex].trackId === "undefined") {
        stopPreviousSound();
      }
      if (mute) {
        toggleMute();
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

  useEffect(() => {
    if (song) {
      playSound();
    }
  }, [song]);

  const FormatTime = (post) => {
    const formattedTime = new Date(post.date).toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
    });
    return formattedTime;
  };

  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 90 };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      if (index !== currIndex) {
        setCurrIndex(index);
      }
    }
  }).current;

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
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: bgColor,
              width,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                position: "absolute",
                top: 70,
                zIndex: 100,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Pressable
                  style={[
                    {
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingLeft: 20,
                    },
                  ]}
                  onPress={() => {
                    stopPreviousSound();
                    setViewPostVisible(false);
                  }}
                >
                  <LeftArrowIcon
                    size={28}
                    color={colorMode === "light" ? "black" : "white"}
                  />
                </Pressable>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: colorMode === "light" ? "black" : "white",
                    paddingRight: 42,
                  }}
                >
                  {FormatTime(item)}
                </Text>
                <Text></Text>
              </View>
            </View>
            <LinearGradient
              colors={[item.gradientColor, bgColor]}
              style={{
                height,
                width,
                position: "relative",
              }}
            >
              <Image
                source={{
                  uri: __dirname + item.picture,
                }}
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  position: "absolute",
                }}
              />
              <View
                style={{
                  position: "absolute",
                  bottom: 50,
                  zIndex: 200,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  paddingRight: 18,
                  gap: 20,
                }}
              >
                <Pressable onPress={toggleMute}>
                  {item.trackId !== "undefined" ? (
                    mute ? (
                      <VolumeDownIcon
                        size={28}
                        color={
                          colorMode === "light"
                            ? "black"
                            : "rgba(255,255,255,0.8)"
                        }
                      />
                    ) : (
                      <VolumeUpIcon
                        size={28}
                        color={
                          colorMode === "light"
                            ? "black"
                            : "rgba(255,255,255,0.8)"
                        }
                      />
                    )
                  ) : (
                    ""
                  )}
                </Pressable>
                <Pressable style={[{}]}>
                  <ShareIcon
                    size={28}
                    color={
                      colorMode === "light" ? "black" : "rgba(255,255,255,0.8)"
                    }
                  />
                </Pressable>
                <View
                  style={[
                    {
                      width: "100%",
                      justifyContent: "space-between",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 14,
                    },
                  ]}
                >
                  <Text
                    numberOfLines={1}
                    style={{
                      paddingLeft: 14,
                      fontSize: 16,
                      fontWeight: "600",
                      color:
                        colorMode === "light"
                          ? "black"
                          : "rgba(255,255,255,0.8)",
                    }}
                  >
                    {item.hashTags}
                  </Text>
                  <Pressable style={[{}]}>
                    <ThreeDotsIcon
                      size={28}
                      color={
                        colorMode === "light"
                          ? "black"
                          : "rgba(255,255,255,0.8)"
                      }
                    />
                  </Pressable>
                </View>
              </View>
            </LinearGradient>

            <BlurView
              intensity={100}
              tint={colorMode === "light" ? "light" : "dark"}
              style={{
                maxHeight: "60%",
                gap: 10,
                paddingHorizontal: 20,
                borderRadius: 30,
                overflow: "hidden",
                padding: 30,
                minHeight: "35%",
                marginTop: -50,
                backgroundColor:
                  colorMode === "light" ? "rgba(255, 255, 255, 0.6)" : "black",
              }}
            >
              <Text
                style={{
                  fontSize: 38,
                  fontWeight: "600",
                  textAlign: "center",
                  color:
                    colorMode === "light"
                      ? "rgba(0, 0, 0, 0.8)"
                      : "rgba(245, 245, 245, 0.9)",
                  letterSpacing: -1,
                }}
              >
                {item.title}
              </Text>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "400",
                    color:
                      colorMode === "light"
                        ? "rgba(0, 0, 0, 0.9)"
                        : "rgba(245, 245, 245, 0.9)",
                  }}
                >
                  {item.content}
                </Text>
              </ScrollView>
              {item.trackId !== "undefined" && (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 10,
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontWeight: 600,
                        fontSize: 12,
                        color: colorMode === "light" ? "black" : "white",
                      }}
                    >
                      {item.trackName}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        color: colorMode === "light" ? "black" : "white",
                      }}
                    >
                      {item.trackArtist}
                    </Text>
                  </View>

                  <Image
                    source={{ uri: item.trackAlbumCover }}
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 6,
                      marginTop: 0,
                    }}
                  />
                </View>
              )}
            </BlurView>
          </View>
        )}
      />
    </View>
  );
};

export default ViewPost;
