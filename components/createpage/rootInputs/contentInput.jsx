import { BlurView } from "expo-blur";
import { Pressable, StyleSheet, Text } from "react-native";
import { theme } from "../../../theme";
import { useContext } from "react";
import { RootCreationContext } from "../create";

const ContentInput = ({ setIsContentOpen }) => {
  const { content } = useContext(RootCreationContext);
  return (
    <BlurView intensity={50} tint="default" style={[styles.blurCard]}>
      <Pressable onPress={() => setIsContentOpen(true)}>
        {content ? (
          <Text style={styles.contentText}>{content}</Text>
        ) : (
          <Text style={styles.contentTextInput}>Add a content.</Text>
        )}
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
    backgroundColor: theme.create_screen.content_input.blur_card,
  },
  contentTextInput: {
    color: theme.create_screen.content_input.content_text_input,
    textAlign: "center",
    fontSize: 16,
    fontWeight: 600,
  },
  contentText: {
    color: theme.create_screen.content_input.content_text,
    textAlign: "center",
    fontSize: 14,
    fontWeight: 400,
  },
});

export default ContentInput;
