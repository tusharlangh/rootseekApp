import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CloseIcon } from "../icons";
import { BlurView } from "expo-blur";
import { theme } from "../../theme";
import { useContext, useEffect, useState } from "react";
import CloseCreateScreen from "./closeCreateScreen";
import Animated, {
  useSharedValue,
  withTiming,
  Extrapolation,
  useAnimatedStyle,
  interpolate,
  withSpring,
} from "react-native-reanimated";
import { RootCreationContext } from "./create";

const Header = ({ creating, createRoot, handleClose, send }) => {
  const { isBottomSheetOpen } = useContext(RootCreationContext);

  const [isClose, setIsClose] = useState(false);

  useEffect(() => {
    if (!isBottomSheetOpen) setIsClose(false);
  }, [isBottomSheetOpen]);

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  const popUpAnimation = useSharedValue(0);

  useEffect(() => {
    if (isClose) popUpAnimation.value = withTiming(1);
    else popUpAnimation.value = withTiming(0);
  }, [isClose]);

  const closeButton = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        popUpAnimation.value,
        [0, 1],
        [1, 0],
        Extrapolation.CLAMP
      ),
      transform: [
        {
          scale: interpolate(
            popUpAnimation.value,
            [0, 1],
            [1, 0],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <View style={[styles.headerContainer]}>
      <AnimatedPressable
        style={[styles.closeButton, closeButton]}
        onPress={() => setIsClose(true)}
      >
        <CloseIcon
          size={22}
          color={theme.create_screen.header.create_button_text}
        />
      </AnimatedPressable>
      <BlurView
        intensity={50}
        tint="systemChromeMaterialLight"
        style={styles.createButtonContainer}
      >
        <TouchableOpacity
          style={[styles.createButton]}
          onPress={() => createRoot()}
        >
          <Text style={[styles.createButtonText, { opacity: send ? 1 : 0.3 }]}>
            {creating ? "Creating" : "Create"}
          </Text>
        </TouchableOpacity>
      </BlurView>

      <CloseCreateScreen
        isClose={isClose}
        setIsClose={setIsClose}
        handleClose={handleClose}
        popUpAnimation={popUpAnimation}
      />
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
    zIndex: 1050,
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
    zIndex: 1050,
  },
});

export default Header;
