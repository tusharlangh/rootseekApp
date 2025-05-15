import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  Animated,
  Dimensions,
  TextInput,
  Image,
} from "react-native";
import { useColorMode } from "native-base";
import { useCallback, useEffect, useRef, useState } from "react";
import ContentPage from "./contentPage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { CloseIcon } from "../icons";
import { TestPic } from "../../additional";
import { BlurView } from "expo-blur";
import BottomPage from "../bottom-page";
import CloseModal from "./closeModal";
import FuturaCyrillicBold from "../../assets/fonts/FuturaCyrillicBold.ttf";
import FuturaCyrillicMedium from "../../assets/fonts/FuturaCyrillicMedium.ttf";
import FuturaCyrillicLight from "../../assets/fonts/FuturaCyrillicLight.ttf";
import FuturaCyrillicBook from "../../assets/fonts/FuturaCyrillicBook.ttf";
import FuturaCyrillicDemi from "../../assets/fonts/FuturaCyrillicDemi.ttf";
import FuturaCyrillicHeavy from "../../assets/fonts/FuturaCyrillicHeavy.ttf";
import { useFonts } from "expo-font";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const Create = ({ visible, onClose }) => {
  let [fontsLoaded] = useFonts({
    FuturaCyrillicBold,
    FuturaCyrillicMedium,
    FuturaCyrillicLight,
    FuturaCyrillicBook,
    FuturaCyrillicDemi,
    FuturaCyrillicHeavy,
  });

  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "black" : "white";
  const bgColor = colorMode === "light" ? "white" : "black";

  const [picture, setPicture] = useState(null);
  const [selectedSong, setSelectedSong] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");
  const [creating, setCreating] = useState(false);
  const [tags, setTags] = useState("");
  const [send, setSend] = useState(false);
  const [isCloseModalVisible, setIsCloseModalVisible] = useState(false);

  const translateX = useRef(new Animated.Value(SCREEN_WIDTH)).current;

  useEffect(() => {
    if (visible) {
      translateX.setValue(SCREEN_WIDTH);
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

  useEffect(() => {
    if (content && title) {
      setSend(true);
    } else {
      setSend(false);
    }
  });

  const handlePictureSelect = useCallback((pic) => {
    setPicture(pic);
  }, []);

  const handleSongSelect = useCallback((song) => {
    setSelectedSong(song);
  }, []);

  function isAlphaWithHash(str) {
    return /^[A-Za-z#]+$/.test(str);
  }

  const handleTags = useCallback((tags) => {
    if (isAlphaWithHash(tags) || tags === "") {
      setTags(tags);
    }
  }, []);

  const createRoot = async () => {
    console.log("got in");
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
    formData.append("hashTags", tags);

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
      handleClose();
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
      <View intensity={500} tint="default" style={styles.absolute}>
        <Image
          source={{ uri: picture }}
          style={[
            styles.backgroundImage,
            {
              opacity: colorMode === "light" ? 0.9 : 0.8,
            },
          ]}
          resizeMode="top"
        />
      </View>

      <View
        style={[
          styles.header,
          { borderBottomColor: colorMode === "light" ? "#E4E3E8" : "#3D3D41" },
        ]}
      >
        <Pressable
          style={[
            styles.closeButton,
            {
              backgroundColor:
                colorMode === "light"
                  ? "rgba(0,0,0,0.6)"
                  : "rgba(255,255,255,0.4)",
            },
          ]}
          onPress={() => setIsCloseModalVisible(true)}
        >
          <CloseIcon size={22} color="white" />
        </Pressable>
        <BlurView
          intensity={50}
          tint="systemChromeMaterialLight"
          style={styles.createButtonBlur}
        >
          <Pressable
            style={[
              styles.createButton,
              {
                backgroundColor:
                  colorMode === "light"
                    ? send
                      ? "rgba(0,0,0,0.6)"
                      : "rgba(0,0,0,0.1)"
                    : send
                    ? "rgba(255,255,255,0.6)"
                    : "rgba(96, 96, 96, 0.6)",
              },
            ]}
            onPress={createRoot}
          >
            <Text
              style={[
                styles.createButtonText,
                {
                  fontFamily: "FuturaCyrillicDemi",
                  color:
                    colorMode === "light"
                      ? "rgba(255,255,255,0.9)"
                      : "rgba(0,0,0, 0.6)",
                },
              ]}
            >
              {creating ? "Creating" : "Create"}
            </Text>
          </Pressable>
        </BlurView>
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
          tags={tags}
          handleTags={handleTags}
        />
      </View>

      <BottomPage
        isModalVisible={isCloseModalVisible}
        setIsModalVisible={setIsCloseModalVisible}
        height={22}
      >
        <CloseModal
          setIsCloseModalVisible={setIsCloseModalVisible}
          handleClose={handleClose}
        />
      </BottomPage>
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
  blurView: {
    width: "100%",
    height: 300, // Adjust as needed
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10, // Optional: add rounded corners
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  createText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    paddingVertical: 10,
  },
  footer: {
    paddingTop: 20,
    //borderTopWidth: 1,
    paddingBottom: 50,
  },
  createButtonBlur: {
    borderRadius: 30,
    overflow: "hidden",
    marginRight: 10,
    backgroundColor: "rgba(255,255,255, 0.6)",
  },
  createButton: {
    padding: 6,
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  createButtonText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
  },
  closeButton: {
    marginLeft: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 6,
    borderRadius: 50,
  },
  backgroundImage: {
    width: "100%",
    height: 400,
  },
  absolute: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    width: "100%",
  },
});

export default Create;
