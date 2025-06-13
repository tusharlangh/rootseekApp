import { BlurView } from "expo-blur";
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  Pressable,
  StyleSheet,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  LeftArrowIcon,
  VolumeUpIcon,
  VolumeDownIcon,
  ThreeDotsIcon,
} from "../icons";

import { theme } from "../../theme";

const { width, height } = Dimensions.get("window");
const CARD_WIDTH = width * 1;
const CARD_HEIGHT = (CARD_WIDTH * 5) / 4;

const ContentWithPicture = ({
  item,
  toggleMute,
  translateYInterpolate,
  opacityInterpolate,
  showMoreContent,
  mute,
  stopPreviousSound,
  toggleContent,
  setSelectedPost,
  setViewPostVisible,
  setContentHeight,
}) => {
  const __dirname =
    "file:///Users/tusharlanghnoda/Desktop/Projects/RootSeek/rootseek/server";

  const FormatTime = (post) => {
    const formattedTime = new Date(post.date).toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
    return formattedTime;
  };

  const contentAreaGradient = [
    "rgba(18,18,18,0)",
    "rgba(18,18,18,0.5)",
    "rgba(18,18,18,0.9)",
    "rgba(18,18,18,0.9)",
    "rgba(18,18,18,0.9)",
    "rgba(18,18,18, 1)",
  ];

  return (
    <Animated.View style={styles.main_container}>
      <View style={styles.header_container}>
        <View style={styles.header_sub_container}>
          <View style={styles.left_icon_pressable}>
            <Pressable
              onPress={() => {
                stopPreviousSound();
                setViewPostVisible(false);
              }}
            >
              <LeftArrowIcon
                size={24}
                color={theme.constants.default_icon_color}
              />
            </Pressable>
          </View>

          <Text style={styles.header_date}>{FormatTime(item)}</Text>

          <Text></Text>
        </View>
      </View>
      <BlurView
        intensity={3}
        tint={"light"}
        style={styles.content_area_container}
      >
        <View style={styles.sub_content_area_container}>
          <View
            style={{
              gap: 10,
              overflow: "hidden",
              height,
            }}
          >
            <View>
              <Pressable
                style={{ position: "relative" }}
                onPress={() => {
                  toggleContent();
                }}
              >
                <Image
                  source={{
                    uri: __dirname + item.picture,
                  }}
                  style={styles.root_picture}
                />
              </Pressable>
              <View style={styles.track_container}>
                {item.trackId !== "undefined" && (
                  <View style={styles.sub_track_container}>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 10,
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={{ uri: item.trackAlbumCover }}
                        style={styles.root_track_cover}
                      />
                      <View>
                        <Text style={styles.root_track_name}>
                          {item.trackName}
                        </Text>
                        <Text style={styles.root_track_artist}>
                          {item.trackArtist}
                        </Text>
                      </View>
                    </View>
                    <BlurView style={styles.volume_icon_container}>
                      <Pressable onPress={toggleMute}>
                        {item.trackId !== "undefined" ? (
                          mute ? (
                            <VolumeDownIcon
                              size={18}
                              color={theme.constants.default_icon_color}
                            />
                          ) : (
                            <VolumeUpIcon
                              size={18}
                              color={theme.constants.default_icon_color}
                            />
                          )
                        ) : (
                          ""
                        )}
                      </Pressable>
                    </BlurView>
                  </View>
                )}
              </View>
            </View>

            <Animated.View
              style={{
                transform: [{ translateY: translateYInterpolate }],
              }}
            >
              <LinearGradient
                colors={contentAreaGradient}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={{ paddingHorizontal: 10 }}
              >
                <View style={styles.tags_menu_container}>
                  <View style={styles.tags_menu_sub_container}>
                    <Text style={styles.root_tags}>{item.hashTags}</Text>

                    <View style={styles.menu_container}>
                      <Pressable>
                        <ThreeDotsIcon
                          size={28}
                          color={theme.constants.default_icon_color}
                        />
                      </Pressable>
                    </View>
                  </View>
                </View>
                <Text style={styles.root_title}>{item.title}</Text>
                <View style={styles.root_content_container}>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={showMoreContent}
                  >
                    <Text
                      style={styles.root_content}
                      onLayout={(e) =>
                        setContentHeight(e.nativeEvent.layout.height)
                      }
                    >
                      {item.content}
                    </Text>
                  </ScrollView>
                </View>
              </LinearGradient>
            </Animated.View>
          </View>
        </View>
      </BlurView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  main_container: {
    backgroundColor: theme.main_background,
    width,
    display: "flex",
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
    color: theme.root_screen.content_with_picture.header_date,
    paddingRight: 42,
  },
  content_area_container: {
    height,
    width,
    display: "flex",
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
  },
  sub_content_area_container: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
  },
  root_picture: {
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    objectFit: "cover",
    alignSelf: "center",
    aspectRatio: 4 / 5,
    marginTop: 150,
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
  },
  root_tags: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.root_screen.content_with_picture.root_tags,
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
    color: theme.constants.root_title,
    letterSpacing: -1,
  },
  root_content_container: {
    height: 400,
    marginTop: 4,
  },
  root_content: {
    fontSize: 16,
    fontWeight: "400",
    color: theme.constants.root_content,
  },
  track_container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
  },
  sub_track_container: {
    display: "flex",
    flexDirection: "row",
    gap: 14,
    justifyContent: "space-between",
    alignItems: "center",
  },
  root_track_cover: {
    width: 30,
    height: 30,
  },
  root_track_name: {
    fontWeight: 600,
    fontSize: 14,
    width: 200,
    color: theme.constants.root_track,
    shadowColor: theme.root_screen.content_with_picture.root_track_shadow,
    shadowOffset: { width: 6, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  root_track_artist: {
    fontSize: 14,
    color: theme.constants.root_track,
    shadowColor: theme.root_screen.content_with_picture.root_track_shadow,
    shadowOffset: { width: 6, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  volume_icon_container: {
    backgroundColor:
      theme.root_screen.content_with_picture.volume_icon_container,
    padding: 8,
    borderRadius: 30,
    overflow: "hidden",
  },
});

export default ContentWithPicture;
