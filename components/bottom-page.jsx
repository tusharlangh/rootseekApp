import {
  Animated,
  Dimensions,
  PanResponder,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { useColorMode } from "native-base";
import { BlurView } from "expo-blur";

const BottomPage = ({ children, isModalVisible, setIsModalVisible }) => {
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
  const MODAL_HEIGHT = SCREEN_HEIGHT * 0.9;

  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "black" : "white";
  const bgColor = colorMode === "light" ? "#F2F1F5" : "black";

  useEffect(() => {
    if (isModalVisible) {
      resetPositionAnim.start();
    }
  }, [isModalVisible]);

  const panY = useRef(new Animated.Value(MODAL_HEIGHT)).current; // Start off-screen at bottom

  const resetPositionAnim = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeAnim = Animated.timing(panY, {
    toValue: MODAL_HEIGHT,
    duration: 100,
    useNativeDriver: true,
  });

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        // Only allow downward dragging
        if (gestureState.dy > 0) {
          panY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          // Threshold to close
          closeModal();
        } else {
          resetPositionAnim.start();
        }
      },
    })
  ).current;

  const animatedBackground = {
    backgroundColor: panY.interpolate({
      inputRange: [0, MODAL_HEIGHT],
      outputRange: ["rgba(0,0,0,0.6)", "rgba(0, 0, 0, 0)"],
      extrapolate: "clamp",
    }),
  };

  const toggleMusicModal = () => {
    if (isModalVisible) {
      closeModal();
    } else {
      setIsModalVisible(true);
      resetPositionAnim.start();
    }
  };

  const closeModal = () => {
    closeAnim.start(() => setIsModalVisible(false));
  };

  return (
    <Modal
      transparent
      visible={isModalVisible}
      onRequestClose={toggleMusicModal}
      animationType="fade"
    >
      <Animated.View style={[StyleSheet.absoluteFill, animatedBackground]}>
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={toggleMusicModal}
        />

        <Animated.View
          style={[
            styles.modalContainer,
            {
              height: MODAL_HEIGHT,
              transform: [{ translateY: panY }],
              backgroundColor:
                colorMode === "light" ? "rgba()" : "rgba(0,0,0,0.4)",
            },
          ]}
          {...panResponders.panHandlers}
        >
          <BlurView
            intensity={80}
            tint={colorMode === "light" ? "light" : "dark"}
            style={[
              styles.modalContainer,
              {
                height: MODAL_HEIGHT,
                backgroundColor:
                  colorMode === "light"
                    ? "rgba(242,241,245,0.9)"
                    : "rgba(0,0,0,0.9)",
              },
            ]}
          >
            <View style={styles.modalContent}>{children}</View>
          </BlurView>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
    paddingBottom: 0,
    overflow: "hidden",
  },

  modalIndicator: {
    width: 40,
    height: 5,
    backgroundColor: "#888",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 15,
  },
  modalContent: {
    paddingBottom: 20,
  },
});

export default BottomPage;
