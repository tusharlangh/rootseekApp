import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  Modal,
  Pressable,
  Dimensions,
} from "react-native";
import { useColorMode } from "native-base";
import { useState } from "react";
import ViewPost from "./viewPost";

const { height, width } = Dimensions.get("window");

const DisplayHomePosts = ({ posts }) => {
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "#8A898D" : "#8E8D93";
  const bgColor = colorMode === "light" ? "#F7F7F9" : "black";
  const [postIndex, setPostIndex] = useState(0);
  const [viewPostVisible, setViewPostVisible] = useState(false);

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
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          flex: 1,
          marginTop: 12,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
            gap: 10,
            paddingBottom: 30,
            paddingHorizontal: 10,
          }}
        >
          <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
            {posts.map((post, index) => (
              <Pressable
                key={index}
                style={[
                  styles.postContainer,
                  {
                    backgroundColor:
                      colorMode === "light"
                        ? "rgba(255,255,255,0.5)"
                        : "#161618",
                    width: 250,
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
                        flex: 3.5,
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
                      { color: colorMode === "light" ? "#3D3D3D" : "white" },
                    ]}
                    numberOfLines={2}
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
                        <Text
                          key={index}
                          style={[
                            styles.postHashTags,
                            {
                              color: colorMode === "light" ? "black" : "white",
                              backgroundColor:
                                colorMode === "light" ? "#EEEEEE" : "#262629",
                              paddingHorizontal: 10,
                              paddingVertical: 3,
                              borderRadius: 15,
                            },
                          ]}
                        >
                          #{hashTag}
                        </Text>
                      ))}
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
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

export default DisplayHomePosts;
