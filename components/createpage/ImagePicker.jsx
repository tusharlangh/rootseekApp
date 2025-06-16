import * as ImagePicker from "expo-image-picker";
import { useContext } from "react";
import { Platform } from "react-native";
import { RootCreationContext } from "./create";

const pickImage = async (setPicture) => {
  if (Platform.OS !== "web") {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }
  }

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 5],
    quality: 1,
  });

  if (!result.canceled) {
    setPicture(result.assets[0].uri);
  }
};

export default pickImage;
