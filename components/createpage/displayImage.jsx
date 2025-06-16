import { Image, View, StyleSheet } from "react-native";

const DisplayImage = ({ picture }) => {
  return (
    <View style={styles.absolute}>
      <Image
        source={{ uri: picture }}
        style={[styles.backgroundImage]}
        resizeMode="top"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  absolute: {
    position: "absolute",
    top: 10,
    right: 0,
    left: 0,
    width: "100%",
  },
  backgroundImage: {
    width: "100%",
    height: 400,
    opacity: 0.9,
  },
});

export default DisplayImage;
