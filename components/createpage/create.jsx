import { View, Text, StyleSheet, Pressable } from "react-native";
import ImagePickerExample from "./ImagePicker";
import { useColorMode } from "native-base";
import { useCallback, useEffect, useState } from "react";
import MusicPicker from "./musicPicker";
import ContentPage from "./contentPage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Create = ({ navigation }) => {
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "black" : "white";
  const bgColor = colorMode === "light" ? "#F2F1F5" : "black";

  const [picture, setPicture] = useState(null);
  const [selectedSong, setSelectedSong] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const [creating, setCreating] = useState(false);

  const handlePictureSelect = useCallback((picture) => {
    setPicture(picture);
  }, []);

  const handleSongSelect = useCallback((song) => {
    setSelectedSong(song);
  });

  const pages = [
    {
      name: "picture",
      component: (
        <ImagePickerExample
          picture={picture}
          onSelectPicture={handlePictureSelect}
        />
      ),
    },
    {
      name: "music",
      component: (
        <MusicPicker
          handleSongSelect={handleSongSelect}
          selectedSong={selectedSong}
        />
      ),
    },
    {
      name: "content",
      component: (
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
      ),
    },
  ];

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
        name: "iamge.jpg",
      });
    }

    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5002/user/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigation.navigate("Homepage");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Pressable
          style={{
            padding: 6,

            borderRadius: 10,
          }}
          onPress={createRoot}
        >
          <Text
            style={{
              color: textColor,
              textAlign: "right",
              fontSize: 20,
              fontWeight: "700",
            }}
          >
            {creating ? "Creating" : "Create"}
          </Text>
        </Pressable>
        )
      </View>

      <View>{pages[2].component}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    paddingHorizontal: 5,
    height: "100%",
    paddingTop: 60,
  },

  nestedContainer: {
    paddingHorizontal: 4,
  },
  dailyText: {
    marginLeft: 4,
    fontSize: 24,
    fontWeight: "800",
  },
});

export default Create;
