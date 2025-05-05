import { useColorMode } from "native-base";
import { View, Text, StyleSheet, Pressable } from "react-native";

const ThemePosts = ({ post, index }) => {
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "black" : "white";
  const bgColor = colorMode === "light" ? "#F7F7F9" : "black";

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
    <Pressable
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
              <Pressable key={index} onPress={() => setSearch("#" + hashTag)}>
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

export default ThemePosts;
