import { useRef, useState, useEffect } from "react";
import { View, Text, Pressable, Dimensions } from "react-native";
import { CloseIcon, LeftArrowIcon } from "./icons";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const StoryViewer = ({ storiesData, setViewPostVisible }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeRef = useRef(null);
  const stories = Object.entries(storiesData);
  const narrative = Object.values(storiesData.narrative);
  const linearColors = Object.values(storiesData.linearGradient);

  useEffect(() => {
    startTimer();
    return () => clearTimeout(timeRef.current);
  }, [currentIndex]);

  const startTimer = () => {
    clearTimeout(timeRef.current);
    timeRef.current = setTimeout(() => {
      if (currentIndex <= narrative.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      }
    }, 7000);
  };

  const handleTap = (direction) => {
    clearTimeout(timeRef.current);
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
          handleTap(x < width / 2 ? "left" : "right");
        }}
      >
        <Pressable
          style={{ position: "absolute", top: 60, right: 10 }}
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
          <Text style={{ fontSize: 24, fontWeight: 600, textAlign: "center" }}>
            {narrative[currentIndex]}
          </Text>
        </View>
      </Pressable>
    </LinearGradient>
  );
};

export default StoryViewer;
