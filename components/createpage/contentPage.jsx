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
  Image,
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
import TagsModal from "./tagsModal";

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
  tags,
  handleTags,
}) => {
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "black" : "white";
  const [isMusicModalVisible, setIsMusicModalVisible] = useState(false);
  const [isContentModalVisible, setIsContentModalVisible] = useState(false);
  const [isTagsModalVisible, setIsTagsModalVisible] = useState(false);

  const openPickImage = () => {
    pickImage(setPicture);
  };

  const getTags = (tags) => {
    const t = tags.split("#").filter((h) => h.length > 0);
    return t;
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.mainContainer]}>
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

        <BlurView
          intensity={80}
          tint={colorMode === "light" ? "light" : "dark"}
          style={[
            styles.backgroundBlur,
            {
              backgroundColor:
                colorMode === "light"
                  ? "rgba(242,241,245,0.9)"
                  : "rgba(0,0,0,0.9)",
            },
          ]}
        >
          <BlurView
            intensity={50}
            tint="default"
            style={[
              styles.blurCard,
              {
                color: textColor,
                backgroundColor:
                  colorMode === "light"
                    ? "rgba(255, 255, 255, 0.9)"
                    : "rgba(38, 43, 43, 0.1)",
              },
            ]}
          >
            <TextInput
              style={[styles.titleInput, { color: textColor }]}
              value={title}
              onChangeText={setTitle}
              placeholder="Title"
              placeholderTextColor={
                colorMode === "light"
                  ? "rgba(0, 0, 0, 0.9)"
                  : "rgba(245, 245, 245, 0.9)"
              }
              numberOfLines={1}
            />
          </BlurView>
          <BlurView
            intensity={50}
            tint="default"
            style={[
              styles.blurCard,
              {
                color: textColor,
                backgroundColor:
                  colorMode === "light"
                    ? "rgba(255, 255, 255, 0.9)"
                    : "rgba(38, 43, 43, 0.1)",
              },
            ]}
          >
            <Pressable onPress={() => setIsContentModalVisible(true)}>
              {content ? (
                <Text
                  style={{
                    color: textColor,
                    textAlign: "center",
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                >
                  {content}
                </Text>
              ) : (
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
              )}
            </Pressable>
          </BlurView>

          <BlurView
            intensity={50}
            tint="default"
            style={[
              styles.blurCard,
              {
                color: textColor,
                backgroundColor:
                  colorMode === "light"
                    ? "rgba(255, 255, 255, 0.9)"
                    : "rgba(38, 43, 43, 0.1)",
              },
            ]}
          >
            <Pressable
              style={styles.selectionButton}
              onPress={() => setIsMusicModalVisible(true)}
            >
              <Text
                style={[
                  styles.directionTitle,
                  {
                    color:
                      colorMode === "light"
                        ? "rgba(0,0,0,0.4)"
                        : "rgba(245, 245, 245, 0.6)",
                  },
                ]}
              >
                Add music
              </Text>
              <Text style={[styles.directionText, { color: textColor }]}>
                Add your music to express your memory
              </Text>
              <BlurView
                intensity={0}
                tint={colorMode === "light" ? "extraLight" : "light"}
                style={[
                  styles.blurNestedContainer,
                  {
                    padding: 50,
                    backgroundColor:
                      colorMode === "light" ? "#F2F1F5" : "#222222",
                  },
                ]}
              >
                {selectedSong.id ? (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Music size={20} color={textColor} />
                    <View style={{ marginLeft: 10 }}>
                      <Text
                        style={{
                          color: textColor,
                          fontSize: 18,
                          fontWeight: 700,
                        }}
                        numberOfLines={1}
                      >
                        {selectedSong.title}
                      </Text>
                      <Text style={{ color: textColor, fontSize: 16 }}>
                        {selectedSong.artist.name}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <Music
                    size={50}
                    color={
                      colorMode === "light"
                        ? "rgba(0,0,0,0.7)"
                        : "rgba(255, 255, 255, 0.9)"
                    }
                  />
                )}
              </BlurView>
            </Pressable>
          </BlurView>

          <BlurView
            intensity={50}
            tint="default"
            style={[
              styles.blurCard,
              {
                color: textColor,
                backgroundColor:
                  colorMode === "light"
                    ? "rgba(255, 255, 255, 0.9)"
                    : "rgba(38, 43, 43, 0.1)",
              },
            ]}
          >
            <Pressable
              style={styles.selectionButton}
              onPress={() => setIsTagsModalVisible(true)}
            >
              <Text
                style={[
                  styles.directionTitle,
                  {
                    color:
                      colorMode === "light"
                        ? "rgba(0,0,0,0.4)"
                        : "rgba(245, 245, 245, 0.6)",
                  },
                ]}
              >
                Tags
              </Text>
              <Text style={[styles.directionText, { color: textColor }]}>
                Add tags for easy lookup
              </Text>
              <BlurView
                intensity={0}
                tint={colorMode === "light" ? "extraLight" : "light"}
                style={[
                  styles.blurNestedContainer,
                  {
                    backgroundColor:
                      colorMode === "light" ? "#F2F1F5" : "#222222",
                  },
                ]}
              >
                {tags ? (
                  <View>
                    {getTags(tags).map((tag, index) => (
                      <Text numberOfLines={1} key={index}>
                        #{tag}
                      </Text>
                    ))}
                  </View>
                ) : (
                  <Hashtag
                    size={50}
                    color={
                      colorMode === "light"
                        ? "rgba(0,0,0,0.7)"
                        : "rgba(255, 255, 255, 0.9)"
                    }
                  />
                )}
              </BlurView>
            </Pressable>
          </BlurView>
        </BlurView>
      </View>

      <BottomPage
        isModalVisible={isMusicModalVisible}
        setIsModalVisible={setIsMusicModalVisible}
        height={90}
      >
        <MusicTimeline onSelectSong={setSelectedSong} />
      </BottomPage>
      <BottomPage
        isModalVisible={isContentModalVisible}
        setIsModalVisible={setIsContentModalVisible}
        height={90}
      >
        <ContentModal setContent={setContent} content={content} />
      </BottomPage>
      <BottomPage
        isModalVisible={isTagsModalVisible}
        setIsModalVisible={setIsTagsModalVisible}
        height={90}
      >
        <TagsModal tags={tags} handleTags={handleTags} />
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
    fontSize: 16,
    fontWeight: 600,
  },
  directionTitle: {
    fontSize: 14,

    fontWeight: 600,
  },
  selectionButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
  },
  blurCard: {
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
