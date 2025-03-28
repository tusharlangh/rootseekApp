import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { useColorMode } from "native-base";

const DisplayPosts = ({ posts }) => {
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "#8A898D" : "#8E8D93";
  const bgColor = colorMode === "light" ? "#F2F1F5" : "black";

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

  if (posts.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "500",
            fontSize: 20,
            color: colorMode === "light" ? "black" : "white",
          }}
        >
          No posts found
        </Text>
      </View>
    );
  }

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
          {posts.map((post, index) => (
            <View
              key={index}
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
            </View>
          ))}
        </View>
      </ScrollView>
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
    fontSize: 22,
  },
  postContent: {
    fontWeight: "400",
    fontSize: 16,
    color: "#B3B3B3",
  },
  postHashTags: {
    marginTop: 4,
    fontWeight: "500",
    fontSize: 16,
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
