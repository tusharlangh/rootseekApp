import { BlurView } from "expo-blur";
import { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { useColorMode } from "native-base";

const TagsModal = ({ tags, handleTags }) => {
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "black" : "white";
  const count = tags.split("#").length - 1;

  return (
    <View>
      <View style={styles.center}>
        <View
          style={[
            styles.line,
            {
              backgroundColor:
                colorMode === "light"
                  ? "rgba(172, 172, 172, 0.9)"
                  : "rgba(38, 43, 43, 0.1)",
            },
          ]}
        />
      </View>

      <Text style={[styles.label, { color: textColor }]}>Enter tags:</Text>

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
        <Text style={[styles.counter, { color: textColor }]}>/10</Text>
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
    fontSize: 14,
    marginLeft: 10,
  },
  inputContainer: {
    marginTop: 4,
    padding: 12,
    height: 120, // Reduced height to fit properly
    borderRadius: 10,
    overflow: "hidden",
  },
  counter: {},
});

export default TagsModal;
