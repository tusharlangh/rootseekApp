import { useRef, useState, useEffect } from "react";
import { View, Text, Pressable, Dimensions, Animated } from "react-native";
import { CloseIcon, LeftArrowIcon } from "./icons";
import { LinearGradient } from "expo-linear-gradient";
import FuturaCyrillicBold from "../assets/fonts/FuturaCyrillicBold.ttf";
import FuturaCyrillicMedium from "../assets/fonts/FuturaCyrillicMedium.ttf";
import FuturaCyrillicLight from "../assets/fonts/FuturaCyrillicLight.ttf";
import FuturaCyrillicBook from "../assets/fonts/FuturaCyrillicBook.ttf";
import FuturaCyrillicDemi from "../assets/fonts/FuturaCyrillicDemi.ttf";
import HelveticaNowDisplayRegular from "../assets/fonts/HelveticaNowDisplay-Regular.ttf";
import HelveticaNowDisplayBold from "../assets/fonts/HelveticaNowDisplay-Bold.ttf";
import HelveticaNowDisplayMedium from "../assets/fonts/HelveticaNowDisplay-Medium.ttf";
import HelveticaNowDisplayExtraBold from "../assets/fonts/HelveticaNowDisplay-ExtraBold.ttf";
import { useFonts } from "expo-font";

const { width, height } = Dimensions.get("window");

const StoryViewer = ({ storiesData, setViewPostVisible }) => {
  let [fontsLoaded] = useFonts({
    FuturaCyrillicBold,
    FuturaCyrillicMedium,
    FuturaCyrillicLight,
    FuturaCyrillicBook,
    FuturaCyrillicDemi,
    HelveticaNowDisplayRegular,
    HelveticaNowDisplayBold,
    HelveticaNowDisplayMedium,
    HelveticaNowDisplayExtraBold,
  });

  const [paused, setPaused] = useState(false);
  const animationRef = useRef(null);
  const animationStartTime = useRef(null);
  const remainingTime = useRef(7000);

  const [currentIndex, setCurrentIndex] = useState(0);
  const timeRef = useRef(null);
  const stories = Object.entries(storiesData);
  const narrative = Object.values(storiesData.narrative);
  const linearColors = Object.values(storiesData.linearGradient);
  const pauseRef = useRef(false);

  const progressBar = useRef(
    narrative.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    if (paused) return;
    startProgressAnimation();
    startTimer();
    return () => clearTimeout(timeRef.current);
  }, [currentIndex, paused]);

  const startProgressAnimation = () => {
    if (!paused && currentIndex < narrative.length) {
      animationRef.current = Animated.timing(progressBar[currentIndex], {
        toValue: 1,
        duration: remainingTime.current,
        useNativeDriver: false,
      });
      animationRef.current.start();
    }
  };

  const startTimer = () => {
    if (!paused) {
      clearTimeout(timeRef.current);
      animationStartTime.current = Date.now();
      timeRef.current = setTimeout(() => {
        if (currentIndex < narrative.length - 1) {
          setCurrentIndex((prev) => prev + 1);
          remainingTime.current = 7000;
        } else {
          setViewPostVisible(false);
        }
      }, remainingTime.current);
    }
  };

  const handleTap = (direction) => {
    setPaused(false);
    if (animationRef.current) {
      animationRef.current.stop();
    }
    progressBar[currentIndex].stopAnimation();

    clearTimeout(timeRef.current);
    remainingTime.current = 7000;

    if (direction === "right") {
      progressBar[currentIndex].setValue(1);
    } else {
      progressBar[currentIndex].setValue(0);
      progressBar[currentIndex - 1].setValue(0);
    }

    if (direction === "right" && currentIndex === narrative.length - 1) {
      setViewPostVisible(false);
    }

    setCurrentIndex((prev) =>
      Math.max(
        0,
        Math.min(narrative.length - 1, prev + (direction === "right" ? 1 : -1))
      )
    );
  };

  return (
    <LinearGradient
      colors={linearColors[currentIndex]}
      style={{
        flex: 1,
        height: "100%",
        width: "100%",
        paddingTop: 0,
      }}
    >
      <Pressable
        style={{
          flex: 1,
          height: "100%",
          width: "100%",
        }}
        onPress={(e) => {
          const x = e.nativeEvent.locationX;

          if (x < width * 0.25) {
            handleTap("left");
          } else if (x > width - width * 0.25) {
            handleTap("right");
          }
        }}
        onPressIn={(e) => {
          const x = e.nativeEvent.locationX;
          const minX = width * 0.25;
          const maxX = width - width * 0.25;
          if (x >= minX && x <= maxX) {
            setPaused(true);
            if (animationRef.current) animationRef.current.stop();
            progressBar[currentIndex].stopAnimation();
            const elapsed = Date.now() - animationStartTime.current;
            remainingTime.current -= elapsed;
            clearTimeout(timeRef.current);
          }
        }}
        onPressOut={(e) => {
          const x = e.nativeEvent.locationX;
          const minX = width * 0.25;
          const maxX = width - width * 0.25;
          if (x >= minX && x <= maxX) {
            setPaused(false);
            startProgressAnimation();
            startTimer();
          }
        }}
      >
        <View
          style={{
            position: "absolute",
            top: 55,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "row",
            gap: 4,
            padding: 10,
          }}
        >
          {progressBar.map((bar, index) => {
            const animatedWidth = bar.interpolate({
              inputRange: [0, 1],
              outputRange: ["0%", "100%"], // in percent, ideally use '100%' for smoother width
              extrapolate: "clamp",
            });
            return (
              <View
                key={index}
                style={{
                  flex: 1,
                  height: 2,
                  backgroundColor: "rgba(255,255,255,0.3)",
                  overflow: "hidden",
                  borderRadius: 2,
                  width: "100%",
                }}
              >
                <Animated.View
                  style={{
                    height: 2,
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    width: animatedWidth,
                  }}
                />
              </View>
            );
          })}
        </View>

        <Pressable
          style={{ position: "absolute", top: 75, right: 10 }}
          onPress={() => setViewPostVisible(false)}
        >
          <CloseIcon size={30} color="black" />
        </Pressable>
        <View
          style={{
            width: 300,
            marginHorizontal: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            height: "100%",
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 600,
                textAlign: "center",
                color: "rgb(0,0,0)",
                fontFamily: "HelveticaNowDisplayBold",
              }}
            >
              {narrative[currentIndex]}
            </Text>
          </View>
        </View>
      </Pressable>
    </LinearGradient>
  );
};

export default StoryViewer;
