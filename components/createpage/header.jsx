import { Pressable, StyleSheet, Text, View } from "react-native";
import { CloseIcon } from "../icons";
import { BlurView } from "expo-blur";
import { theme } from "../../theme";

const Header = ({ creating }) => {
  return (
    <View style={[styles.headerContainer]}>
      <Pressable style={[styles.closeButton]}>
        <CloseIcon
          size={22}
          color={theme.create_screen.header.create_button_text}
        />
      </Pressable>
      <BlurView
        intensity={50}
        tint="systemChromeMaterialLight"
        style={styles.createButtonContainer}
      >
        <Pressable
          style={[styles.createButton]}
          //onPress={createRoot}
        >
          <Text style={[styles.createButtonText]}>
            {creating ? "Creating" : "Create"}
          </Text>
        </Pressable>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    top: 55,
    right: 0,
    left: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 10,
    borderBottomColor: theme.create_screen.header.header_container,
  },
  createButtonContainer: {
    borderRadius: 30,
    overflow: "hidden",
    marginRight: 10,
    backgroundColor: theme.create_screen.header.create_button_container,
  },
  createButton: {
    padding: 6,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: theme.create_screen.header.create_button,
  },
  createButtonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    color: theme.create_screen.header.create_button_text,
  },
  closeButton: {
    marginLeft: 10,
    backgroundColor: theme.create_screen.header.close_button,
    padding: 6,
    borderRadius: 50,
  },
});

export default Header;
