import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pressable, View } from "react-native";
import { PauseIcon, PlayIcon } from "../icons";
import { useColorMode } from "native-base";
import { Audio } from "expo-av";

const PlayMusic = ({ trackId }) => {
  const [song, setSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "black" : "white";
  const [sound, setSound] = useState(null);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5002/deezer-search-song?trackId=${trackId}`
        );
        setSong(response.data);
        console.log("Fetched song URL:", response.data); // Debugging log
      } catch (error) {
        console.error("Error searching music:", error);
      }
    };
    fetchSong();
  }, [trackId]);

  const playSound = async () => {
    if (!song) return;

    try {
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

  return (
    <View>
      <Pressable onPress={togglePlayPause}>
        {isPlaying ? (
          <PauseIcon size={24} color={textColor} />
        ) : (
          <PlayIcon size={24} color={textColor} />
        )}
      </Pressable>
    </View>
  );
};

export default PlayMusic;
