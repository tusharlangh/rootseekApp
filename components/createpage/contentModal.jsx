import { BlurView } from "expo-blur";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

const ContentModal = ({ setContent, content }) => {
  const [countChar, setCountChar] = useState(content.length);

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
            backgroundColor: "rgb(91, 90, 90)",
            marginBottom: 20,
            borderRadius: 10,
          }}
        ></View>
      </View>
      <Text
        style={{
          color: "rgba(255,255,255,0.6)",
          fontWeight: 500,
          fontSize: 14,
          marginLeft: 10,
        }}
      >
        Post content:
      </Text>

      <BlurView intensity={60} tint="light" style={styles.inputContainer}>
        <TextInput
          style={{ color: "white", fontSize: 16 }}
          placeholder="Talk about your memory. What makes it a memory?"
          placeholderTextColor="rgba(255,255,255,0.6)"
          multiline
          value={content}
          onChangeText={setContent}
        />
      </BlurView>
      <Text
        style={{
          color: "rgba(255,255,255,0.7)",
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
