import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import { theme } from "../../theme";
import { RightArrow } from "../icons";

const { height, width } = Dimensions.get("window");

const DisplayRoots = ({
  posts,
  setViewPostVisible,
  setCurrentIndex,
  flatPosts,
}) => {
  const getHashTags = (hashTags) => {
    const ht = hashTags.split("#").filter((h) => h.length > 0);
    return ht;
  };

  const FormatTime = (post) => {
    const formattedTime = new Date(post.date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return formattedTime;
  };

  const getRootIndex = (selectedRootId) => {
    return flatPosts.findIndex((root) => root._id === selectedRootId);
  };

  return posts.map((p, i) => (
    <View key={i}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={styles.date}>{p.title}</Text>
      </View>

      {p.data.map((post, index) => (
        <Pressable
          key={index}
          onPress={() => {
            setCurrentIndex(getRootIndex(post._id));
            setViewPostVisible(true);
          }}
        >
          <View style={styles.roots}>
            <View style={styles.root_title_and_date_container}>
              <Text style={styles.rootTitle} numberOfLines={1}>
                {post.title}
              </Text>
              <Text style={[styles.rootDate]}>{FormatTime(post)}</Text>
            </View>

            <Text style={styles.rootContent} numberOfLines={4}>
              {post.content}
            </Text>

            <View style={{ flexDirection: "row" }}>
              {post.hashTags &&
                getHashTags(post.hashTags).map((hashTag, index) => (
                  <Pressable
                    key={index}
                    onPress={() => setSearch("#" + hashTag)}
                  >
                    <Text style={styles.rootHashTags}>#{hashTag}</Text>
                  </Pressable>
                ))}
            </View>

            {post.trackId !== "undefined" ? (
              <View style={styles.root_track_container}>
                <Image
                  source={{ uri: post.trackAlbumCover }}
                  style={styles.rootImage}
                />
                <View>
                  <Text style={styles.rootTrackName}>{post.trackName}</Text>
                  <Text style={styles.rootTrackArtist}>{post.trackArtist}</Text>
                </View>
              </View>
            ) : (
              ""
            )}
          </View>
        </Pressable>
      ))}
    </View>
  ));
};

const styles = StyleSheet.create({
  date: {
    color: theme.sticky_search.display_roots.date_text,
    fontSize: 18,
    fontWeight: "700",
    paddingHorizontal: 18,
    padding: 5,
    backgroundColor: theme.sticky_search.display_roots.date_bg,
    borderRadius: 10,
    marginLeft: 10,
  },
  roots: {
    backgroundColor: theme.main_background,
    padding: 14,
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
    fontSize: 16,
    fontWeight: "700",
    width: width - 100,
  },
  rootDate: {
    color: theme.constants.root_date,
  },
  rootContent: {
    color: theme.constants.root_content,
    fontSize: 14,
    fontWeight: "400",
    paddingTop: 6,
  },
  rootHashTags: {
    color: theme.constants.root_hashTags,
    fontSize: 14,
    fontWeight: "400",
    paddingTop: 6,
  },
  root_track_container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingTop: 8,
  },
  rootImage: {
    height: 40,
    width: 40,
  },
  rootTrackName: {
    color: theme.constants.root_track,
    fontSize: 12,
    fontWeight: "600",
  },
  rootTrackArtist: {
    color: theme.constants.root_track,
    fontSize: 12,
  },
});

export default DisplayRoots;
