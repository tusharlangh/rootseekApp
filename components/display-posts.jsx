import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  Modal,
  Pressable,
  Animated,
} from "react-native";
import { useColorMode } from "native-base";
import { useContext, useEffect, useRef, useState } from "react";
import ViewPost from "./viewPost";
import { PostsContext } from "./search";
import { AddLibraryIcon } from "./icons";
import { useFonts } from "expo-font";
import InterBold from "../assets/fonts/Inter-Bold.otf";
import InterMedium from "../assets/fonts/Inter-Medium.otf";
import InterSemiBold from "../assets/fonts/Inter-SemiBold.otf";
import InterRegular from "../assets/fonts/Inter-Regular.otf";

const DisplayPosts = ({ groupedPostsByDate, setSearch, animatedValue }) => {
  let [fontsLoaded] = useFonts({
    InterBold,
    InterMedium,
    InterSemiBold,
    InterRegular,
  });
  const { groupedPosts: posts } = useContext(PostsContext);
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "#8A898D" : "#8E8D93";
  const bgColor = colorMode === "light" ? "#F2F1F5" : "black";
  const [postIndex, setPostIndex] = useState(0);
  const [viewPostVisible, setViewPostVisible] = useState(false);

  useEffect(() => {
    const id = animatedValue.addListener(({ value }) => {
      console.log(value);
    });
    return () => {
      animatedValue.removeListener(id);
    };
  }, [animatedValue]);

  if (!posts) {
    return (
      <View style={{ height: "100%", width: "100%" }}>
        <ActivityIndicator
          size="small"
          style={{ height: "100%", width: "100%" }}
        />
      </View>
    );
  }

  const FormatTime = (post) => {
    const formattedTime = new Date(post.date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return formattedTime;
  };

  const getHashTags = (hashTags) => {
    const ht = hashTags.split("#").filter((h) => h.length > 0);
    return ht;
  };

  return (
    <View style={{ flex: 1, padding: 2 }}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{
          flex: 1,
          marginTop: 12,
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: animatedValue } } }],
          { useNativeDriver: true }
        )}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            gap: 10,
          }}
        >
          {groupedPostsByDate.map((p, index) => (
            <View key={index}>
              <Text
                style={{
                  color: colorMode === "light" ? "rgba(0,0,0,0.8)" : "white",
                  fontWeight: 500,
                  fontSize: 22,
                  marginBottom: 10,
                  marginTop: 12,
                  marginLeft: 4,
                  fontFamily: "InterMedium",
                }}
              >
                {p.title}
              </Text>
              <View
                style={{ display: "flex", flexDirection: "column", gap: 8 }}
              >
                {p.data.map((post, innerIndex) => (
                  <Pressable
                    key={innerIndex}
                    style={[
                      styles.postContainer,
                      {
                        backgroundColor:
                          colorMode === "light"
                            ? "rgba(255,255,255,1)"
                            : "#161618",
                        marginBottom:
                          index === groupedPostsByDate.length - 1 &&
                          innerIndex === p.data.length - 1
                            ? 100
                            : 0,
                      },
                    ]}
                    onPress={() => {
                      setPostIndex(posts.findIndex((p) => p._id === post._id));
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
                            fontFamily: "InterSemiBold",
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
                            fontFamily: "InterRegular",
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
                          {
                            color: colorMode === "light" ? "#3D3D3D" : "white",
                            fontFamily: "InterRegular",
                          },
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
                                    color:
                                      colorMode === "light" ? "black" : "white",
                                    backgroundColor:
                                      colorMode === "light"
                                        ? "rgba(213, 213, 213, 0.3)"
                                        : "#262629",
                                    paddingHorizontal: 10,
                                    paddingVertical: 3,
                                    borderRadius: 15,
                                    fontFamily: "InterRegular",
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
                          <View
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <Text
                              style={{
                                color:
                                  colorMode === "light" ? "black" : "white",
                                fontSize: 14,
                                fontWeight: 700,
                                fontFamily: "InterSemiBold",
                              }}
                            >
                              {post.trackName}
                            </Text>
                            <Text
                              style={{
                                color:
                                  colorMode === "light" ? "black" : "white",
                                fontSize: 12,
                                fontFamily: "InterRegular",
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
            </View>
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
          posts={posts}
          setViewPostVisible={setViewPostVisible}
          viewPostVisible={viewPostVisible}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default DisplayPosts;
