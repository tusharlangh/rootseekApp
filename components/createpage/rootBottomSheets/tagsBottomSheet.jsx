import { useContext } from "react";
import { RootCreationContext } from "../create";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { BlurView } from "expo-blur";
import RootBottomSheet from "../../rootBottomSheet";
import { theme } from "../../../theme";

const TagsBottomSheet = ({ isTagsOpen, setIsTagsOpen }) => {
  const { tags, setTags } = useContext(RootCreationContext);
  const count = tags.split("#").length - 1;
  function isAlphaWithHash(str) {
    return /^[A-Za-z#]+$/.test(str);
  }

  const handleTags = (tags) => {
    if (isAlphaWithHash(tags) || tags === "") {
      setTags(tags);
    }
  };

  return (
    <RootBottomSheet
      snapHeight="88%"
      isBottomSheetOpen={isTagsOpen}
      setIsBottomSheetOpen={setIsTagsOpen}
      enablePanDownToClose={true}
    >
      <View style={{ padding: 10, marginTop: 10 }}>
        <Text style={[styles.header]}>Enter tags:</Text>

        <BlurView style={[styles.inputContainer]}>
          <TextInput
            style={styles.tagsInput}
            placeholder="Please put '#' in front e.g. #rootseek..."
            placeholderTextColor={
              theme.create_screen.tags_bottomsheet.tags_input
            }
            multiline
            value={tags}
            onChangeText={(text) => {
              if (count <= 10 || text.length < tags.length) {
                handleTags(text);
              }
            }}
          />
        </BlurView>
        <View style={styles.counterContainer}>
          <Text style={[styles.counter]}>{count}</Text>
          <Text style={[styles.counter]}>/10</Text>
        </View>
      </View>
    </RootBottomSheet>
  );
};

const styles = StyleSheet.create({
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    height: 2,
    width: 40,
    marginBottom: 20,
    borderRadius: 10,
  },
  header: {
    fontWeight: "500",
    fontSize: 16,
    marginLeft: 10,
    color: theme.create_screen.tags_bottomsheet.header,
  },
  inputContainer: {
    marginTop: 4,
    padding: 12,
    height: 120, // Reduced height to fit properly
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: theme.create_screen.tags_bottomsheet.input_container,
  },
  counterContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginRight: 10,
    justifyContent: "flex-end",
  },
  counter: {
    fontSize: 16,
    color: theme.create_screen.tags_bottomsheet.counter,
  },
  tagsInput: {
    color: theme.create_screen.tags_bottomsheet.tags_input,
    fontSize: 15,
  },
});

export default TagsBottomSheet;
