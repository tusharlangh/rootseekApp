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
import { BlurView } from "expo-blur";

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
        style={{ display: "flex", flexDirection: "column", paddingBottom: 100 }}
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
              borderRadius: 20,
              overflow: "hidden", // Ensures blur effect stays within borders
              marginLeft: 10,
            }}
            onPress={() => pickImage(setPicture)}
          >
            <View
              style={{
                borderRadius: 20,
                overflow: "hidden",
                backgroundColor: "rgba(38, 43, 43, 0.6)",
              }}
            >
              <BlurView intensity={50} tint="default" style={{ padding: 10 }}>
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Add Image
                </Text>
              </BlurView>
            </View>
          </Pressable>
        </View>

        <BlurView
          intensity={50}
          tint="default"
          style={{
            backgroundColor: "rgba(38, 43, 43, 0.6)",
            padding: 10,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginTop: 10,
            overflow: "hidden",
            borderRadius: 30,
          }}
        >
          <TextInput
            style={[
              {
                textAlign: "center",
                color: "rgba(245, 245, 245, 0.9)",
                fontSize: 40,
                fontWeight: "600",
                borderBottomWidth: 1,
                borderBottomColor: "rgb(200, 200, 200)",
              },
            ]}
            value={title}
            onChangeText={setTitle}
            placeholder="Title"
            placeholderTextColor="rgba(245, 245, 245, 0.9)"
            numberOfLines={1}
          />

          <TextInput
            style={{
              textAlign: "center",
              fontSize: 18,
              color: "rgba(245, 245, 245, 0.9)",
              padding: 10,
              borderRadius: 10,
              fontWeight: "400",
              paddingBottom: 20,
            }}
            value={content}
            onChangeText={setContent}
            placeholder="Add a content"
            multiline
            placeholderTextColor="rgba(245, 245, 245, 0.9)"
          />

          <Text style={{ color: "white", paddingRight: 4, textAlign: "right" }}>
            {countChar}/2000
          </Text>
        </BlurView>

        <BlurView
          intensity={50}
          tint="default"
          style={{
            backgroundColor: "rgba(38, 43, 43, 0.6)",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginTop: 10,
            overflow: "hidden",
            borderRadius: 30,
            padding: 12,
          }}
        >
          <Pressable
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
            onPress={() => setIsMusicModalVisible(true)}
          >
            <Text
              style={{
                fontSize: 14,
                color: "rgba(245, 245, 245, 0.4)",
                fontWeight: 500,
              }}
            >
              Add music
            </Text>
            <Text
              style={{
                marginTop: 4,
                fontSize: 18,
                color: "white",
                fontWeight: 500,
              }}
            >
              Add your music to express your memory
            </Text>
            <BlurView
              intensity={50}
              tint="systemChromeMaterialLight"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                width: "80%",
                padding: 50,
                borderRadius: 30,
                marginTop: 10,
              }}
            >
              <Music size={50} color="rgba(245, 245, 245, 0.8)" />
            </BlurView>
          </Pressable>
        </BlurView>

        <BlurView
          intensity={50}
          tint="default"
          style={{
            backgroundColor: "rgba(38, 43, 43, 0.6)",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginTop: 10,
            overflow: "hidden",
            borderRadius: 30,
            padding: 12,
          }}
        >
          <Pressable
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
            onPress={() => setIsMusicModalVisible(true)}
          >
            <Text
              style={{
                fontSize: 14,
                color: "rgba(245, 245, 245, 0.4)",
                fontWeight: 500,
              }}
            >
              Your mood
            </Text>
            <Text
              style={{
                marginTop: 4,
                fontSize: 18,
                color: "white",
                fontWeight: 500,
              }}
            >
              Add your mood to express your self
            </Text>
            <BlurView
              intensity={50}
              tint="systemChromeMaterialLight"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                width: "80%",
                padding: 10,
                borderRadius: 30,
                marginTop: 10,
              }}
            >
              <SmileIcon size={50} color="rgba(245, 245, 245, 0.8)" />
            </BlurView>
          </Pressable>
        </BlurView>

        <BlurView
          intensity={50}
          tint="default"
          style={{
            backgroundColor: "rgba(38, 43, 43, 0.6)",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginTop: 10,
            overflow: "hidden",
            borderRadius: 30,
            padding: 12,
          }}
        >
          <Pressable
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
            onPress={() => setIsMusicModalVisible(true)}
          >
            <Text
              style={{
                fontSize: 14,
                color: "rgba(245, 245, 245, 0.4)",
                fontWeight: 500,
              }}
            >
              Tags
            </Text>
            <Text
              style={{
                marginTop: 4,
                fontSize: 18,
                color: "white",
                fontWeight: 500,
              }}
            >
              Add tags for easy lookup
            </Text>
            <BlurView
              intensity={50}
              tint="systemChromeMaterialLight"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                width: "80%",
                padding: 10,
                borderRadius: 30,
                marginTop: 10,
              }}
            >
              <Hashtag size={50} color="rgba(245, 245, 245, 0.8)" />
            </BlurView>
          </Pressable>
        </BlurView>
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
  blurContainer: {
    width: "60%",
    borderRadius: 20,
    overflow: "hidden", // Ensures blur effect stays within borders
    marginLeft: 10,
  },
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
