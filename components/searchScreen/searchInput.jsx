import { Pressable, TextInput, View, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { FilterIcon, SearchIcon, SearchIconOutline } from "../icons";
import { theme } from "../../theme";

const SearchInput = ({ stickyStyle, stickyShadow, search, setSearch }) => {
  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  return (
    <Animated.View style={[styles.stickySearchBar, stickyStyle]}>
      <View style={styles.searchIcon}>
        <SearchIconOutline
          color={theme.sticky_search.search_input.search_text}
          size={20}
        />
      </View>
      <AnimatedPressable style={styles.filterIcon}>
        <FilterIcon color="white" size={24} />
      </AnimatedPressable>
      <AnimatedTextInput
        placeholder="Search root"
        placeholderTextColor={theme.sticky_search.search_input.search_text}
        style={[styles.searchBarInput]}
        value={search}
        onChangeText={setSearch}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  stickySearchBar: {
    position: "absolute",
    top: 0,
    left: 10,
    right: 10,
    zIndex: 1000,
  },
  searchIcon: {
    position: "absolute",
    top: 20,
    left: 10,
    zIndex: 10,
  },
  filterIcon: {
    position: "absolute",
    top: 14,
    right: 0,
    zIndex: 10,
    padding: 4,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchBarInput: {
    height: 40,
    borderRadius: 10,
    backgroundColor: theme.sticky_search.search_input.search_bg,
    fontSize: 17,
    marginTop: 10,
    paddingLeft: 36,
    color: theme.sticky_search.search_input.search_bg.search_text,
    fontWeight: "400",
  },
});

export default SearchInput;
