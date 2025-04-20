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
import { useState } from "react";
import ViewPost from "./viewPost";

const DisplayPosts = ({ posts }) => {
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
    <View style={{ flex: 1 }}>
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
            paddingBottom: 30,
          }}
        >
          <Pressable
            style={[
              styles.postContainer,
              {
                backgroundColor: colorMode === "light" ? "white" : "#161618",
              },
            ]}
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
                what happened today.
              </Text>
              <Text style={[styles.postTime, { flex: 1.5, color: textColor }]}>
                11:35
              </Text>
            </View>

            <View>
              <Text
                style={[styles.postContent, { color: textColor }]}
                numberOfLines={4}
              >
                It sounds like you're describing a serious medical condition,
                possibly a severe case of carotid artery disease or another
                vascular issue leading to stroke risk. If a doctor has
                recommended daily medication or a stent, it's crucial to follow
                their advice carefully. However, missing a single dose of
                medication does not necessarily mean immediate death, but it can
                increase the risk of complications over time.
              </Text>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text
                  style={[
                    styles.postHashTags,
                    { color: colorMode === "light" ? "black" : "white" },
                  ]}
                >
                  #rootseekapp
                </Text>
              </View>
            </View>
          </Pressable>

          {posts.map((post, index) => (
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
                  style={[styles.postTime, { flex: 1.5, color: textColor }]}
                >
                  {FormatTime(post)}
                </Text>
              </View>

              <View>
                <Text
                  style={[styles.postContent, { color: textColor }]}
                  numberOfLines={4}
                >
                  {post.content}
                </Text>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  {post.hashTags &&
                    getHashTags(post.hashTags).map((hashTag, index) => (
                      <Text
                        key={index}
                        style={[
                          styles.postHashTags,
                          { color: colorMode === "light" ? "black" : "white" },
                        ]}
                      >
                        #{hashTag}
                      </Text>
                    ))}
                </View>
              </View>
              {post.trackId !== "undefined" ? (
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
              ) : (
                ""
              )}
            </Pressable>
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
    gap: 10,
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
    marginTop: 4,
    fontWeight: "500",
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
