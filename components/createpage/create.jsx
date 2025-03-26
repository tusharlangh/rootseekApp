import { View, Text, StyleSheet, Pressable } from "react-native";
import ImagePickerExample from "./ImagePicker";
import { useColorMode } from "native-base";
import { useCallback, useState } from "react";
import MusicPicker from "./musicPicker";

const Create = () => {
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "black" : "white";
  const bgColor = colorMode === "light" ? "white" : "#121212";

  const [picture, setPicture] = useState("");
  const [selectedSong, setSelectedSong] = useState({});

  const [currentPage, setCurrentPage] = useState(0);

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
