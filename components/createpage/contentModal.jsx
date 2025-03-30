import { BlurView } from "expo-blur";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { useColorMode } from "native-base";

const ContentModal = ({ setContent, content }) => {
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            height: 2,
            width: 40,
            backgroundColor:
              colorMode === "light"
                ? "rgba(172, 172, 172, 0.9)"
                : "rgba(38, 43, 43, 0.1)",
            marginBottom: 20,
            borderRadius: 10,
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
          fontSize: 14,
          marginLeft: 10,
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
          style={{ color: textColor, fontSize: 16 }}
          placeholder="Talk about your memory. What makes it a memory?"
          placeholderTextColor={
            colorMode === "light"
              ? "rgba(0, 0, 0, 0.6)"
              : "rgba(255,255,255,0.6)"
          }
          multiline
          value={content}
          onChangeText={setContent}
        />
      </BlurView>
      <Text
        style={{
          color: textColor,
          textAlign: "right",
          marginRight: 10,
          marginTop: 4,
        }}
      >
        {countChar}/2000
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
