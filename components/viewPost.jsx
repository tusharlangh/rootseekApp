import { BlurView } from "expo-blur";
import { useColorMode } from "native-base";
import { useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Animated,
  Dimensions,
  PanResponder,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { height: MODAL_HEIGHT } = Dimensions.get("window");

const ViewPost = ({ post, setViewPostVisible, viewPostVisible }) => {
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "#0D0D0D" : "#8E8D93";
  const bgColor = colorMode === "light" ? "#ECEBEF" : "black";
  const __dirname =
    "file:///Users/tusharlanghnoda/Desktop/Projects/RootSeek/rootseek/server";

  const panY = useRef(new Animated.Value(MODAL_HEIGHT)).current;

  const ligherColorsForLightTheme = [
    "#8AA7B7", // Alice Blue (darker)
    "#B28A6A", // Antique White (darker)
    "#D1A57B", // Blanched Almond (darker)
    "#A4A4D1", // Lavender (darker)
    "#9F7FAE", // Thistle (darker)
    "#8AB9B5", // Light Cyan (darker)
    "#6D9F89", // Mint Green (darker)
    "#A69F7C", // Beige (darker)
    "#E4A97A", // Pastel Peach (darker)
    "#CDA74D", // Light Gold (darker)
    "#8BAF8A", // Pale Green (darker)
    "#9F8AC9", // Soft Lavender (darker)
    "#5E8CC8", // Baby Blue (darker)
    "#E0A3A1", // Misty Rose (darker)
    "#A4D3B9", // Soft Seafoam (darker)
    "#C5A6C2", // Light Lilac (darker)
    "#D2A75C", // Wheat (darker)
    "#E3B2B6", // Pale Rose (darker)
    "#D28396", // Light Magenta (darker)
    "#8DAFBF", // Powder Blue (darker)
  ];
  const darkerColorsForDarkTheme = [
    "#7F5B83", // Muted Purple
    "#D32F2F", // Dark Red
    "#1565C0", // Dark Blue
    "#388E3C", // Dark Green
    "#8E24AA", // Dark Magenta
    "#0288D1", // Deep Sky Blue
    "#8B4513", // Saddle Brown
    "#6A1B9A", // Deep Purple
    "#FF7043", // Burnt Orange
    "#FBC02D", // Deep Yellow
    "#388E3C", // Forest Green
    "#C2185B", // Dark Pink
    "#5D4037", // Cocoa Brown
    "#9E9D24", // Olive Green
    "#0288D1", // Royal Blue
    "#D32F2F", // Crimson Red
    "#1B5E20", // Dark Forest Green
    "#1976D2", // Medium Blue
    "#7B1FA2", // Dark Violet
    "#FF5722", // Deep Orange
  ];

  const randomColor = Math.floor(
    Math.random() * ligherColorsForLightTheme.length
  );

  useEffect(() => {
    if (viewPostVisible) {
      resetPositionAnim.start();
    }
  }, [viewPostVisible]);

  const resetPositionAnim = Animated.timing(panY, {
    toValue: 0,
    duration: 200,
    useNativeDriver: true,
  });

  const closeAnim = Animated.timing(panY, {
    toValue: -MODAL_HEIGHT,
    duration: 200,
    useNativeDriver: true,
  });

  const closeModal = () => {
    closeAnim.start(() => setViewPostVisible(false));
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy < 0) {
          panY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy < -200) {
          closeModal();
        } else {
          resetPositionAnim.start();
        }
      },
    })
  ).current;

  return (
    <Animated.View
      style={{
        backgroundColor: bgColor,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        transform: [{ translateY: panY }],
      }}
      {...panResponder.panHandlers}
    >
      <LinearGradient
        colors={
          colorMode === "light"
            ? [ligherColorsForLightTheme[randomColor], bgColor]
            : [darkerColorsForDarkTheme[randomColor], bgColor]
        }
        style={{
          height: "100%",
          width: "100%",
          position: "relative",
        }}
      >
        <Image
          source={{
            uri: __dirname + post.picture,
          }}
          style={{ height: "100%", width: "100%", objectFit: "cover" }}
        />
      </LinearGradient>

      <BlurView
        intensity={100}
        tint={colorMode === "light" ? "light" : "dark"}
        style={{
          maxHeight: "60%",
          gap: 10,
          paddingHorizontal: 20,
          borderRadius: 30,
          overflow: "hidden",
          padding: 30,
          marginTop: -50,
          minHeight: "35%",
        }}
      >
        <Text
          style={{
            fontSize: 38,
            fontWeight: "600",
            textAlign: "center",
            color:
              colorMode === "light"
                ? "rgba(0, 0, 0, 0.8)"
                : "rgba(245, 245, 245, 0.9)",
            letterSpacing: -1,
          }}
        >
          {post.title}
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              color:
                colorMode === "light"
                  ? "rgba(0, 0, 0, 0.9)"
                  : "rgba(245, 245, 245, 0.9)",
            }}
          >
            {post.content}
          </Text>
        </ScrollView>
        {post.trackId !== "undefined" && (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={{ fontWeight: 600, fontSize: 12, color: textColor }}>
                {post.trackName}
              </Text>
              <Text style={{ fontSize: 10, color: textColor }}>
                {post.trackArtist}
              </Text>
            </View>

            <Image
              source={{ uri: post.trackAlbumCover }}
              style={{
                width: 38,
                height: 38,
                borderRadius: 6,
                marginTop: 0,
              }}
            />
          </View>
        )}
      </BlurView>
    </Animated.View>
  );
};

export default ViewPost;
