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
import { useEffect, useState } from "react";
import axios from "axios";
import { Audio } from "expo-av";
import { BlurView } from "expo-blur";

const MusicTimeline = ({ onSelectSong }) => {
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
          `http://localhost:5002/deezer-proxy?q=${query}&limit=16`
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
          `http://localhost:5002/deezer-search-song?trackId=${selectedSongId}`
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: 2,
            width: 40,
            backgroundColor:
              colorMode === "light"
                ? "rgba(172, 172, 172, 0.9)"
                : "rgba(38, 43, 43, 0.1)",
            marginBottom: 20,
            borderRadius: 10,
          }}
        ></View>
      </View>

      <BlurView
        style={[
          styles.nestedContainer,
          {
            position: "relative",
            paddingHorizontal: 2,
            borderRadius: 12,
            backgroundColor:
              colorMode === "light"
                ? "rgba(255,255,255,0.8)"
                : "rgba(0, 0, 0, 0.7)",
          },
        ]}
      >
        <TextInput
          style={[
            styles.searchBar,
            {
              color: textColor,
            },
          ]}
          placeholder="Search song"
          placeholderTextColor={textColor}
          value={query}
          onChangeText={setQuery}
        />
        <View style={{ position: "absolute", top: 9, left: 12 }}>
          <SearchIconOutline
            size={22}
            color={colorMode === "light" ? "#848388" : "#97989F"}
          />
        </View>
      </BlurView>

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
                  <Text style={{ color: textColor, fontSize: 14 }}>
                    {song.artist.name}
                  </Text>
                </View>
              </View>
              <View style={{ marginRight: 5 }}>
                {selectedSongId === song.id && (
                  <View>
                    <Pressable onPress={togglePlayPause}>
                      {isPlaying ? (
                        <PauseIcon size={24} color={textColor} />
                      ) : (
                        <PlayIcon size={24} color={textColor} />
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
    paddingHorizontal: 5,
    position: "relative",
    height: "100%",
  },
  nestedContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    paddingHorizontal: 4,
  },
  searchBar: {
    padding: 10,
    borderRadius: 10,
    fontWeight: 400,
    fontSize: 16,
    paddingLeft: 36,
    width: "100%",
  },
});

export default MusicTimeline;
