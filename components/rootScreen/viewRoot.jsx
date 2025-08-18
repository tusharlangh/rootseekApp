import { useColorMode } from "native-base";
import { useContext, useEffect, useRef, useState } from "react";
import { View, Dimensions, Animated } from "react-native";
import { FlatList } from "react-native";
import axios from "axios";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RefreshValue } from "../navbar";
import ContentWithoutPicture from "./contentWithoutPicture";
import ContentWithPicture from "./contentWithPicture";
import { PhoneContext } from "../../App";

const { width, height } = Dimensions.get("window");

const ViewRoot = ({
  currentIndex,
  setViewPostVisible,
  viewPostVisible,
  posts,
}) => {
  const { usePhone } = useContext(PhoneContext);

  const address = usePhone ? "192.168.1.80:5002" : "localhost:5002";

  const __dirname =
    "file:///Users/tusharlanghnoda/Desktop/Projects/RootSeek/rootseek/server";

  const [currIndex, setCurrIndex] = useState(currentIndex);
  const [song, setSong] = useState(null);

  const [mute, setMute] = useState(false);
  const [sound, setSound] = useState(null);

  const [checkedMarked, setCheckedMarked] = useState(posts[currIndex].albumId);
  const [selectedPost, setSelectedPost] = useState(null);

  const { refreshValue, setRefreshValue } = useContext(RefreshValue);

  const [showMoreContent, setShowMoreContent] = useState(false);
  const animatedController = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(0);

  const toggleContent = () => {
    Animated.spring(animatedController, {
      toValue: showMoreContent ? 0 : 1,
      friction: 8,
      tension: 40,
    }).start(() => {
      setShowMoreContent(!showMoreContent);
    });
  };

  const translateYInterpolate = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -200],
  });

  const opacityInterpolate = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1],
  });

  useEffect(() => {
    if (posts[currIndex]) {
      setCheckedMarked(posts[currIndex].albumId);
    }
  }, [currIndex]);

  useEffect(() => {
    const fetchSong = async () => {
      if (posts[currIndex].trackId === "undefined") {
        stopPreviousSound();
      }
      if (mute) {
        setMute(!mute);
      }
      try {
        const response = await axios.get(
          `http://${address}/single-deezer/deezer-search-song?trackId=${posts[currIndex].trackId}`
        );
        setSong(response.data);
      } catch (error) {
        console.error("Error searching music:", error);
      }
    };
    fetchSong();
  }, [currIndex]);

  const stopPreviousSound = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
    }
  };

  const playSound = async () => {
    if (!song) return;

    try {
      await stopPreviousSound();
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: song },
        { shouldPlay: true }
      );
      await newSound.setIsLoopingAsync(true);
      setSound(newSound);

      await newSound.playAsync();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  const toggleMute = async () => {
    if (sound) {
      const newMuted = !mute;
      setMute(newMuted);
      await sound.setIsMutedAsync(newMuted);
    }
  };

  {
    /*
    useEffect(() => {
    if (song) {
      playSound();
    }
  }, [song]);
  */
  }

  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 90 };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      if (index !== currIndex) {
        setCurrIndex(index);
        setRefreshValue((prev) => prev + 1);
      }
    }
  }).current;

  return (
    <View>
      <FlatList
        initialScrollIndex={currentIndex}
        data={posts}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        decelerationRate="fast"
        snapToInterval={width}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        renderItem={({ item }) =>
          !item.picture ? (
            <ContentWithoutPicture
              item={item}
              toggleMute={toggleMute}
              mute={mute}
              stopPreviousSound={stopPreviousSound}
              setSelectedPost={setSelectedPost}
              setViewPostVisible={setViewPostVisible}
            />
          ) : (
            <ContentWithPicture
              item={item}
              toggleMute={toggleMute}
              translateYInterpolate={translateYInterpolate}
              opacityInterpolate={opacityInterpolate}
              showMoreContent={showMoreContent}
              mute={mute}
              stopPreviousSound={stopPreviousSound}
              toggleContent={toggleContent}
              setSelectedPost={setSelectedPost}
              setViewPostVisible={setViewPostVisible}
              setContentHeight={setContentHeight}
            />
          )
        }
      />
    </View>
  );
};

export default ViewRoot;
