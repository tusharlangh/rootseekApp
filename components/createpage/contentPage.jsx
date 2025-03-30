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
import ContentModal from "./contentModal";

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
  const [isMusicModalVisible, setIsMusicModalVisible] = useState(false);
  const [isContentModalVisible, setIsContentModalVisible] = useState(false);

  const openPickImage = () => {
    pickImage(setPicture);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.mainContainer}>
        <View style={styles.imageButton}>
          <Pressable
            style={{
              borderRadius: 20,
              overflow: "hidden", // Ensures blur effect stays within borders
              marginLeft: 10,
            }}
            onPress={openPickImage}
          >
            <View
              style={{
                borderRadius: 20,
                overflow: "hidden",
                backgroundColor: "rgba(38, 43, 43, 0.6)",
              }}
            >
              <BlurView intensity={50} tint="default" style={{ padding: 10 }}>
                <Text style={styles.addImageText}>Add Image</Text>
              </BlurView>
            </View>
          </Pressable>
        </View>

        <BlurView intensity={74} tint="dark" style={styles.backgroundBlur}>
          <BlurView intensity={50} tint="default" style={[styles.blurCard]}>
            <TextInput
              style={styles.titleInput}
              value={title}
              onChangeText={setTitle}
              placeholder="Title"
              placeholderTextColor="rgba(245, 245, 245, 0.9)"
              numberOfLines={1}
            />
          </BlurView>
          <BlurView intensity={50} tint="default" style={[styles.blurCard]}>
            <Pressable onPress={() => setIsContentModalVisible(true)}>
              <Text
                style={{
                  color: textColor,
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                Add a content.
              </Text>
            </Pressable>
          </BlurView>

          <BlurView intensity={50} tint="default" style={[styles.blurCard]}>
            <Pressable
              style={styles.selectionButton}
              onPress={() => setIsMusicModalVisible(true)}
            >
              <Text style={styles.directionTitle}>Add music</Text>
              <Text style={styles.directionText}>
                Add your music to express your memory
              </Text>
              <BlurView
                intensity={50}
                tint={colorMode === "light" ? "extraLight" : "light"}
                style={[styles.blurNestedContainer, { padding: 50 }]}
              >
                <Music size={50} color="rgba(255, 255, 255, 0.9)" />
              </BlurView>
            </Pressable>
          </BlurView>

          <BlurView intensity={50} tint="default" style={styles.blurCard}>
            <Pressable
              style={styles.selectionButton}
              onPress={() => setIsMusicModalVisible(true)}
            >
              <Text style={styles.directionTitle}>Tags</Text>
              <Text style={styles.directionText}>Add tags for easy lookup</Text>
              <BlurView
                intensity={50}
                tint={colorMode === "light" ? "extraLight" : "light"}
                style={styles.blurNestedContainer}
              >
                <Hashtag size={50} color="rgba(255, 255, 255, 0.9)" />
              </BlurView>
            </Pressable>
          </BlurView>
        </BlurView>
      </View>

      <BottomPage
        isModalVisible={isMusicModalVisible}
        setIsModalVisible={setIsMusicModalVisible}
      >
        <MusicTimeline onSelectSong={setSelectedSong} />
      </BottomPage>
      <BottomPage
        isModalVisible={isContentModalVisible}
        setIsModalVisible={setIsContentModalVisible}
      >
        <ContentModal setContent={setContent} content={content} />
      </BottomPage>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: 40,
    marginTop: 200,
  },
  backgroundBlur: {
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 30,
    overflow: "hidden",
    padding: 12,
  },
  blurNestedContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    width: "80%",
    padding: 10,
    borderRadius: 30,
    marginTop: 10,
  },
  directionText: {
    marginTop: 4,
    fontSize: 18,
    color: "white",
    fontWeight: 500,
    shadowColor: "white", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Horizontal and Vertical offset
    shadowOpacity: 0.04, // Shadow opacity
    shadowRadius: 3, // Radius of the shadow
  },
  directionTitle: {
    fontSize: 14,
    color: "rgba(245, 245, 245, 0.6)",
    fontWeight: 600,
  },
  selectionButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
    shadowColor: "black",
    shadowOffset: { width: 100, height: 100 },
    shadowOpacity: 0.9,
    shadowRadius: 110,
  },
  blurCard: {
    backgroundColor: "rgba(38, 43, 43, 0.1)",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginTop: 10,
    overflow: "hidden",
    borderRadius: 30,
    padding: 12,
  },
  titleInput: {
    textAlign: "center",
    color: "rgba(245, 245, 245, 0.9)",
    fontSize: 40,
    fontWeight: "600",
    //borderBottomWidth: 1,
    //borderBottomColor: "rgba(200, 200, 200, 0.1)",
    borderRadius: 2,
  },
  contentInput: {
    textAlign: "center",
    fontSize: 18,
    color: "rgba(245, 245, 245, 0.9)",
    padding: 10,
    borderRadius: 10,
    fontWeight: "400",
    paddingBottom: 20,
  },
  addImageText: {
    color: "rgba(245, 245, 245, 0.9)",
    fontWeight: "bold",
    fontSize: 16,
  },
  imageButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});

export default ContentPage;
