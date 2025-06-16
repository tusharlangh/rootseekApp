import { BlurView } from "expo-blur";
import { useContext } from "react";
import { TextInput, StyleSheet } from "react-native";
import { RootCreationContext } from "../create";
import { theme } from "../../../theme";

const TitleInput = () => {
  const { title, setTitle } = useContext(RootCreationContext);
  return (
    <BlurView intensity={50} tint="default" style={[styles.blurCard]}>
      <TextInput
        style={[styles.titleInput]}
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        placeholderTextColor={theme.create_screen.title_input.title_input}
        numberOfLines={1}
      />
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
    backgroundColor: theme.create_screen.title_input.blur_card,
  },
  titleInput: {
    textAlign: "center",
    color: "rgba(245, 245, 245, 0.9)",
    fontSize: 40,
    fontWeight: "600",
    borderRadius: 2,
    color: theme.create_screen.title_input.title_input,
  },
});

export default TitleInput;
