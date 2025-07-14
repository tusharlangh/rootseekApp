import { Text, View, StyleSheet } from "react-native";
import { theme } from "../../theme";

const PatternInsightsPosts = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return (
      <View
        style={{
          width: 300,
        }}
      >
        <Text style={{ color: "white" }}>
          No roots have been created for insights...
        </Text>
      </View>
    );
  }

  return posts.map((item, index) => (
    <View key={index} style={styles.postContainer}>
      <Text style={styles.patternTitle}>{item.title}</Text>
      <Text style={styles.patternData}>{item.data}</Text>
    </View>
  ));
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: theme.home_screen.pattern_insights.background,
    padding: 16,
    borderRadius: 20,
    width: 260,
  },
  patternTitle: {
    color: theme.home_screen.pattern_insights.pattern_title,
    fontSize: 16,
    fontWeight: "700",
  },
  patternData: {
    color: theme.home_screen.pattern_insights.pattern_data,
    fontSize: 14,
    marginTop: 4,
  },
});

export default PatternInsightsPosts;
