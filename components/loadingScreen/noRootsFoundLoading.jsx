import { View, Text, Dimensions, StyleSheet } from "react-native";
import { theme } from "../../theme";

const { height, width } = Dimensions.get("window");

const NoRootsFoundLoading = ({ subText }) => (
  <View
    style={{
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      height: height / 2,
      gap: 4,
    }}
  >
    <Text style={styles.noRootText1}>No roots found</Text>
    <Text style={styles.noRootText2}>{subText}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    height: height / 2,
    gap: 4,
  },
  noRootText1: {
    color: theme.loading_screen.no_roots_found_loading.no_root_text,
    fontSize: 20,
    fontWeight: "600",
  },
  noRootText2: {
    color: theme.loading_screen.no_roots_found_loading.no_root_text,
    fontSize: 12,
  },
});

export default NoRootsFoundLoading;
