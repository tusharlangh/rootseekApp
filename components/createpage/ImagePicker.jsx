import * as ImagePicker from "expo-image-picker";
import { useEffect } from "react";
import {
  View,
  Image,
  Platform,
  Pressable,
  Text,
  Dimensions,
  StyleSheet,
} from "react-native";
import { PictureIcon } from "../icons";
import { useColorMode } from "native-base";

export default function ImagePickerExample({ picture, onSelectPicture }) {
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "black" : "white";
  const { width, height } = Dimensions.get("window");
  useEffect(() => {
    console.log(picture);
  });
  const pickImage = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
        return;
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onSelectPicture(result.assets[0].uri);
    }
  };

  return (
    <View style={{ height: "90%" }}>
      {picture ? (
        <View style={styles.container}>
          <Image
            source={{ uri: picture }}
            style={{
              width: width,
              height: height * 0.55,
              objectFit: "cover",
            }}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <PictureIcon size={150} />
          <Text style={[styles.infoText, { color: textColor }]}>
            Add a picture to emphasize your root
          </Text>
          <Pressable style={styles.picBtn} onPress={pickImage}>
            <Text style={styles.picBtnTxt}>Add a picture</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  infoText: {
    fontSize: 20,
    fontWeight: 500,
  },
  picBtn: {
    backgroundColor: "#49CDFD",
    borderRadius: 6,
    padding: 6,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  picBtnTxt: {
    color: "white",
    fontSize: 16,
    fontWeight: 500,
  },
});
