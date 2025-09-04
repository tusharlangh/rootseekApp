import { Pressable, Text, View, StyleSheet } from "react-native";

const ThemeThreadPosts = ({ themeThreads, fetchThemeProgression }) => {
  if (!themeThreads || themeThreads.length === 0) {
    return (
      <View
        style={{
          width: 300,
        }}
      >
        <Text style={{ color: "white" }}>
          No roots have been created for theme thread...
        </Text>
      </View>
    );
  }

  return themeThreads.map((theme, index) => (
    <View
      key={index}
      style={[
        styles.postContainer,
        {
          backgroundColor: theme._theme_color,
        },
      ]}
    >
      <Pressable
        onPress={() => fetchThemeProgression(theme._theme, theme._theme_color)}
      >
        <Text
          style={[
            styles.postTheme,
            {
              color: "rgba(255,255,255,0.9)",
            },
          ]}
        >
          {theme._theme}
        </Text>
      </Pressable>
    </View>
  ));
};

const styles = StyleSheet.create({
  postContainer: {
    padding: 10,
    borderRadius: 10,
  },
  postTheme: {
    fontWeight: "700",
    fontSize: 16,
  },
});

export default ThemeThreadPosts;
