import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import Animated from "react-native-reanimated";
import { theme } from "../../theme";

const StickyOptions = ({
  stickyOptionsStyle,
  setSelectedFilter,
  selectedFilter,
}) => {
  const options = [
    {
      name: "All",
      id: "all",
    },
    {
      name: "Today",
      id: "today",
    },
    {
      name: "Week",
      id: "week",
    },
    {
      name: "Month",
      id: "month",
    },
    {
      name: "Year",
      id: "year",
    },
  ];

  return (
    <Animated.View
      style={[
        {
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 30,
          zIndex: 100,
        },
        stickyOptionsStyle,
      ]}
    >
      {options.map((option, index) => (
        <View
          key={index}
          style={[
            styles.singular_optionFilter,
            {
              backgroundColor:
                selectedFilter === option.id
                  ? theme.sticky_search.sticky_options
                      .singular_option_selected_bg
                  : theme.sticky_search.sticky_options
                      .singular_option_nonselected_bg,
            },
          ]}
        >
          <TouchableOpacity onPress={() => setSelectedFilter(option.id)}>
            <Text
              style={{
                color:
                  selectedFilter === option.id
                    ? theme.sticky_search.sticky_options
                        .singular_option_selected_text
                    : theme.sticky_search.sticky_options
                        .singular_option_nonselected_text,
                fontWeight: "600",
              }}
            >
              {option.name}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  singular_optionFilter: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: theme.sticky_search.sticky_options.singular_option_bg,
    shadowColor: "rgba(14, 14, 14, 1)",
    shadowRadius: 8,
    shadowOpacity: 1,
  },
});

export default StickyOptions;
