import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import { useColorMode } from "native-base";

const DisplayPosts = ({ posts }) => {
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "black" : "white";
  const bgColor = colorMode === "light" ? "white" : "#121212";

  if (!posts) {
    return <Text>Loading...</Text>;
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
          height: "100%",
          width: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: bgColor,
        }}
      >
        <Text
          style={{
            fontWeight: "700",
            fontSize: 24,
            color: textColor,
            marginBottom: 92,
          }}
        >
          No roots found.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ height: "100%" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginBottom: 150,
          backgroundColor: bgColor,
        }}
      >
        {posts.map((post, index) => (
          <View
            key={index}
            style={[
              styles.postContainer,
              {
                backgroundColor: colorMode === "light" ? "#F8F8F8" : "#181818",
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
                style={[styles.postTitle, { color: textColor, flex: 7.5 }]}
                numberOfLines={1}
              >
                {post.title}
              </Text>
              <Text style={[styles.postTime, { flex: 1.5 }]}>
                {FormatTime(post)}
              </Text>
            </View>

            <View>
              <Text
                style={[
                  styles.postContent,
                  { color: colorMode === "light" ? "black" : "#B3B3B3" },
                ]}
                numberOfLines={4}
              >
                {post.content}
              </Text>
              <View style={{ display: "flex", flexDirection: "row" }}>
                {post.hashTags &&
                  getHashTags(post.hashTags).map((hashTag, index) => (
                    <Text
                      key={index}
                      style={[styles.postHashTags, { color: textColor }]}
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
                    style={{ color: textColor, fontSize: 14, fontWeight: 700 }}
                  >
                    {post.trackName}
                  </Text>
                  <Text style={{ color: textColor, fontSize: 12 }}>
                    {post.trackArtist}
                  </Text>
                </View>
              </View>
            ) : (
              ""
            )}
          </View>
        ))}
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
    backgroundColor: "#F8F8F8",
    marginBottom: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 5,
  },
  postTitle: {
    fontWeight: "700",
    fontSize: 28,
  },
  postContent: {
    fontWeight: "400",
    fontSize: 14,
    color: "#B3B3B3",
  },
  postHashTags: {
    marginTop: 4,
    fontWeight: "700",
    fontSize: 14,
    color: "white",
  },
  postTime: {
    marginTop: 4,
    fontWeight: "700",
    fontSize: 12,
    textAlign: "right",
    color: "#737373",
  },
});

export default DisplayPosts;
