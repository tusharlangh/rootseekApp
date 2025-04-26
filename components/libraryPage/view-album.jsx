import { useColorMode } from "native-base";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import { AddIcon, LeftArrowIcon, ShareIcon, ThreeDotsIcon } from "../icons";
import { DefualtCover } from "../../additional";
import { BlurView } from "expo-blur";
import { Animated } from "react-native";
import { useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import ViewPost from "../viewPost";

const { width, height } = Dimensions.get("window");
const ViewAlbum = ({ album, setIsModalVisible }) => {
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "black" : "white";
  const bgColor = colorMode === "light" ? "#F2F1F5" : "black";
  const [reachedTop, setReachedTop] = useState(false);

  const scrollY = useRef(new Animated.Value(0)).current;

  const [viewPostVisible, setViewPostVisible] = useState(false);
  const [postIndex, setPostIndex] = useState(0);

  useEffect(() => {
    //a normal useeffect will not work since scrollY is an changing object. The object remains same but the content inside of it is changing. Adding an event listener will attach with the value inside so whenever it changes it will call the useeffect.
    const id = scrollY.addListener(({ value }) => {
      if (value > 340) {
        setReachedTop(true);
      } else {
        setReachedTop(false);
      }
    });
    return () => {
      scrollY.removeListener(id);
    };
  }, [scrollY]);

  const linearGradient =
    colorMode === "light" ? ["#F2F1F5", "white"] : ["rgb(40, 40, 40)", "black"];

  const iconsBg =
    colorMode === "light" ? "rgb(230, 230, 230)" : "rgba(31, 31, 31, 0.9)";
  const iconsTextColor =
    colorMode === "light" ? "rgb(69, 69, 69)" : "rgb(182, 182, 182)";

  const FormatTime = (post) => {
    const formattedTime = new Date(post.date).toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
    });
    return formattedTime;
  };

  const getHashTags = (hashTags) => {
    const ht = hashTags.split("#").filter((h) => h.length > 0);
    return ht;
  };

  return (
    <LinearGradient
      colors={linearGradient}
      style={{
        height: height,
        width: width,
        backgroundColor: bgColor,
        position: "relative",
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 0,
          paddingTop: 60,
          padding: 14,
          zIndex: 300,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginBottom: 40,
          backgroundColor: reachedTop
            ? colorMode === "light"
              ? "#F2F1F5"
              : "rgba(31, 31, 31, 1)"
            : "",
        }}
      >
        <Pressable onPress={() => setIsModalVisible(false)}>
          <LeftArrowIcon size={24} color={textColor} />
        </Pressable>
        {reachedTop && (
          <Animated.Text
            style={{
              color: textColor,
              fontSize: 20,
              paddingLeft: 20,
              fontWeight: 600,
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [300, 400],
                    outputRange: [-100, 0],
                    extrapolate: "clamp",
                  }),
                },
              ],
              opacity: scrollY.interpolate({
                inputRange: [300, 400],
                outputRange: [0, 1],
                extrapolate: "clamp",
              }),
            }}
          >
            {album.title}
          </Animated.Text>
        )}

        <Pressable
          style={[
            styles.createButton,
            {
              padding: 6,
              paddingHorizontal: 12,
              backgroundColor:
                colorMode === "light"
                  ? "rgba(192, 192, 192, 0.5)"
                  : "rgba(65, 65, 65, 0.9)",
            },
          ]}
        >
          <Text
            style={[
              styles.createButtonText,
              {
                color: textColor,
              },
            ]}
          >
            Edit
          </Text>
        </Pressable>
      </View>

      <Animated.View
        style={{
          paddingTop: 100,
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [0, 300],
                outputRange: [0, -300],
                extrapolate: "clamp",
              }),
            },
          ],
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "black",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 10,
            elevation: 6,
          }}
        >
          {album.picture === "" && (
            <Animated.Image
              source={DefualtCover}
              style={{
                height: 250,
                width: 250,
                borderRadius: 12,

                transform: [
                  {
                    scale: scrollY.interpolate({
                      inputRange: [0, 400],
                      outputRange: [1, 0.5],
                      extrapolate: "clamp",
                    }),
                  },
                ],
              }}
            />
          )}
        </View>

        <Animated.View
          style={{
            padding: 10,
            opacity: scrollY.interpolate({
              inputRange: [0, 300],
              outputRange: [1, 0],
              extrapolate: "clamp",
            }),
          }}
        >
          <Text
            style={{
              color: textColor,
              fontSize: 30,
              fontWeight: 700,
              marginTop: 8,
              textAlign: "center",
            }}
          >
            {album.title}
          </Text>
          <Text
            numberOfLines={3}
            style={{
              color: textColor,
              fontSize: 12,
              fontWeight: 400,
              marginTop: 10,
              textAlign: "center",
            }}
          >
            {album.description
              ? album.description
              : "A paragraph is a distinct section of writing that typically focuses on a single idea or topic, generally consisting of several sentences. It's usually indicated by an indent at the beginning of the first sentence and helps organize and structure written work, making it easier for readers to follow the author's thoughtss"}
          </Text>
        </Animated.View>
        <Animated.View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 20,
            padding: 10,
            alignItems: "center",
            opacity: scrollY.interpolate({
              inputRange: [0, 300],
              outputRange: [1, 0],
              extrapolate: "clamp",
            }),
          }}
        >
          <Pressable
            style={[
              styles.createButton,
              {
                padding: 8,
                backgroundColor: iconsBg,
              },
            ]}
          >
            <ShareIcon size={22} color={iconsTextColor} />
          </Pressable>
          <Pressable
            style={[
              styles.createButton,
              {
                padding: 8,
                backgroundColor: iconsBg,
              },
            ]}
          >
            <ThreeDotsIcon size={22} color={iconsTextColor} />
          </Pressable>
          <View>
            <Text style={{ color: iconsTextColor }}>
              {album.totalPosts} Roots
            </Text>
          </View>
        </Animated.View>
      </Animated.View>

      {album.totalPosts === 0 && (
        <View
          style={{
            flexDirection: "row",
            gap: 4,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 15,
            alignSelf: "center",
            backgroundColor: textColor,
            shadowColor: "black",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 6,
            marginTop: 30,
          }}
        >
          <AddIcon size={18} color={bgColor} />
          <Text style={{ color: bgColor, fontWeight: 700 }}>
            Add roots to this album
          </Text>
        </View>
      )}
      <Animated.ScrollView
        scrollEventThrottle={16} //every 16 miliseconds the scroll value will be checked.
        onScroll={Animated.event(
          //animated.event helps transform data into a animated value.
          [{ nativeEvent: { contentOffset: { y: scrollY } } }], //native event is a package of information you get from your phone like how much you have scrolled.
          { useNativeDriver: true } //let the phones graphics be used for smoother animation.
        )}
        style={{
          flex: 1,
          zIndex: 200,
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          right: 0,
          height,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            gap: 10,
            marginTop: 540,
            padding: 10,
            paddingBottom: 90,
          }}
        >
          {album.posts.map((post, index) => (
            <Pressable
              key={index}
              style={[
                styles.postContainer,
                {
                  backgroundColor: colorMode === "light" ? "white" : "#161618",
                },
              ]}
              onPress={() => {
                setPostIndex(index);
                setViewPostVisible(true);
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Text
                  style={[
                    styles.postTitle,
                    {
                      color: colorMode === "light" ? "black" : "white",
                      flex: 7.5,
                    },
                  ]}
                  numberOfLines={1}
                >
                  {post.title}
                </Text>
                <Text
                  style={[
                    styles.postTime,
                    {
                      flex: 1.5,
                      color: colorMode === "light" ? "black" : "white",
                    },
                  ]}
                >
                  {FormatTime(post)}
                </Text>
              </View>

              <View>
                <Text
                  style={[
                    styles.postContent,
                    { color: colorMode === "light" ? "black" : "white" },
                  ]}
                  numberOfLines={4}
                >
                  {post.content}
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 4,
                  }}
                >
                  {post.hashTags &&
                    getHashTags(post.hashTags).map((hashTag, index) => (
                      <Pressable
                        key={index}
                        onPress={() => setSearch("#" + hashTag)}
                      >
                        <Text
                          style={[
                            styles.postHashTags,
                            {
                              color: colorMode === "light" ? "black" : "white",
                              backgroundColor:
                                colorMode === "light" ? "#F0F0F0" : "#262629",
                              paddingHorizontal: 10,
                              paddingVertical: 3,
                              borderRadius: 15,
                            },
                          ]}
                        >
                          #{hashTag}
                        </Text>
                      </Pressable>
                    ))}
                </View>
              </View>
              {post.trackId !== "undefined" ? (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Image
                      source={{ uri: post.trackAlbumCover }}
                      style={{ width: 50, height: 50, borderRadius: 6 }}
                    />
                    <View style={{ display: "flex", flexDirection: "column" }}>
                      <Text
                        style={{
                          color: colorMode === "light" ? "black" : "white",
                          fontSize: 14,
                          fontWeight: 700,
                        }}
                      >
                        {post.trackName}
                      </Text>
                      <Text
                        style={{
                          color: colorMode === "light" ? "black" : "white",
                          fontSize: 12,
                        }}
                      >
                        {post.trackArtist}
                      </Text>
                    </View>
                  </View>
                </View>
              ) : (
                ""
              )}
            </Pressable>
          ))}
        </View>
      </Animated.ScrollView>
      <Modal
        animationType="fade"
        visible={viewPostVisible}
        transparent={true}
        onRequestClose={() => setViewPostVisible(false)}
      >
        <ViewPost
          currentIndex={postIndex}
          posts={album.posts}
          setViewPostVisible={setViewPostVisible}
          viewPostVisible={viewPostVisible}
        />
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  createButton: {
    borderRadius: 10,
  },
  createButtonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
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

export default ViewAlbum;
