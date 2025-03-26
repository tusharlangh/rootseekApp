import {
  View,
  Image,
  Platform,
  Pressable,
  Text,
  Dimensions,
  StyleSheet,
} from "react-native";
import { Music } from "../icons";
import { useColorMode } from "native-base";
import { useEffect, useState } from "react";
import MusicTimeline from "./musicTimeline";

const MusicPicker = ({ handleSongSelect, selectedSong }) => {
  const [showMusic, setShowMusic] = useState(false);
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "black" : "white";
  const bgColor = colorMode === "light" ? "white" : "#121212";

  useEffect(() => {
    if (Object.keys(selectedSong).length !== 0) {
      setShowMusic(true);
    }
  });

  return (
    <View style={{ height: "96%" }}>
      {!showMusic ? (
        <View style={styles.container}>
          <Music size={150} />
          <Text style={[styles.infoText, { color: textColor }]}>
            Add music to describe your mood
          </Text>
          <Pressable style={styles.musicBtn} onPress={() => setShowMusic(true)}>
            <Text style={styles.musicBtnTxt}>Add music</Text>
          </Pressable>
        </View>
      ) : (
        <View>
          <MusicTimeline onSelectSong={handleSongSelect} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  infoText: {
    fontSize: 20,
    fontWeight: 500,
    marginTop: 10,
  },
  musicBtn: {
    backgroundColor: "#CC99FF",
    borderRadius: 6,
    padding: 6,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  musicBtnTxt: {
    color: "white",
    fontSize: 16,
    fontWeight: 500,
  },
});

export default MusicPicker;
