import { useColorMode } from "native-base";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Text,
  Image,
  ScrollView,
  Pressable,
  Animated,
  Easing,
} from "react-native";
import { PlayIcon, PauseIcon, SearchIconOutline } from "../icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Audio } from "expo-av";
import { useFonts } from "expo-font";
import { PhoneContext } from "../../App";

const MusicTimeline = ({ onSelectSong, onCloseSignal }) => {
  const { usePhone } = useContext(PhoneContext);

  const address = usePhone ? "192.168.1.80:5002" : "localhost:5002";

  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "black" : "white";
  const songBg = "rgba(255,255,255,0.25)";

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedSongId, setSelectedSongId] = useState(null);

  const [song, setSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const respone = await axios.get(
          `http://${address}/deezer-proxy?q=${query}&limit=15`
        );
        setResults(respone.data.data);
      } catch (error) {
        console.error("Error searching music:", error);
      }
    };
    fetchSongs();
  }, [query]);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await axios.get(
          `http://${address}/deezer-search-song?trackId=${selectedSongId}`
        );
        setSong(response.data);
      } catch (error) {
        console.error("Error searching music:", error);
      }
    };
    fetchSong();
  }, [selectedSongId]);

  const stopPreviousSound = async () => {
    if (sound) {
      console.log("Stopping previous sound...");
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
      setIsPlaying(false);
    }
  };

  const playSound = async () => {
    if (!song) return;

    try {
      await stopPreviousSound();
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: song },
        { shouldPlay: true }
      );

      setSound(newSound);
      setIsPlaying(true);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
          newSound.unloadAsync();
          setSound(null);
        }
      });

      await newSound.playAsync();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  const pauseSound = async () => {
    if (sound) {
      setIsPlaying(false);
      await sound.pauseAsync();
    }
  };

  useEffect(() => {
    stopPreviousSound();
  }, [onCloseSignal]);

  const togglePlayPause = () => {
    if (!isPlaying) {
      playSound();
    } else {
      pauseSound();
    }
  };

  {
    /*
    if (!results || results.length === 0) {
    return (
      <View style={{ flex: 1, height: "100%", width: "100%" }}>
        <ActivityIndicator
          size="small"
          style={{ flex: 1, height: "100%", width: "100%" }}
        />
      </View>
    );
  }
    */
  }

  return (
    <View style={[styles.container]}>
      <View
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <View
          style={{
            width: 40,
            height: 5,
            borderRadius: 10,
            backgroundColor: "rgb(192, 192, 192)",
            marginTop: -10,
          }}
        ></View>
      </View>

      <View
        style={[
          styles.nestedContainer,
          {
            position: "relative",
            paddingHorizontal: 2,
          },
        ]}
      >
        <TextInput
          style={[
            styles.searchBar,
            {
              backgroundColor: colorMode === "light" ? "#E4E3E8" : "#1C1C1E",
              color: colorMode === "light" ? "black" : "white",
              borderColor: colorMode === "light" ? "#F0F0F0" : "#121212",
            },
          ]}
          placeholder="Search song"
          placeholderTextColor={colorMode === "light" ? "#494949" : "#97989F"}
          value={query}
          onChangeText={setQuery}
        />
        <View style={{ position: "absolute", top: 10, left: 12 }}>
          <SearchIconOutline
            size={18}
            color={colorMode === "light" ? "black" : "white"}
          />
        </View>
      </View>

      <ScrollView>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
            marginTop: 10,
          }}
        >
          {results.map((song) => (
            <Pressable
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                backgroundColor: selectedSongId === song.id ? songBg : "",
                borderRadius: 6,
                padding: 12,
                alignItems: "center",
              }}
              key={song.id}
              onPress={() => {
                setSelectedSongId(song.id);
                onSelectSong(song);
                if (isPlaying) stopPreviousSound();
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Image
                  source={{ uri: song.album.cover }}
                  style={{ width: 60, height: 60, borderRadius: 6 }}
                />
                <View style={{ display: "flex", flexDirection: "column" }}>
                  <Text
                    style={{
                      color: textColor,
                      fontSize: 16,
                      fontWeight: 700,
                      width: 200,
                    }}
                    numberOfLines={1}
                  >
                    {song.title}
                  </Text>
                  <Text
                    style={{
                      color: textColor,
                      fontSize: 14,
                    }}
                  >
                    {song.artist.name}
                  </Text>
                </View>
              </View>
              <View style={{ marginRight: 5 }}>
                {selectedSongId === song.id && (
                  <View>
                    <Pressable onPress={togglePlayPause}>
                      {isPlaying ? (
                        <PauseIcon size={20} color={textColor} />
                      ) : (
                        <PlayIcon size={20} color={textColor} />
                      )}
                    </Pressable>
                  </View>
                )}
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
  },
  nestedContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    paddingHorizontal: 2,
  },
  searchBar: {
    padding: 10,
    borderRadius: 14,
    fontWeight: 400,
    fontSize: 16,
    paddingLeft: 36,
    width: "100%",
  },
});

export default MusicTimeline;
