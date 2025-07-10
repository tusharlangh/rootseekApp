import { View, StyleSheet, Dimensions, Pressable } from "react-native";
import { CloseIcon } from "../../icons";
import { theme } from "../../../theme";
import { useContext } from "react";
import { GrowthTraceContext } from "../../navbar";

const Backdrop = ({ children }) => {
  const { setGrowthTrace } = useContext(GrowthTraceContext);
  return (
    <View style={styles.absolute}>
      <View style={styles.closeBtnContainer}>
        <Pressable onPress={() => setGrowthTrace(false)}>
          <CloseIcon
            color={theme.create_screen.back_drop.close_icon_color}
            size={24}
          />
        </Pressable>
      </View>
      <View style={styles.container}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  absolute: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.create_screen.back_drop.absolute,
    zIndex: 2000,
  },
  closeBtnContainer: {
    position: "absolute",
    top: 50,
    right: 10,
    backgroundColor: theme.create_screen.back_drop.close_btn_container,
    padding: 4,
    borderRadius: 20,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default Backdrop;
