import { useColorMode } from "native-base";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  PlayIcon,
  PauseIcon,
  SearchIconOutline,
  FilterIcon,
} from "../../icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Audio } from "expo-av";
import { PhoneContext } from "../../../App";
import { RootCreationContext } from "../create";
import RootBottomSheet from "../../rootBottomSheet";
import { theme } from "../../../theme";

const { height, width } = Dimensions.get("window");

const TrackBottomSheet = ({ isTrackOpen, setIsTrackOpen }) => {
  const { usePhone } = useContext(PhoneContext);
  const { selectedSong, setSelectedSong } = useContext(RootCreationContext);

  const songBg = "rgba(255,255,255,0.25)";

  const address = usePhone ? "192.168.1.80:5002" : "localhost:5002";

  const { colorMode } = useColorMode();

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
          `http://${address}/search-deezer/deezer-proxy?q=${query}&limit=15`
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
          `http://${address}/single-deezer/deezer-search-song?trackId=${selectedSongId}`
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
    <RootBottomSheet
      snapHeight="88%"
      isBottomSheetOpen={isTrackOpen}
      setIsBottomSheetOpen={setIsTrackOpen}
      enablePanDownToClose={true}
    >
      <View style={[styles.container]}>
        <View>
          <View style={styles.searchIcon}>
            <SearchIconOutline
              color={theme.create_screen.track_bottomsheet.search_text}
              size={20}
            />
          </View>
          <TextInput
            placeholder="Search music"
            placeholderTextColor={
              theme.create_screen.track_bottomsheet.search_text
            }
            style={[styles.searchBarInput]}
            value={query}
            onChangeText={setQuery}
          />
        </View>

        <View style={{ marginTop: 10 }}>
          <ScrollView
            style={{ height: height * 0.75 }}
            contentContainerStyle={{}}
          >
            {results.map((song) => (
              <TouchableOpacity
                style={[
                  styles.individualSongContainer,
                  {
                    backgroundColor: selectedSongId === song.id ? songBg : "",
                  },
                ]}
                key={song.id}
                onPress={() => {
                  setSelectedSongId(song.id);
                  setSelectedSong(song);
                  if (isPlaying) stopPreviousSound();
                }}
              >
                <View style={styles.trackContainer}>
                  <Image
                    source={{ uri: song.album.cover }}
                    style={styles.trackCover}
                  />
                  <View>
                    <Text style={styles.trackTitle} numberOfLines={1}>
                      {song.title}
                    </Text>
                    <Text style={styles.trackArtist}>{song.artist.name}</Text>
                  </View>
                </View>
                <View style={{ marginRight: 5 }}>
                  {selectedSongId === song.id && (
                    <View>
                      <TouchableOpacity onPress={togglePlayPause}>
                        {isPlaying ? (
                          <PauseIcon
                            size={20}
                            color={
                              theme.create_screen.track_bottomsheet
                                .pause_and_play_icon
                            }
                          />
                        ) : (
                          <PlayIcon
                            size={20}
                            color={
                              theme.create_screen.track_bottomsheet
                                .pause_and_play_icon
                            }
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </RootBottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    padding: 10,
    flex: 1,
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
  searchIcon: {
    position: "absolute",
    top: 20,
    left: 10,
    zIndex: 10,
  },
  searchBarInput: {
    height: 40,
    borderRadius: 10,
    backgroundColor: theme.create_screen.track_bottomsheet.search_bg,
    fontSize: 17,
    marginTop: 10,
    paddingLeft: 36,
    color: theme.create_screen.track_bottomsheet.search_text,
    fontWeight: "400",
  },
  individualSongContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: 6,
    padding: 10,
    alignItems: "center",
  },
  trackContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  trackCover: {
    width: 50,
    height: 50,
  },
  trackTitle: {
    color: theme.create_screen.track_bottomsheet.track_title,
    fontSize: 16,
    fontWeight: "600",
    maxWidth: 240,
  },
  trackArtist: {
    color: theme.create_screen.track_bottomsheet.track_artist,
    fontSize: 14,
  },
});

export default TrackBottomSheet;
