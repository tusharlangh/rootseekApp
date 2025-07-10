import { BlurView } from "expo-blur";
import { useColorMode } from "native-base";
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  Pressable,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  LeftArrowIcon,
  VolumeUpIcon,
  VolumeDownIcon,
  ShareIcon,
  ThreeDotsIcon,
} from "../icons";
import { theme } from "../../theme";

const { width, height } = Dimensions.get("window");

const ContentWithoutPicture = ({
  item,
  toggleMute,
  mute,
  stopPreviousSound,
  setSelectedPost,
  setViewPostVisible,
}) => {
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "#0D0D0D" : "#8E8D93";
  const bgColor = colorMode === "light" ? "#F2F1F5" : "black";

  const FormatTime = (post) => {
    const formattedTime = new Date(post.date).toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
    return formattedTime;
  };

  return (
    <View style={styles.main_container}>
      <View style={styles.header_container}>
        <View style={styles.header_sub_container}>
          <Pressable
            style={styles.left_icon_pressable}
            onPress={() => {
              stopPreviousSound();
              setViewPostVisible(false);
            }}
          >
            <LeftArrowIcon size={28} color={"black"} />
          </Pressable>
          <Text style={styles.header_date}>{FormatTime(item)}</Text>
          <Text></Text>
        </View>
      </View>
      <LinearGradient
        colors={[item.linearGradient.light, bgColor, bgColor]}
        style={{
          height,
          width,
          position: "relative",
        }}
      ></LinearGradient>

      <BlurView
        intensity={0}
        tint={colorMode === "light" ? "light" : "dark"}
        style={styles.content_area_container}
      >
        <View style={styles.tags_menu_container}>
          <View style={styles.tags_menu_sub_container}>
            <Text style={styles.root_tags}>{item.hashTags}</Text>
            <View style={styles.menu_container}>
              <Pressable>
                <ThreeDotsIcon size={28} color={"black"} />
              </Pressable>
            </View>
          </View>
        </View>

        <Text style={styles.root_title}>{item.title}</Text>

        <View style={styles.root_content_container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.root_content}>{item.content}</Text>
          </ScrollView>
        </View>

        {item.trackId !== "undefined" && (
          <View style={styles.seperator_line}></View>
        )}

        {item.trackId !== "undefined" && (
          <View style={styles.track_container}>
            <View style={styles.sub_track_container}>
              <Image
                source={{ uri: item.trackAlbumCover }}
                style={styles.root_track_cover}
              />
              <View>
                <Text style={styles.root_track_name} numberOfLines={1}>
                  {item.trackName}
                </Text>
                <Text style={styles.root_track_artist}>{item.trackArtist}</Text>
              </View>
            </View>

            <Pressable onPress={toggleMute}>
              {item.trackId !== "undefined" ? (
                mute ? (
                  <VolumeDownIcon size={26} color={"black"} />
                ) : (
                  <VolumeUpIcon size={26} color={"black"} />
                )
              ) : (
                ""
              )}
            </Pressable>
          </View>
        )}
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  main_container: {
    width,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  header_container: {
    position: "absolute",
    top: 60,
    zIndex: 100,
  },
  header_sub_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  left_icon_pressable: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 20,
  },
  header_date: {
    fontSize: 18,
    fontWeight: 700,
    color: theme.root_screen.content_without_picture.header_date,
    paddingRight: 42,
  },
  content_area_container: {
    gap: 10,
    paddingHorizontal: 16,
    borderRadius: 30,
    overflow: "hidden",
    padding: 30,
    marginBottom: 20,
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
  },
  tags_menu_container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 20,
  },
  tags_menu_sub_container: {
    width: "100%",
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0,
  },
  root_tags: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.root_screen.content_without_picture.root_tags,
  },
  menu_container: {
    display: "flex",
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
  },
  root_title: {
    fontSize: 30,
    fontWeight: "600",
    color: theme.root_screen.content_without_picture.root_title,
    letterSpacing: -1,
  },
  root_content_container: {
    maxHeight: 270,
  },
  root_content: {
    fontSize: 16,
    fontWeight: "400",
    color: theme.root_screen.content_without_picture.root_content,
  },
  seperator_line: {
    width: "100%",
    height: 1,
    backgroundColor: theme.root_screen.content_without_picture.seperator_line,
    marginVertical: 10,
  },
  track_container: {
    display: "flex",
    flexDirection: "row",
    gap: 14,
    justifyContent: "space-between",
    alignItems: "center",
  },
  sub_track_container: {
    display: "flex",
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
  },
  root_track_cover: {
    width: 50,
    height: 50,
  },
  root_track_name: {
    fontWeight: 600,
    fontSize: 14,
    color: theme.root_screen.content_without_picture.root_track_name,
    width: 200,
  },
  root_track_artist: {
    fontSize: 14,
    color: theme.root_screen.content_without_picture.root_track_artist,
  },
});

export default ContentWithoutPicture;
