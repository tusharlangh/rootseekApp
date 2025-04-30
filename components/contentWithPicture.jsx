import { BlurView } from "expo-blur";
import { useColorMode } from "native-base";
import { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  Pressable,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList } from "react-native";
import {
  LeftArrowIcon,
  VolumeUpIcon,
  VolumeDownIcon,
  ShareIcon,
  ThreeDotsIcon,
  AddLibraryIcon,
  CheckmarkIcon,
} from "./icons";
import axios from "axios";
import { Audio } from "expo-av";
import { PostsContext } from "./search";
import BottomPage from "./bottom-page";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DefualtCover } from "../additional";
import { RefreshValue } from "./navbar";

const { width, height } = Dimensions.get("window");

const ContentWithPicture = ({
  item,
  toggleMute,
  translateYInterpolate,
  opacityInterpolate,
  showMoreContent,
  mute,
  stopPreviousSound,
  toggleContent,
  setIsAddToLibraryModal,
  setSelectedPost,
  setViewPostVisible,
  setContentHeight,
}) => {
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "#0D0D0D" : "#8E8D93";
  const bgColor = "black";
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
    "rgba(0,0,0,0)",
    "rgba(0,0,0,0.5)",
    "rgba(0,0,0,0.6)",
    "rgba(0,0,0,0.7)",
    "rgba(0,0,0,0.8)",
    "rgba(0, 0, 0, 0.9)",
  ];

  const CARD_WIDTH = width * 1;
  const CARD_HEIGHT = (CARD_WIDTH * 5) / 4;

  return (
    <View
      style={{
        backgroundColor: bgColor,
        width,

        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <LinearGradient
        colors={[item.picture ? bgColor : item.gradientColor, bgColor, bgColor]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
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
          <View
            style={{
              borderRadius: 20,
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 20,
              paddingVertical: 4,
            }}
          >
            <Pressable
              onPress={() => {
                stopPreviousSound();
                setViewPostVisible(false);
              }}
            >
              <LeftArrowIcon
                size={24}
                color={colorMode === "light" ? "black" : "white"}
              />
            </Pressable>
          </View>

          <Text
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: colorMode === "light" ? "black" : "white",
              marginRight: 42,
              padding: 4,
              borderRadius: 10,
              paddingHorizontal: 6,
            }}
          >
            {FormatTime(item)}
          </Text>

          <Text></Text>
        </View>
      </View>

      <BlurView
        intensity={item.picture ? 3 : 0}
        tint={colorMode === "light" ? "light" : "dark"}
        style={{
          height,
          width,
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <LinearGradient
          colors={contentAreaGradient} // start clear, fade to visible
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFill}
        />

        <View
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              gap: 10,
              overflow: "hidden",
              height,
            }}
          >
            <View style={{ position: "relative" }}>
              <Pressable
                style={{ position: "relative" }}
                onPress={toggleContent}
              >
                <Image
                  source={{
                    uri: __dirname + item.picture,
                  }}
                  style={{
                    height: CARD_HEIGHT,
                    width: CARD_WIDTH,
                    objectFit: "cover",
                    alignSelf: "center",
                    aspectRatio: 4 / 5,
                    marginTop: 150,
                  }}
                />
              </Pressable>
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: 8,
                }}
              >
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
                        gap: 10,
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={{ uri: item.trackAlbumCover }}
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 6,
                        }}
                      />
                      <View>
                        <Text
                          style={{
                            fontWeight: 600,
                            fontSize: 12,
                            color: "white",
                            width: 200,
                            shadowColor: "black",
                            shadowOffset: { width: 6, height: 4 },
                            shadowOpacity: 0.3,
                            shadowRadius: 10,
                            elevation: 6,
                          }}
                          numberOfLines={1}
                        >
                          {item.trackName}
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            color: "white",
                            shadowColor: "black",
                            shadowOffset: { width: 6, height: 4 },
                            shadowOpacity: 0.3,
                            shadowRadius: 10,
                            elevation: 6,
                          }}
                        >
                          {item.trackArtist}
                        </Text>
                      </View>
                    </View>
                    <BlurView
                      style={{
                        backgroundColor: "rgba(0,0,0,0.6)",
                        padding: 8,
                        borderRadius: 30,
                        overflow: "hidden",
                      }}
                    >
                      <Pressable onPress={toggleMute}>
                        {item.trackId !== "undefined" ? (
                          mute ? (
                            <VolumeDownIcon size={18} color="white" />
                          ) : (
                            <VolumeUpIcon size={18} color="white" />
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
              style={{ transform: [{ translateY: translateYInterpolate }] }}
            >
              <LinearGradient
                colors={contentAreaGradient}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={{ paddingHorizontal: 10 }}
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
                        fontSize: 18,
                        fontWeight: "600",
                        color:
                          colorMode === "light"
                            ? "black"
                            : "rgba(255,255,255,1)",
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
                          <AddLibraryIcon size={28} color="white" />
                        ) : (
                          <CheckmarkIcon size={28} color="white" />
                        )}
                      </Pressable>
                      <Pressable style={[{}]}>
                        <ThreeDotsIcon
                          size={28}
                          color={
                            colorMode === "light"
                              ? "black"
                              : "rgba(255,255,255,0.8)"
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
                    color: "white",
                    letterSpacing: -1,
                  }}
                  numberOfLines={1}
                >
                  {item.title}
                </Text>
                <View style={{ height: 300, marginTop: 4 }}>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={showMoreContent}
                  >
                    <Animated.Text
                      style={{
                        fontSize: 16,
                        fontWeight: "400",
                        color: "white",
                        opacity: opacityInterpolate,
                      }}
                      onLayout={(e) =>
                        setContentHeight(e.nativeEvent.layout.height)
                      }
                    >
                      {item.content}
                    </Animated.Text>
                  </ScrollView>
                </View>
              </LinearGradient>
            </Animated.View>
          </View>
        </View>
      </BlurView>
    </View>
  );
};

export default ContentWithPicture;
