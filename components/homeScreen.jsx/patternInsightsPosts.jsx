import { Text, View, StyleSheet } from "react-native";

const PatternInsightsPosts = ({ posts }) => {
  return posts.map((item, index) => (
    <View key={index} style={styles.postContainer}>
      <Text style={styles.patternTitle}>{item.title}</Text>
      <Text style={styles.patternData}>{item.data}</Text>
    </View>
  ));
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: "rgb(24, 24, 24)",
    padding: 16,
    borderRadius: 20,
    width: 260,
  },
  patternTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  patternData: {
    color: "rgb(143, 143, 143)",
    fontSize: 14,
    marginTop: 4,
  },
});

export default PatternInsightsPosts;
