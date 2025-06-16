import { BlurView } from "expo-blur";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Music } from "../../icons";
import { theme } from "../../../theme";
import { useContext } from "react";
import { RootCreationContext } from "../create";

const TrackInput = ({ setIsTrackOpen }) => {
  const { selectedSong } = useContext(RootCreationContext);
  return (
    <BlurView intensity={50} tint="default" style={[styles.blurCard]}>
      <Pressable
        style={styles.selectionButton}
        onPress={() => setIsTrackOpen(true)}
      >
        <Text style={[styles.directionTitle]}>Add music</Text>
        <Text style={[styles.directionText]}>
          Add your music to express your memory
        </Text>
        <BlurView
          intensity={0}
          tint={"extraLight"}
          style={[styles.blurNestedContainer]}
        >
          {selectedSong.id ? (
            <View style={styles.trackContainer}>
              <Music
                size={20}
                color={theme.create_screen.track_input.track_text}
              />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.track_title} numberOfLines={1}>
                  {selectedSong.title}
                </Text>
                <Text style={styles.track_artist}>
                  {selectedSong.artist.name}
                </Text>
              </View>
            </View>
          ) : (
            <Music
              size={50}
              color={theme.create_screen.track_input.track_text}
            />
          )}
        </BlurView>
      </Pressable>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  blurCard: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginTop: 10,
    overflow: "hidden",
    borderRadius: 30,
    padding: 12,
    backgroundColor: theme.create_screen.track_input.blur_card,
  },
  selectionButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
  },
  directionTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: theme.create_screen.track_input.direction_title,
  },
  directionText: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: 600,
    color: theme.create_screen.track_input.direction_text,
  },
  blurNestedContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    width: "80%",
    borderRadius: 30,
    marginTop: 10,
    padding: 50,
    backgroundColor: theme.create_screen.track_input.blur_nested_container,
  },
  trackContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  track_title: {
    color: theme.create_screen.track_input.track_text,
    fontSize: 18,
    fontWeight: 700,
  },
  track_artist: {
    color: theme.create_screen.track_input.track_text,
    fontSize: 16,
  },
});

export default TrackInput;
