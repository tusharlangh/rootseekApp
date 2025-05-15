import { BlurView } from "expo-blur";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { useColorMode } from "native-base";
import FuturaCyrillicBold from "../../assets/fonts/FuturaCyrillicBold.ttf";
import FuturaCyrillicMedium from "../../assets/fonts/FuturaCyrillicMedium.ttf";
import FuturaCyrillicLight from "../../assets/fonts/FuturaCyrillicLight.ttf";
import FuturaCyrillicBook from "../../assets/fonts/FuturaCyrillicBook.ttf";
import FuturaCyrillicDemi from "../../assets/fonts/FuturaCyrillicDemi.ttf";
import FuturaCyrillicHeavy from "../../assets/fonts/FuturaCyrillicHeavy.ttf";
import { useFonts } from "expo-font";

const ContentModal = ({ setContent, content }) => {
  let [fontsLoaded] = useFonts({
    FuturaCyrillicBold,
    FuturaCyrillicMedium,
    FuturaCyrillicLight,
    FuturaCyrillicBook,
    FuturaCyrillicDemi,
    FuturaCyrillicHeavy,
  }); 
  const [countChar, setCountChar] = useState(content.length);
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "black" : "white";

  useEffect(() => {
    setCountChar(content.length);
  });

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
        style={{
          color:
            colorMode === "light"
              ? "rgba(0, 0, 0, 0.9)"
              : "rgba(245, 245, 245, 0.9)",
          fontWeight: 500,
          fontSize: 18,
          marginLeft: 10,
          fontFamily: "FuturaCyrillicDemi",
        }}
      >
        Post content:
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
          placeholder="Talk about your memory. What makes it a memory?"
          placeholderTextColor={
            colorMode === "light"
              ? "rgba(0, 0, 0, 0.6)"
              : "rgba(255,255,255,0.6)"
          }
          multiline
          value={content}
          onChangeText={(text) => {
            if (countChar < 1000 || text.length < content.length) {
              setContent(text);
            }
          }}
        />
      </BlurView>
      <Text
        style={{
          fontSize: 16,
          color: textColor,
          textAlign: "right",
          marginRight: 10,
          marginTop: 4,
          fontFamily: "FuturaCyrillicBook",
        }}
      >
        {countChar}/1000
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: 600,
    color: "white",
    textAlign: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: 500,
    color: "rgba(255,255,255,0.8)",
    marginTop: 20,
    marginLeft: 10,
  },
  inputContainer: {
    marginTop: 4,
    padding: 12,
    height: 300,
    borderRadius: 10,

    overflow: "hidden",
  },
});

export default ContentModal;
