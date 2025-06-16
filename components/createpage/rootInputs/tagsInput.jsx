import { BlurView } from "expo-blur";
import { StyleSheet, View } from "react-native";
import { Pressable, Text } from "react-native";
import { Hashtag } from "../../icons";
import { useContext } from "react";
import { RootCreationContext } from "../create";
import { theme } from "../../../theme";

const TagsInput = ({ setIsTagsOpen }) => {
  const { tags, setTags } = useContext(RootCreationContext);

  const getTags = (tags) => {
    const t = tags.split("#").filter((h) => h.length > 0);
    return t;
  };
  return (
    <BlurView intensity={50} tint="default" style={[styles.blurCard]}>
      <Pressable
        style={styles.selectionButton}
        onPress={() => setIsTagsOpen(true)}
      >
        <Text style={[styles.directionTitle]}>Tags</Text>
        <Text style={[styles.directionText]}>Add tags for easy lookup</Text>
        <BlurView
          intensity={0}
          tint={"extraLight"}
          style={[styles.blurNestedContainer]}
        >
          {tags ? (
            <View>
              {getTags(tags).map((tag, index) => (
                <Text style={styles.tags_text} numberOfLines={1} key={index}>
                  #{tag}
                </Text>
              ))}
            </View>
          ) : (
            <Hashtag
              size={50}
              color={theme.create_screen.tags_input.tags_text}
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
    backgroundColor: theme.create_screen.tags_input.blur_card,
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
    color: theme.create_screen.tags_input.direction_title,
  },
  directionText: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: 600,
    color: theme.create_screen.tags_input.direction_text,
  },
  blurNestedContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    width: "80%",
    padding: 10,
    borderRadius: 30,
    marginTop: 10,
    backgroundColor: theme.create_screen.tags_input.blur_nested_container,
  },
  tags_text: {
    color: theme.create_screen.tags_input.tags_text,
  },
});

export default TagsInput;
