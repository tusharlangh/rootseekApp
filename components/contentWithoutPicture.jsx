import { BlurView } from "expo-blur";
import { useColorMode } from "native-base";
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  LeftArrowIcon,
  VolumeUpIcon,
  VolumeDownIcon,
  ShareIcon,
  ThreeDotsIcon,
  AddLibraryIcon,
  CheckmarkIcon,
} from "./icons";
import FuturaCyrillicBold from "../assets/fonts/FuturaCyrillicBold.ttf";
import FuturaCyrillicMedium from "../assets/fonts/FuturaCyrillicMedium.ttf";
import FuturaCyrillicLight from "../assets/fonts/FuturaCyrillicLight.ttf";
import FuturaCyrillicBook from "../assets/fonts/FuturaCyrillicBook.ttf";
import FuturaCyrillicDemi from "../assets/fonts/FuturaCyrillicDemi.ttf";
import FuturaCyrillicHeavy from "../assets/fonts/FuturaCyrillicHeavy.ttf";
import HelveticaNowDisplayRegular from "../assets/fonts/HelveticaNowDisplay-Regular.ttf";
import HelveticaNowDisplayBold from "../assets/fonts/HelveticaNowDisplay-Bold.ttf";
import HelveticaNowDisplayMedium from "../assets/fonts/HelveticaNowDisplay-Medium.ttf";
import HelveticaNowDisplayExtraBold from "../assets/fonts/HelveticaNowDisplay-ExtraBold.ttf";
import { useFonts } from "expo-font";

const { width, height } = Dimensions.get("window");

const ContentWithoutPicture = ({
  item,
  toggleMute,
  mute,
  stopPreviousSound,
  setIsAddToLibraryModal,
  setSelectedPost,
  setViewPostVisible,
}) => {
  let [fontsLoaded] = useFonts({
    FuturaCyrillicBold,
    FuturaCyrillicMedium,
    FuturaCyrillicLight,
    FuturaCyrillicBook,
    FuturaCyrillicDemi,
    FuturaCyrillicHeavy,
    HelveticaNowDisplayRegular,
    HelveticaNowDisplayBold,
    HelveticaNowDisplayMedium,
    HelveticaNowDisplayExtraBold,
  });
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
    <View
      style={{
        backgroundColor: bgColor,
        width,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 70,
          zIndex: 100,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Pressable
            style={[
              {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: 20,
              },
            ]}
            onPress={() => {
              stopPreviousSound();
              setViewPostVisible(false);
            }}
          >
            <LeftArrowIcon
              size={28}
              color={colorMode === "light" ? "black" : "white"}
            />
          </Pressable>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: colorMode === "light" ? "black" : "white",
              paddingRight: 42,
              fontFamily: "HelveticaNowDisplayExtraBold",
            }}
          >
            {FormatTime(item)}
          </Text>
          <Text></Text>
        </View>
      </View>
      <LinearGradient
        colors={[
          colorMode === "light"
            ? item.linearGradient.light
            : item.linearGradient.dark,
          bgColor,
          bgColor,
        ]}
        style={{
          height,
          width,
          position: "relative",
        }}
      ></LinearGradient>

      <BlurView
        intensity={0}
        tint={colorMode === "light" ? "light" : "dark"}
        style={{
          gap: 10,
          paddingHorizontal: 20,
          borderRadius: 30,
          overflow: "hidden",
          padding: 30,
          marginBottom: 30,
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 20,
          }}
        >
          <View
            style={[
              {
                width: "100%",
                justifyContent: "space-between",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 14,
              },
            ]}
          >
            <Text
              numberOfLines={1}
              style={{
                fontFamily: "HelveticaNowDisplayBold",
                fontSize: 18,
                fontWeight: "600",
                color:
                  colorMode === "light" ? "black" : "rgba(255,255,255,0.8)",
              }}
            >
              {item.hashTags}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 14,
                alignItems: "center",
              }}
            >
              <Pressable
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  setIsAddToLibraryModal(true);
                  setSelectedPost(item);
                }}
              >
                {!item.albumId ? (
                  <AddLibraryIcon
                    size={28}
                    color={
                      colorMode === "light" ? "black" : "rgba(255,255,255,0.8)"
                    }
                  />
                ) : (
                  <CheckmarkIcon
                    size={28}
                    color={
                      colorMode === "light" ? "black" : "rgba(255,255,255,0.8)"
                    }
                  />
                )}
              </Pressable>
              <Pressable style={[{}]}>
                <ThreeDotsIcon
                  size={28}
                  color={
                    colorMode === "light" ? "black" : "rgba(255,255,255,0.8)"
                  }
                />
              </Pressable>
            </View>
          </View>
        </View>
        <Text
          style={{
            fontSize: 38,
            fontWeight: "600",
            color:
              colorMode === "light"
                ? "rgba(0, 0, 0, 0.8)"
                : "rgba(245, 245, 245, 0.9)",
            letterSpacing: -1,
            fontFamily: "HelveticaNowDisplayBold",
          }}
        >
          {item.title}
        </Text>
        <View style={{ maxHeight: 300 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text
              style={{
                fontFamily: "HelveticaNowDisplayMedium",
                fontSize: 17,
                fontWeight: "400",
                color:
                  colorMode === "light"
                    ? "rgba(0, 0, 0, 0.9)"
                    : "rgba(245, 245, 245, 0.9)",
              }}
            >
              {item.content}
            </Text>
          </ScrollView>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 30,
            alignItems: "center",
            justifyContent: "flex-end",
            marginTop: 0,
            marginBottom: 10,
          }}
        ></View>
        {item.trackId !== "undefined" && (
          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: colorMode === "light" ? "#D4D5DA" : "#282828",
              marginBottom: 10,
            }}
          ></View>
        )}

        {item.trackId !== "undefined" && (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 14,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 14,
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: item.trackAlbumCover }}
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 6,
                }}
              />
              <View>
                <Text
                  style={{
                    fontWeight: 600,
                    fontSize: 18,
                    color: colorMode === "light" ? "black" : "white",
                    width: 200,
                  }}
                  numberOfLines={1}
                >
                  {item.trackName}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: colorMode === "light" ? "black" : "white",
                  }}
                >
                  {item.trackArtist}
                </Text>
              </View>
            </View>

            <Pressable onPress={toggleMute}>
              {item.trackId !== "undefined" ? (
                mute ? (
                  <VolumeDownIcon
                    size={28}
                    color={
                      colorMode === "light" ? "black" : "rgba(255,255,255,0.8)"
                    }
                  />
                ) : (
                  <VolumeUpIcon
                    size={28}
                    color={
                      colorMode === "light" ? "black" : "rgba(255,255,255,0.8)"
                    }
                  />
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

export default ContentWithoutPicture;
