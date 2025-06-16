import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";

import { useContext, useEffect, useState } from "react";
import pickImage from "./ImagePicker";
import { BlurView } from "expo-blur";

import { theme } from "../../theme";
import TitleInput from "./rootInputs/titleInput";
import ContentInput from "./rootInputs/contentInput";
import TrackInput from "./rootInputs/trackInput";
import TagsInput from "./rootInputs/tagsInput";
import ContentBottomSheet from "./rootBottomSheets/contentBottomSheet";
import TrackBottomSheet from "./rootBottomSheets/trackBottomSheet";
import TagsBottomSheet from "./rootBottomSheets/tagsBottomSheet";
import { RootCreationContext } from "./create";

const { height, width } = Dimensions.get("window");

const RootForm = () => {
  const [isContentOpen, setIsContentOpen] = useState(false);
  const [isTrackOpen, setIsTrackOpen] = useState(false);
  const [isTagsOpen, setIsTagsOpen] = useState(false);

  const { setPicture } = useContext(RootCreationContext);

  const openPickImage = () => {
    pickImage(setPicture);
  };

  return (
    <View>
      <View>
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.imageButton}>
            <Pressable style={styles.addImageContainer} onPress={openPickImage}>
              <View style={styles.imageContainer}>
                <BlurView intensity={50} tint="default" style={{ padding: 8 }}>
                  <Text style={[styles.addImageText]}>Add Image</Text>
                </BlurView>
              </View>
            </Pressable>
          </View>
          <BlurView
            intensity={80}
            tint={"dark"}
            style={[styles.backgroundBlur]}
          >
            <TitleInput />
            <ContentInput setIsContentOpen={setIsContentOpen} />
            <TrackInput setIsTrackOpen={setIsTrackOpen} />
            <TagsInput setIsTagsOpen={setIsTagsOpen} />
            <View
              style={{ height: height - 844 > 0 ? height - 844 : 0 }}
            ></View>
          </BlurView>
        </ScrollView>
      </View>

      <ContentBottomSheet
        isContentOpen={isContentOpen}
        setIsContentOpen={setIsContentOpen}
      />

      <TrackBottomSheet
        isTrackOpen={isTrackOpen}
        setIsTrackOpen={setIsTrackOpen}
      />

      <TagsBottomSheet isTagsOpen={isTagsOpen} setIsTagsOpen={setIsTagsOpen} />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 320,
    height,
  },
  backgroundBlur: {
    borderRadius: 30,
    overflow: "hidden",
    padding: 12,
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: theme.create_screen.root_form.background_blur,
  },
  addImageContainer: {
    borderRadius: 20,
    overflow: "hidden",
    marginLeft: 10,
  },
  addImageText: {
    color: theme.create_screen.root_form.add_image_text,
    fontWeight: "bold",
    fontSize: 15,
  },
  imageContainer: {
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: theme.create_screen.root_form.image_container,
  },
  imageButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});

export default RootForm;
