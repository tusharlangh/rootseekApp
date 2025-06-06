import { View, Text, StyleSheet } from "react-native";

const RecentlyMadePosts = ({ posts }) => {
  return posts.map((post, index) => (
    <View
      key={index}
      style={[
        styles.postContainer,
        { borderRightWidth: index !== posts.length - 1 ? 1 : 0 },
      ]}
    >
      <Text style={styles.postTitle} numberOfLines={1}>
        {post.title}
      </Text>
      <Text style={styles.postContent} numberOfLines={3}>
        {post.content}
      </Text>
    </View>
  ));
};

const styles = StyleSheet.create({
  postContainer: {
    width: 200,
    borderRightColor: "rgb(24,24,24)",
    paddingRight: 18,
    justifyContent: "center",
  },
  postTitle: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },
  postContent: {
    color: "rgb(180, 180, 180)",
    fontSize: 12,
    marginTop: 4,
  },
});

export default RecentlyMadePosts;
