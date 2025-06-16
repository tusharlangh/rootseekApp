import { Pressable, Text, View, StyleSheet } from "react-native";

const ThemeThreadPosts = ({
  posts,
  setSelectedTheme,
  setSelectedThemeText,
  getStoriesRaw,
}) => {
  return posts.map(([theme, value], index) => (
    <View
      key={index}
      style={[
        styles.postContainer,
        {
          backgroundColor:
            index === 0
              ? "rgb(14, 24, 11)"
              : index === 1
              ? "rgb(24, 23, 11)"
              : index === 2
              ? "rgb(18, 26, 40)"
              : "rgb(30, 18, 40)",
        },
      ]}
    >
      <Pressable
        onPress={() => {
          setSelectedTheme(value);
          setSelectedThemeText(theme);
          getStoriesRaw(value, theme);
        }}
      >
        <Text
          style={[
            styles.postTheme,
            {
              color:
                index === 0
                  ? "rgb(156, 175, 150)"
                  : index === 1
                  ? "rgb(156, 152, 114)"
                  : index === 2
                  ? "rgb(105, 135, 188)"
                  : "rgb(138, 102, 168)",
            },
          ]}
        >
          {theme}
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
