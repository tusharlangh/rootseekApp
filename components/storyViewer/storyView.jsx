import { useRef, useState, useEffect } from "react";
import { View, Text, Pressable, Dimensions, Animated } from "react-native";
import { CloseIcon } from "../icons";
import { LinearGradient } from "expo-linear-gradient";
const { width, height } = Dimensions.get("window");

import MilestoneCard from "./milestoneCard";
import ProgressionCard from "./progressionCard";

const StoryView = ({ storiesData, setViewPostVisible }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const narrative = Object.values(storiesData);

  const handleTap = (direction) => {
    if (currentIndex === narrative.length - 1 && direction === "right") {
      return;
    }
    setCurrentIndex((prev) =>
      Math.max(
        0,
        Math.min(narrative.length, prev + (direction === "right" ? 1 : -1))
      )
    );
  };

  return (
    <LinearGradient
      colors={
        currentIndex === narrative.length - 1
          ? ["white", "white"]
          : narrative[currentIndex].linearGradient
      }
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
          width: "100%`",
        }}
        onPress={(e) => {
          const x = e.nativeEvent.locationX;
          if (x < width * 0.25) {
            handleTap("left");
          } else if (x > width - width * 0.25) {
            handleTap("right");
          }
        }}
      >
        <Pressable
          style={{ position: "absolute", top: 75, right: 10 }}
          onPress={() => setViewPostVisible(false)}
        >
          <CloseIcon size={30} color="black" />
        </Pressable>
        {currentIndex === narrative.length - 1 ? (
          <ProgressionCard currentIndex={currentIndex} narrative={narrative} />
        ) : (
          <MilestoneCard currentIndex={currentIndex} narrative={narrative} />
        )}
      </Pressable>
    </LinearGradient>
  );
};

export default StoryView;
