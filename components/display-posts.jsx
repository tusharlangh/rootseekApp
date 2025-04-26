import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  Modal,
  Pressable,
} from "react-native";
import { useColorMode } from "native-base";
import { useContext, useState } from "react";
import ViewPost from "./viewPost";
import { PostsContext } from "./search";
import { AddLibraryIcon } from "./icons";

const DisplayPosts = ({ groupedPostsByDate, setSearch }) => {
  const { groupedPosts: posts } = useContext(PostsContext);
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "#8A898D" : "#8E8D93";
  const bgColor = colorMode === "light" ? "#F2F1F5" : "black";
  const [postIndex, setPostIndex] = useState(0);
  const [viewPostVisible, setViewPostVisible] = useState(false);

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
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{
          flex: 1,
          marginTop: 12,
          backgroundColor: bgColor,
        }}
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
                  color: colorMode === "light" ? "black" : "white",
                  fontWeight: 500,
                  fontSize: 22,
                  marginBottom: 10,
                  marginTop: 12,
                  marginLeft: 4,
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
                          colorMode === "light" ? "white" : "#161618",
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
                                    color:
                                      colorMode === "light" ? "black" : "white",
                                    backgroundColor:
                                      colorMode === "light"
                                        ? "#F0F0F0"
                                        : "#262629",
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
                          <View
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <Text
                              style={{
                                color:
                                  colorMode === "light" ? "black" : "white",
                                fontSize: 14,
                                fontWeight: 700,
                              }}
                            >
                              {post.trackName}
                            </Text>
                            <Text
                              style={{
                                color:
                                  colorMode === "light" ? "black" : "white",
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
            </View>
          ))}
        </View>
      </ScrollView>
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
