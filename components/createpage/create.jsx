import { View, StyleSheet } from "react-native";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { PhoneContext } from "../../App";
import Header from "./header";
import DisplayImage from "./displayImage";
import RootForm from "./rootForm";

export const RootCreationContext = createContext(null);

const Create = ({ isBottomSheetOpen, onClose }) => {
  const { usePhone } = useContext(PhoneContext);

  const address = usePhone ? "192.168.1.80:5002" : "localhost:5002";

  const [picture, setPicture] = useState(null);
  const [selectedSong, setSelectedSong] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");
  const [creating, setCreating] = useState(false);
  const [tags, setTags] = useState("");
  const [send, setSend] = useState(false);

  useEffect(() => {
    if (!isBottomSheetOpen) {
      setPicture(null);
      setSelectedSong({});
      setTitle("");
      setContent("");
      setMood("");
      setCreating(false);
      setTags("");
      setSend(false);
    }
  }, [isBottomSheetOpen]);

  const handleClose = useCallback(() => {
    onClose();
  }, []);

  useEffect(() => {
    if (content && title) {
      setSend(true);
    } else {
      setSend(false);
    }
  });

  const createRoot = async () => {
    if (!send) {
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
    formData.append("hashTags", tags);

    if (picture) {
      formData.append("image", {
        uri: picture,
        name: "image.jpg",
        type: "image/jpeg",
      });
    }

    try {
      const token = await AsyncStorage.getItem("token");
      await axios.post(`http://${address}/user/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      handleClose();
      setPicture(null);
      setSelectedSong({});
      setTitle("");
      setContent("");
      setMood("");
      setCreating(false);
      setTags("");
      setSend(false);
    } catch (error) {
      console.error(error);
    } finally {
      setCreating(false);
    }
  };

  return (
    <RootCreationContext.Provider
      value={{
        title,
        setTitle,
        content,
        setContent,
        selectedSong,
        setSelectedSong,
        tags,
        setTags,
        picture,
        setPicture,
        isBottomSheetOpen,
      }}
    >
      <View style={[styles.container]}>
        <DisplayImage picture={picture} />

        <Header
          creating={creating}
          createRoot={createRoot}
          handleClose={handleClose}
          send={send}
        />

        <View style={styles.content}>
          <RootForm />
        </View>
      </View>
    </RootCreationContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    //backgroundColor: theme.main_background,
  },
  content: {
    flex: 1,
  },
});

export default Create;
