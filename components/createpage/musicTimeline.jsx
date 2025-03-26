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

const MusicTimeline = ({ onSelectSong }) => {
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "black" : "white";
  const songBg = useColorMode === "light" ? "#EEEEEE" : "#2A2A2A";

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
        console.log("Fetched song URL:", response.data); // Debugging log
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
      <View style={{ height: "100%", width: "100%" }}>
        <ActivityIndicator
          size="small"
          style={{ height: "100%", width: "100%" }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.nestedContainer}>
        <TextInput
          style={[
            styles.searchBar,
            {
              backgroundColor: colorMode === "light" ? "#F9F9F9" : "#181818",
              color: textColor,
              borderColor: colorMode === "light" ? "#F0F0F0" : "#121212",
            },
          ]}
          placeholder="Search root"
          placeholderTextColor={textColor}
          value={query}
          onChangeText={setQuery}
        />
        <View style={{ position: "absolute", top: 11.5, left: 12 }}>
          <SearchIconOutline size={22} color={textColor} />
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
                  style={{ width: 50, height: 50, borderRadius: 6 }}
                />
                <View style={{ display: "flex", flexDirection: "column" }}>
                  <Text
                    style={{ color: textColor, fontSize: 14, fontWeight: 700 }}
                  >
                    {song.title}
                  </Text>
                  <Text style={{ color: textColor, fontSize: 12 }}>
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
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    fontWeight: 500,
    borderWidth: 1,
    fontSize: 16,
    paddingLeft: 36,
  },
});

export default MusicTimeline;
