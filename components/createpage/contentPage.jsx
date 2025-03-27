import {
  TextInput,
  View,
  Text,
  Pressable,
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useColorMode } from "native-base";
import { Hashtag, Music, PictureIcon, RightArrow, SmileIcon } from "../icons";
import { useEffect, useRef, useState } from "react";
import pickImage from "./ImagePicker";
import MusicTimeline from "./musicTimeline";

const { height } = Dimensions.get("window");

const ContentPage = ({
  title,
  setTitle,
  content,
  setContent,
  mood,
  setMood,
  picture,
  setPicture,
  selectedSong,
  setSelectedSong,
}) => {
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "black" : "white";
  const bgColor = colorMode === "light" ? "#F2F1F5" : "black";
  const [countChar, setCountChar] = useState(content.length);

  const [isMusicModalVisible, setIsMusicModalVisible] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleMusicModal = () => {
    if (isMusicModalVisible) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start(() => setIsMusicModalVisible(false));
    } else {
      setIsMusicModalVisible(true);
      Animated.timing(animation, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }
  };

  const translateY = animation.interpolate({
    //changes the range of 0-1 to height-0
    inputRange: [0, 1],
    outputRange: [height, 0],
  });

  useEffect(() => {
    setCountChar(content.length);
  });

  return (
    <View style={{ marginTop: 20 }}>
      <View
        style={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <View
          style={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <TextInput
            style={{
              fontSize: 18,
              color: textColor,
              backgroundColor: colorMode === "light" ? "#E4E3E8" : "#1C1C1E",
              padding: 10,
              borderRadius: 10,
              fontWeight: 400,
            }}
            value={title}
            onChangeText={setTitle}
            placeholder="Title"
            placeholderTextColor={colorMode === "light" ? "#494949" : "#97989F"}
          />
          <TextInput
            style={{
              fontSize: 18,
              color: textColor,
              backgroundColor: colorMode === "light" ? "#E4E3E8" : "#1C1C1E",
              padding: 10,
              borderRadius: 10,
              fontWeight: 400,
              height: "60%",
            }}
            value={content}
            onChangeText={setContent}
            placeholder="Content"
            multiline={true}
            placeholderTextColor={colorMode === "light" ? "#494949" : "#97989F"}
          />
          <Text
            style={{ color: textColor, paddingRight: 4, textAlign: "right" }}
          >
            {countChar}/2000
          </Text>
        </View>

        <View
          style={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            marginTop: -60,
          }}
        >
          <Pressable
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottomWidth: 1,
              padding: 10,
              borderColor: colorMode === "light" ? "#E4E3E8" : "#1C1C1E",
            }}
            onPress={() => pickImage(setPicture)}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 14,
                alignItems: "center",
              }}
              onPress={pickImage}
            >
              <PictureIcon size={28} color={textColor} />
              <Text style={{ fontSize: 18, color: textColor }}>Add Image</Text>
            </View>

            <RightArrow size={24} color={textColor} />
          </Pressable>

          <Pressable
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottomWidth: 1,
              padding: 10,
              borderColor: colorMode === "light" ? "#E4E3E8" : "#1C1C1E",
            }}
            onPress={toggleMusicModal}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 14,
                alignItems: "center",
              }}
            >
              <Music size={28} color={textColor} />
              <Text style={{ fontSize: 18, color: textColor }}>Add music</Text>
            </View>
            <RightArrow size={24} color={textColor} />
          </Pressable>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 14,
              alignItems: "center",
              justifyContent: "space-between",
              borderBottomWidth: 1,
              padding: 10,
              borderColor: colorMode === "light" ? "#E4E3E8" : "#1C1C1E",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 14,
              }}
            >
              <SmileIcon size={28} color={textColor} />
              <TextInput
                style={{
                  fontSize: 18,
                  color: textColor,
                }}
                value={mood}
                onChangeText={setMood}
                placeholder="Enter mood"
                placeholderTextColor={textColor}
              />
            </View>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 14,
              borderBottomWidth: 1,
              padding: 10,
              borderColor: colorMode === "light" ? "#E4E3E8" : "#1C1C1E",
            }}
          >
            <Hashtag size={28} color={textColor} />
            <TextInput
              style={{
                fontSize: 18,
                color: textColor,
              }}
              placeholder="Enter hashtags"
              placeholderTextColor={textColor}
            />
          </View>
        </View>
      </View>

      <Modal
        transparent
        visible={isMusicModalVisible}
        onRequestClose={toggleMusicModal}
        animationType="fade"
        //modal is something that sits on top of the entire screen
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={toggleMusicModal}
        >
          <Animated.View
            style={[
              styles.modalContainer,
              {
                transform: [{ translateY }],
                backgroundColor: bgColor,
              },
            ]}
          >
            <View style={styles.modalContent}>
              <MusicTimeline onSelectSong={setSelectedSong} />
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  modalContent: {
    paddingBottom: 20,
  },
});

export default ContentPage;
