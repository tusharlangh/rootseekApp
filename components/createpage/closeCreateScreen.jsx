import { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { theme } from "../../theme";

const CloseCreateScreen = ({
  isClose,
  setIsClose,
  handleClose,
  popUpAnimation,
}) => {
  const popUp = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        popUpAnimation.value,
        [0, 1],
        [0, 1],
        Extrapolation.CLAMP
      ),
      transform: [
        {
          scale: interpolate(
            popUpAnimation.value,
            [0, 1],
            [0, 1],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.container, popUp]}>
      <TouchableOpacity style={styles.pressableContainer} onPress={handleClose}>
        <Text style={styles.pressableText}>Delete Root</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.pressableContainer}
        onPress={() => setIsClose(false)}
      >
        <Text style={styles.pressableText}>Cancel</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.create_screen.close_create_screen.container,
    borderRadius: 30,
    position: "absolute",
    top: 0,
    left: 10,
    gap: 10,
    padding: 12,
    zIndex: 1100,
  },
  pressableContainer: {
    backgroundColor:
      theme.create_screen.close_create_screen.pressable_container,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  pressableText: {
    fontSize: 16,
    color: theme.create_screen.close_create_screen.pressable_text,
  },
});

export default CloseCreateScreen;
