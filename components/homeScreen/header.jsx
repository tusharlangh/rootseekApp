import { View, Text, StyleSheet } from "react-native";
import {
  PatternInsightsIcon,
  RecentlyMadeIcon,
  RightArrow,
  ThreadThemeIcon,
} from "../icons";
import { theme } from "../../theme";

const Header = ({ headerText, headerIcon }) => {
  const defaultColor = theme.home_screen.header.default_icon;

  const icons = {
    recentlyMade: <RecentlyMadeIcon color={defaultColor} size={20} />,
    patternInsights: <PatternInsightsIcon color={defaultColor} size={22} />,
    themeThreadView: <ThreadThemeIcon color={defaultColor} size={22} />,
  };

  return (
    <View style={stylesheet.container}>
      <View style={stylesheet.headerIconAndTextContainer}>
        <View>{icons[headerIcon]}</View>
        <Text style={stylesheet.headerText}>{headerText}</Text>
      </View>

      <View style={stylesheet.RightArrowContainer}>
        <View style={{ marginLeft: 1 }}>
          <RightArrow color={defaultColor} size={16} strokeWidth={5} />
        </View>
      </View>
    </View>
  );
};

const stylesheet = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 6,
    paddingLeft: 10,
  },
  headerText: {
    color: theme.home_screen.header.header_text,
    fontWeight: "700",
    fontSize: 22,
  },
  headerIconAndTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  RightArrowContainer: {
    marginRight: 10,
    backgroundColor: theme.home_screen.header.right_arrow_container,
    padding: 5,
    borderRadius: 20,
  },
});

export default Header;
