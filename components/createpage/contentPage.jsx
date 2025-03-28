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
  PanResponder,
  ScrollView,
} from "react-native";
import { useColorMode } from "native-base";
import {
  AddPerson,
  Hashtag,
  Music,
  PictureIcon,
  RightArrow,
  ShareIcon,
  SmileIcon,
} from "../icons";
import { useEffect, useRef, useState } from "react";
import pickImage from "./ImagePicker";
import MusicTimeline from "./musicTimeline";
import BottomPage from "../bottom-page";

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
  const [countChar, setCountChar] = useState(content.length);
  const [isMusicModalVisible, setIsMusicModalVisible] = useState(false);

  useEffect(() => {
    setCountChar(content.length);
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{ display: "flex", flexDirection: "column", paddingBottom: 500 }}
      >
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Pressable
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: 200,
              height: 200,
              borderWidth: 2,
              borderColor: colorMode === "light" ? "#E4E3E8" : "#15191F",
              borderRadius: 10,
              fontWeight: "400",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 5,
            }}
            onPress={() => pickImage(setPicture)}
          >
            <View>
              <PictureIcon size={50} color={textColor} />
            </View>
          </Pressable>
        </View>

        <View
          style={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginTop: 10,
          }}
        >
          <TextInput
            style={{
              fontSize: 14,
              color: textColor,

              padding: 10,
              borderRadius: 10,
              fontWeight: "400",
              height: "60%",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 5,
            }}
            value={content}
            onChangeText={setContent}
            placeholder="Content.."
            multiline
            placeholderTextColor={textColor}
          />

          <Text
            style={{ color: textColor, paddingRight: 4, textAlign: "right" }}
          >
            {countChar}/2000
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: -50,
            gap: 20,
          }}
        >
          <Pressable
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onPress={() => setIsMusicModalVisible(true)}
          >
            <View style={styles.optionContent}>
              <Music size={28} color={textColor} />
              <Text style={{ fontSize: 16, color: textColor }}>Add music</Text>
            </View>
            <RightArrow size={18} color="#71757E" />
          </Pressable>

          <Pressable
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.optionContent}>
              <SmileIcon size={28} color={textColor} />
              <Text style={{ fontSize: 16, color: textColor }}>Mood</Text>
            </View>
            <RightArrow size={18} color="#71757E" />
          </Pressable>

          <Pressable
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.optionContent}>
              <Hashtag size={28} color={textColor} />
              <Text style={{ fontSize: 16, color: textColor }}>Tags</Text>
            </View>
            <RightArrow size={18} color="#71757E" />
          </Pressable>
        </View>
      </View>

      <BottomPage
        isMusicModalVisible={isMusicModalVisible}
        setIsMusicModalVisible={setIsMusicModalVisible}
      >
        <MusicTimeline onSelectSong={setSelectedSong} />
      </BottomPage>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 0, // Add padding if needed
  },
  modalIndicator: {
    width: 40,
    height: 5,
    backgroundColor: "#888",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 15,
  },
  modalContent: {
    paddingBottom: 20,
  },
  option: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    padding: 10,
    borderColor: "#E4E3E8",
  },
  optionContent: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});

export default ContentPage;
