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
} from "react-native";
import { PlayIcon, PauseIcon, SearchIconOutline } from "../icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { Audio } from "expo-av";

const MusicTimeline = ({ onSelectSong, setShowMusic }) => {
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "black" : "white";
  const songBg = colorMode === "light" ? "white" : "#161618";
  const bgColor = colorMode === "light" ? "#F2F1F5" : "black";

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
          `http://localhost:5002/deezer-proxy?q=${query}&limit=12`
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

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Pressable
        style={{
          borderRadius: 10,
        }}
        onPress={() => setShowMusic(false)}
      >
        <Text
          style={{
            color: textColor,
            textAlign: "right",
            fontSize: 20,
            fontWeight: "700",
            marginBottom: 20,
          }}
        >
          Done
        </Text>
      </Pressable>

      <View
        style={[
          styles.nestedContainer,
          { position: "relative", paddingHorizontal: 2 },
        ]}
      >
        <TextInput
          style={[
            styles.searchBar,
            {
              backgroundColor: colorMode === "light" ? "#E4E3E8" : "#1C1C1E",
              color: textColor,
              borderColor: colorMode === "light" ? "#F0F0F0" : "#121212",
            },
          ]}
          placeholder="Search song"
          placeholderTextColor={colorMode === "light" ? "#494949" : "#97989F"}
          value={query}
          onChangeText={setQuery}
        />
        <View style={{ position: "absolute", top: 11, left: 12 }}>
          <SearchIconOutline
            size={26}
            color={colorMode === "light" ? "#848388" : "#97989F"}
          />
        </View>
      </View>

      <ScrollView>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginTop: 10,
            paddingHorizontal: 8,
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
                padding: 8,
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
                    style={{ color: textColor, fontSize: 18, fontWeight: 700 }}
                  >
                    {song.title}
                  </Text>
                  <Text style={{ color: textColor, fontSize: 16 }}>
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
    paddingHorizontal: 4,
  },
  searchBar: {
    padding: 12,
    borderRadius: 10,
    fontWeight: 400,
    fontSize: 20,
    paddingLeft: 40,
  },
});

export default MusicTimeline;
