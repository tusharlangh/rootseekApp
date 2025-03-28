import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  Animated,
  Dimensions,
  TextInput,
} from "react-native";
import ImagePickerExample from "./ImagePicker";
import { useColorMode } from "native-base";
import { useCallback, useEffect, useRef, useState } from "react";
import MusicPicker from "./musicPicker";
import ContentPage from "./contentPage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { CloseIcon } from "../icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const Create = ({ visible, onClose }) => {
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "black" : "white";
  const bgColor = colorMode === "light" ? "#F2F1F5" : "#0D1014";

  const [picture, setPicture] = useState(null);
  const [selectedSong, setSelectedSong] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");
  const [creating, setCreating] = useState(false);

  // Start offscreen to the right
  const translateX = useRef(new Animated.Value(SCREEN_WIDTH)).current;

  useEffect(() => {
    if (visible) {
      translateX.setValue(SCREEN_WIDTH); // Reset position
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleClose = () => {
    Animated.timing(translateX, {
      toValue: SCREEN_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  const handlePictureSelect = useCallback((picture) => {
    setPicture(picture);
  }, []);

  const handleSongSelect = useCallback((song) => {
    setSelectedSong(song);
  }, []);

  const createRoot = async () => {
    if (title === "" || content === "") {
      console.log("Please fill up the title and the content.");
      return;
    }

    setCreating(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("mood", mood);
    formData.append("trackId", selectedSong?.id);
    formData.append("trackName", selectedSong?.title);
    formData.append("trackArtist", selectedSong?.artist?.name);
    formData.append("trackAlbumCover", selectedSong?.album?.cover);

    if (picture) {
      formData.append("image", {
        uri: picture,
        name: "image.jpg",
        type: "image/jpeg",
      });
    }

    try {
      const token = await AsyncStorage.getItem("token");
      await axios.post("http://localhost:5002/user/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      navigation.navigate("Homepage");
    } catch (error) {
      console.error(error);
    } finally {
      setCreating(false);
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: bgColor,
        },
      ]}
    >
      <View
        style={[
          styles.header,
          { borderBottomColor: colorMode === "light" ? "#E4E3E8" : "#3D3D41" },
        ]}
      >
        <TextInput
          style={[
            styles.createText,
            {
              color: textColor,
              borderRadius: 10,
            },
          ]}
          value={title}
          onChangeText={setTitle}
          placeholder="Title"
          placeholderTextColor={textColor}
        />

        <Pressable style={{ marginRight: 10 }} onPress={handleClose}>
          <CloseIcon size={30} color={textColor} />
        </Pressable>
      </View>

      <View style={styles.content}>
        <ContentPage
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          mood={mood}
          setMood={setMood}
          picture={picture}
          setPicture={handlePictureSelect}
          selectedSong={selectedSong}
          setSelectedSong={handleSongSelect}
        />
      </View>

      <View
        style={[
          styles.footer,
          { borderTopColor: colorMode === "light" ? "#E4E3E8" : "#3D3D41" },
        ]}
      >
        <Pressable
          style={[
            styles.createButton,
            {
              backgroundColor: "#3B83F7",
            },
          ]}
          onPress={createRoot}
          disabled={creating}
        >
          <Text style={[styles.createButtonText, { color: "white" }]}>
            {creating ? "Creating..." : "Create"}
          </Text>
        </Pressable>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    paddingTop: 60,
    paddingHorizontal: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 10,
    //borderBottomWidth: 1,
  },
  createText: {
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 16,
  },
  content: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 12,
  },
  footer: {
    paddingTop: 20,
    //borderTopWidth: 1,
    paddingBottom: 50,
  },
  createButton: {
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 14,
  },
  createButtonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default Create;
