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

const { width, height } = Dimensions.get("window");

const ViewPost = ({
  currentIndex,
  setViewPostVisible,
  viewPostVisible,
  posts,
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

  const [albums, setAlbums] = useState([]);
  const [isAddToLibraryModal, setIsAddToLibraryModal] = useState(false);
  const [checkedMarked, setCheckedMarked] = useState(posts[currIndex].albumId);
  const [selectedPost, setSelectedPost] = useState(null);

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

  const FormatTime = (post) => {
    const formattedTime = new Date(post.date).toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
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
              colors={[item.gradientColor, bgColor, bgColor]}
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
            </LinearGradient>

            <BlurView
              intensity={0}
              tint={colorMode === "light" ? "light" : "dark"}
              style={{
                gap: 10,
                paddingHorizontal: 20,
                borderRadius: 30,
                overflow: "hidden",
                padding: 30,
                marginBottom: 30,
                position: "absolute",
                bottom: 0,
                right: 0,
                left: 0,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: 20,
                }}
              >
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
                      fontSize: 18,
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
              <Text
                style={{
                  fontSize: 38,
                  fontWeight: "600",
                  color:
                    colorMode === "light"
                      ? "rgba(0, 0, 0, 0.8)"
                      : "rgba(245, 245, 245, 0.9)",
                  letterSpacing: -1,
                }}
              >
                {item.title}
              </Text>
              <View style={{ maxHeight: 200 }}>
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
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 30,
                  alignItems: "center",
                  justifyContent: "flex-end",
                  marginTop: 0,
                  marginBottom: 10,
                }}
              >
                <Pressable
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 4,
                  }}
                  onPress={() => {
                    setIsAddToLibraryModal(true);
                    setSelectedPost(item);
                  }}
                >
                  {!item.albumId ? (
                    <AddLibraryIcon
                      size={28}
                      color={
                        colorMode === "light"
                          ? "black"
                          : "rgba(255,255,255,0.8)"
                      }
                    />
                  ) : (
                    <CheckmarkIcon
                      size={28}
                      color={
                        colorMode === "light"
                          ? "black"
                          : "rgba(255,255,255,0.8)"
                      }
                    />
                  )}
                </Pressable>
                <Pressable
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ShareIcon
                    size={28}
                    color={
                      colorMode === "light" ? "black" : "rgba(255,255,255,0.8)"
                    }
                  />
                </Pressable>
              </View>
              {item.trackId !== "undefined" && (
                <View
                  style={{
                    width: "100%",
                    height: 1,
                    backgroundColor:
                      colorMode === "light" ? "#D4D5DA" : "#282828",
                    marginBottom: 10,
                  }}
                ></View>
              )}

              {item.trackId !== "undefined" && (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 14,
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 14,
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={{ uri: item.trackAlbumCover }}
                      style={{
                        width: 58,
                        height: 58,
                        borderRadius: 6,
                      }}
                    />
                    <View>
                      <Text
                        style={{
                          fontWeight: 600,
                          fontSize: 18,
                          color: colorMode === "light" ? "black" : "white",
                          width: 200,
                        }}
                        numberOfLines={1}
                      >
                        {item.trackName}
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          color: colorMode === "light" ? "black" : "white",
                        }}
                      >
                        {item.trackArtist}
                      </Text>
                    </View>
                  </View>

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
                </View>
              )}
            </BlurView>
          </View>
        )}
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
                  }}
                >
                  {album.picture === "" && (
                    <Image
                      source={DefualtCover}
                      style={{
                        height: 50,
                        width: 50,
                        borderRadius: 4,
                      }}
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
              bottom: 80,
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
                  color: bgColor,
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
