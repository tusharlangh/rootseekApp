import { BlurView } from "expo-blur";
import { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { useColorMode } from "native-base";
import FuturaCyrillicBold from "../../assets/fonts/FuturaCyrillicBold.ttf";
import FuturaCyrillicMedium from "../../assets/fonts/FuturaCyrillicMedium.ttf";
import FuturaCyrillicLight from "../../assets/fonts/FuturaCyrillicLight.ttf";
import FuturaCyrillicBook from "../../assets/fonts/FuturaCyrillicBook.ttf";
import FuturaCyrillicDemi from "../../assets/fonts/FuturaCyrillicDemi.ttf";
import FuturaCyrillicHeavy from "../../assets/fonts/FuturaCyrillicHeavy.ttf";
import { useFonts } from "expo-font";

const TagsModal = ({ tags, handleTags }) => {
  let [fontsLoaded] = useFonts({
    FuturaCyrillicBold,
    FuturaCyrillicMedium,
    FuturaCyrillicLight,
    FuturaCyrillicBook,
    FuturaCyrillicDemi,
    FuturaCyrillicHeavy,
  });
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "black" : "white";
  const count = tags.split("#").length - 1;

  return (
    <View>
      <View
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <View
          style={{
            width: 40,
            height: 5,
            borderRadius: 10,
            backgroundColor: "rgb(192, 192, 192)",
            marginTop: -10,
          }}
        ></View>
      </View>

      <Text
        style={[
          styles.label,
          { color: textColor, fontFamily: "FuturaCyrillicDemi" },
        ]}
      >
        Enter tags:
      </Text>

      <BlurView
        style={[
          styles.inputContainer,
          {
            backgroundColor:
              colorMode === "light"
                ? "rgba(255,255,255,0.8)"
                : "rgba(0, 0, 0, 0.6)",
          },
        ]}
      >
        <TextInput
          style={{
            color: textColor,
            fontSize: 18,
            fontFamily: "FuturaCyrillicBook",
          }}
          placeholder="Please put '#' in front e.g. #rootseek..."
          placeholderTextColor={
            colorMode === "light"
              ? "rgba(0, 0, 0, 0.6)"
              : "rgba(255,255,255,0.6)"
          }
          multiline
          value={tags}
          onChangeText={(text) => {
            if (count <= 10 || text.length < tags.length) {
              handleTags(text);
            }
          }}
        />
      </BlurView>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 4,
          marginRight: 10,
          justifyContent: "flex-end",
        }}
      >
        <Text
          style={[styles.counter, { color: count <= 10 ? textColor : "red" }]}
        >
          {count}
        </Text>
        <Text
          style={[
            styles.counter,
            { color: textColor, fontFamily: "FuturaCyrillicBook" },
          ]}
        >
          /10
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    height: 2,
    width: 40,
    marginBottom: 20,
    borderRadius: 10,
  },
  label: {
    fontWeight: "500",
    fontSize: 18,
    marginLeft: 10,
  },
  inputContainer: {
    marginTop: 4,
    padding: 12,
    height: 120, // Reduced height to fit properly
    borderRadius: 10,
    overflow: "hidden",
  },
  counter: {
    fontSize: 16,
  },
});

export default TagsModal;
