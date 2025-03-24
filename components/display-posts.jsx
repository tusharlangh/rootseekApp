import { StyleSheet, View, Text, ScrollView } from "react-native";

const DisplayPosts = ({ posts }) => {
  if (!posts) {
    return <Text>Loading...</Text>;
  }

  const FormatTime = (post) => {
    const formattedTime = new Date(post.date).toLocaleTimeString("en-US", {
      //manipulating the post.date object into a new object that is easier to read.
      month: "short",
      day: "2-digit",
      year: "numeric",
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
          height: "96%",
          width: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "700", fontSize: 24 }}>No roots found.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={{
        marginTop: 12,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        marginBottom: 150,
      }}
    >
      {posts.map((post, index) => (
        <View key={index} style={styles.postContainer}>
          <Text style={styles.postTitle} numberOfLines={2}>
            {post.title}
          </Text>
          <View>
            <Text style={styles.postContent} numberOfLines={5}>
              {post.content}
            </Text>
            <View style={{ display: "flex", flexDirection: "row" }}>
              {post.hashTags &&
                getHashTags(post.hashTags).map((hashTag, index) => (
                  <Text key={index} style={styles.postHashTags}>
                    #{hashTag}
                  </Text>
                ))}
            </View>
            <Text style={styles.postTime}>{FormatTime(post)}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
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
    color: "#5C5C5C",
  },
  postHashTags: {
    marginTop: 4,
    fontWeight: "700",
    fontSize: 14,
    color: "#393939",
  },
  postTime: {
    marginTop: 4,
    fontWeight: "700",
    fontSize: 12,
    textAlign: "right",
    color: "#5C5C5C",
  },
});

export default DisplayPosts;
