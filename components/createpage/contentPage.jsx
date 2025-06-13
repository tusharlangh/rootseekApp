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
import { useFonts } from "expo-font";
import { theme } from "../../theme";

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
  let [fontsLoaded] = useFonts({});
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "black" : "white";
  const [isMusicModalVisible, setIsMusicModalVisible] = useState(false);
  const [isContentModalVisible, setIsContentModalVisible] = useState(false);
  const [isTagsModalVisible, setIsTagsModalVisible] = useState(false);
  const [onClose, setOnClose] = useState(0);

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
              overflow: "hidden",
              marginLeft: 10,
            }}
            onPress={openPickImage}
          >
            <View
              style={{
                borderRadius: 20,
                overflow: "hidden",
                backgroundColor: theme.create_screen.constant_bg,
              }}
            >
              <BlurView intensity={50} tint="default" style={{ padding: 8 }}>
                <Text style={[styles.addImageText]}>Add Image</Text>
              </BlurView>
            </View>
          </Pressable>
        </View>

        <BlurView
          intensity={80}
          tint={"dark"}
          style={[
            styles.backgroundBlur,
            {
              backgroundColor: theme.create_screen.constant_bg,
            },
          ]}
        >
          <BlurView intensity={50} tint="default" style={[styles.blurCard]}>
            <TextInput
              style={[
                styles.titleInput,
                {
                  color: theme.create_screen.constant_bg_text_color,
                },
              ]}
              value={title}
              onChangeText={setTitle}
              placeholder="Title"
              placeholderTextColor={theme.create_screen.constant_bg_text_color}
              numberOfLines={1}
            />
          </BlurView>
          <BlurView intensity={50} tint="default" style={[styles.blurCard]}>
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
                    color: theme.create_screen.constant_bg_text_color,
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

          <BlurView intensity={50} tint="default" style={[styles.blurCard]}>
            <Pressable
              style={styles.selectionButton}
              onPress={() => setIsMusicModalVisible(true)}
            >
              <Text
                style={[
                  styles.directionTitle,
                  {
                    color: theme.create_screen.constant_bg_text_color,
                  },
                ]}
              >
                Add music
              </Text>
              <Text
                style={[
                  styles.directionText,
                  { color: theme.create_screen.sub_header },
                ]}
              >
                Add your music to express your memory
              </Text>
              <BlurView
                intensity={0}
                tint={colorMode === "light" ? "extraLight" : "light"}
                style={[
                  styles.blurNestedContainer,
                  {
                    padding: 50,
                    backgroundColor: theme.create_screen.blur_nested_container,
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
                          color: theme.create_screen.music_hashtag_icon_bg,
                          fontSize: 18,
                          fontWeight: 700,
                        }}
                        numberOfLines={1}
                      >
                        {selectedSong.title}
                      </Text>
                      <Text
                        style={{
                          color: theme.create_screen.music_hashtag_icon_bg,
                          fontSize: 16,
                        }}
                      >
                        {selectedSong.artist.name}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <Music
                    size={50}
                    color={theme.create_screen.music_hashtag_icon_bg}
                  />
                )}
              </BlurView>
            </Pressable>
          </BlurView>

          <BlurView intensity={50} tint="default" style={[styles.blurCard]}>
            <Pressable
              style={styles.selectionButton}
              onPress={() => setIsTagsModalVisible(true)}
            >
              <Text
                style={[
                  styles.directionTitle,
                  {
                    color: theme.create_screen.constant_bg_text_color,
                  },
                ]}
              >
                Tags
              </Text>
              <Text
                style={[
                  styles.directionText,
                  { color: theme.create_screen.sub_header },
                ]}
              >
                Add tags for easy lookup
              </Text>
              <BlurView
                intensity={0}
                tint={colorMode === "light" ? "extraLight" : "light"}
                style={[
                  styles.blurNestedContainer,
                  {
                    backgroundColor: theme.create_screen.blur_nested_container,
                  },
                ]}
              >
                {tags ? (
                  <View>
                    {getTags(tags).map((tag, index) => (
                      <Text
                        style={{
                          color: theme.create_screen.constant_bg_text_color,
                        }}
                        numberOfLines={1}
                        key={index}
                      >
                        #{tag}
                      </Text>
                    ))}
                  </View>
                ) : (
                  <Hashtag
                    size={50}
                    color={theme.create_screen.music_hashtag_icon_bg}
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
        setOnCloseSignal={setOnClose}
      >
        <MusicTimeline onSelectSong={setSelectedSong} onCloseSignal={onClose} />
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
    fontSize: 14,
    fontWeight: 600,
  },
  directionTitle: {
    fontSize: 16,
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
    backgroundColor: theme.create_screen.constant_bg,
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
    color: theme.create_screen.constant_bg_text_color,
    fontWeight: "bold",
    fontSize: 15,
  },
  imageButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});

export default ContentPage;
