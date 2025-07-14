import { View, Text, StyleSheet } from "react-native";
import { theme } from "../../theme";

const RecentlyMadePosts = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return (
      <View
        style={{
          width: 300,
        }}
      >
        <Text style={{ color: "white" }}>
          No recent activity. Have something in your mind, write a root...
        </Text>
      </View>
    );
  }

  return posts.map((post, index) => (
    <View
      key={index}
      style={[
        styles.postContainer,
        { borderRightWidth: index !== posts.length - 1 ? 1 : 0 },
      ]}
    >
      <View style={styles.root_title_and_date_container}>
        <Text style={styles.rootTitle} numberOfLines={1}>
          {post.title}
        </Text>
        <Text style={[styles.rootDate]}>8h</Text>
      </View>
      <Text style={styles.rootContent} numberOfLines={3}>
        {post.content}
      </Text>
    </View>
  ));
};

const styles = StyleSheet.create({
  postContainer: {
    width: 250,
    borderRightColor:
      theme.home_screen.recently_made.root_sepearating_border_color,
    paddingRight: 18,
    justifyContent: "center",
  },
  root_title_and_date_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    justifyContent: "space-between",
  },
  rootTitle: {
    color: theme.constants.root_title,
    fontWeight: "700",
    fontSize: 16,
    width: 170,
  },
  rootContent: {
    color: theme.constants.root_content,
    fontSize: 14,
    marginTop: 4,
  },
  rootDate: {
    color: theme.constants.root_date,
  },
});

export default RecentlyMadePosts;
