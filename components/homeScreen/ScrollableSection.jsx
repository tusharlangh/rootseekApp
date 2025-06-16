import { ScrollView, View, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";

const { width } = Dimensions.get("window");

const ScrollableSection = ({ children, gap = 10 }) => {
  const [layoutHeight, setLayoutHeight] = useState(0);

  const gradientColors = [
    "rgba(18,18,18,0)",
    "rgba(18,18,18,0)",
    "rgba(18,18,18,0)",
    "rgba(18,18,18,0)",
    "rgba(18,18,18,0)",
    "rgba(18,18,18,0)",
    "rgba(18,18,18,0)",
    "rgba(18,18,18,0)",
    "rgba(18,18,18,0)",
    "rgba(18,18,18,0.6)",
  ];

  return (
    <View style={stylesheet.container}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        pointerEvents="none"
        style={{
          width,
          height: layoutHeight,
          position: "absolute",
          zIndex: 1000,
        }}
        colors={gradientColors}
      />
      <ScrollView
        onLayout={(event) => {
          setLayoutHeight(event.nativeEvent.layout.height);
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: gap, paddingHorizontal: 20 }}
      >
        {children}
      </ScrollView>
    </View>
  );
};

const stylesheet = StyleSheet.create({
  container: {
    marginTop: 12,
    marginBottom: 38,
  },
});

export default ScrollableSection;
