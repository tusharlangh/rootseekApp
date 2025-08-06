import { View, Text, StyleSheet, Pressable } from "react-native";
import { theme } from "../../theme";
import moment from "moment";
import { useEffect, useState } from "react";
import ViewRoot from "../rootScreen/viewRoot";

const RecentlyMadePosts = ({ posts }) => {
  //const [viewPostVisible, setViewPostVisible] = useState(false);
  //const [currentIndex, setCurrentIndex] = useState(0);

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

  const getTime = (post) => {
    const date = moment(post.date).toDate();

    const diff = moment().diff(date, "hours");

    if (diff <= 0) {
      return moment().diff(date, "minutes") + " min ago";
    }

    return diff === 1 ? diff + " hour ago" : diff + " hours ago";
  };

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
        <Text style={[styles.rootDate]}>{getTime(post)}</Text>
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
    fontSize: 12,
  },
});

export default RecentlyMadePosts;
