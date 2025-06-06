import { View, Text, StyleSheet } from "react-native";
import {
  PatternInsightsIcon,
  RecentlyMadeIcon,
  RightArrow,
  ThreadThemeIcon,
} from "../icons";

const Header = ({ headerText, headerIcon }) => {
  const icons = {
    recentlyMade: <RecentlyMadeIcon color="white" size={22} />,
    patternInsights: <PatternInsightsIcon color="white" size={22} />,
    themeThreadView: <ThreadThemeIcon color="white" size={22} />,
  };

  return (
    <View style={stylesheet.container}>
      <View style={stylesheet.headerIconAndTextContainer}>
        <View>{icons[headerIcon]}</View>
        <Text style={stylesheet.headerText}>{headerText}</Text>
      </View>

      <View style={stylesheet.RightArrowContainer}>
        <View style={{ marginLeft: 1 }}>
          <RightArrow color="white" size={16} strokeWidth={5} />
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
    color: "white",
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
    backgroundColor: "rgb(24,24,24)",
    padding: 5,
    borderRadius: 20,
  },
});

export default Header;
