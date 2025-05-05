import {
  Animated,
  Dimensions,
  PanResponder,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Pressable,
  Text,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { ScrollView, useColorMode } from "native-base";
import { BlurView } from "expo-blur";
import { LeftArrowIcon } from "./icons";

const SwipePage = ({ children, isModalVisible, setIsModalVisible, title }) => {
  const { width, height: SCREEN_HEIGHT } = Dimensions.get("window");

  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "black" : "white";
  const bgColor = colorMode === "light" ? "#F7F7F9" : "black";

  useEffect(() => {
    if (isModalVisible) {
      resetPositionAnim.start();
    }
  }, [isModalVisible]);

  const panX = useRef(new Animated.Value(width)).current; // Start off-screen at bottom

  const resetPositionAnim = Animated.timing(panX, {
    toValue: 0,
    duration: 200,
    useNativeDriver: true,
  });

  const closeAnim = Animated.timing(panX, {
    toValue: width,
    duration: 200,
    useNativeDriver: true,
  });

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 20;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx > 0) {
          panX.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 150) {
          // Threshold to close
          closeModal();
        } else {
          resetPositionAnim.start();
        }
      },
    })
  ).current;

  const animatedBackground = {
    backgroundColor: panX.interpolate({
      inputRange: [0, SCREEN_HEIGHT],
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
    closeAnim.start(() => {
      setIsModalVisible(false);
    });
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
              height: "100%",
              transform: [{ translateX: panX }],
              backgroundColor:
                colorMode === "light" ? "rgba()" : "rgba(0,0,0,0.4)",
            },
          ]}
          {...panResponders.panHandlers}
        >
          <View
            style={[
              styles.modalContainer,
              {
                height: "100%",
                backgroundColor: bgColor,
              },
            ]}
          >
            <View
              style={{
                paddingTop: 60,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Pressable onPress={closeModal} style={{ paddingLeft: 16 }}>
                <LeftArrowIcon size={24} color={textColor} />
              </Pressable>
              <Text style={{ fontSize: 20, fontWeight: 600, marginRight: 42 }}>
                {title}
              </Text>
              <Text></Text>
            </View>
            <View style={styles.modalContent}>{children}</View>
          </View>
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
  modalContainer: {},

  modalContent: {
    paddingBottom: 20,
    height: "100%",
  },
});

export default SwipePage;
