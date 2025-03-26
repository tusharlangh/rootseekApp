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
  const bgColor = colorMode === "light" ? "white" : "#121212";

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
        />
      ),
    },
  ];

  const nextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

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
          justifyContent: "space-between",
        }}
      >
        <Pressable
          style={{
            backgroundColor: textColor,
            padding: 6,
            marginLeft: 10,
            borderRadius: 10,
          }}
          onPress={previousPage}
        >
          <Text
            style={{
              color: bgColor,
              textAlign: "right",
              fontSize: 15,
              fontWeight: "600",
            }}
          >
            Previous
          </Text>
        </Pressable>
        {currentPage === pages.length - 1 ? (
          <Pressable
            style={{
              backgroundColor: textColor,
              padding: 6,
              marginRight: 10,
              borderRadius: 10,
            }}
            onPress={createRoot}
          >
            <Text
              style={{
                color: bgColor,
                textAlign: "right",
                fontSize: 15,
                fontWeight: "600",
              }}
            >
              {creating ? "Creating" : "Create"}
            </Text>
          </Pressable>
        ) : (
          <Pressable
            style={{
              backgroundColor: textColor,
              padding: 6,
              marginRight: 10,
              borderRadius: 10,
            }}
            onPress={nextPage}
          >
            <Text
              style={{
                color: bgColor,
                textAlign: "right",
                fontSize: 15,
                fontWeight: "600",
              }}
            >
              Next
            </Text>
          </Pressable>
        )}
      </View>

      <View>{pages[currentPage].component}</View>
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
