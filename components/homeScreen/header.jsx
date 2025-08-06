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
});

export default Header;
