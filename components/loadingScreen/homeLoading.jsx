import { View, Text, Dimensions } from "react-native";
import ThreeDotLoader from "./threeDotLoading";
import { theme } from "../../theme";

const { height, width } = Dimensions.get("window");

const HomeLoading = () => {
  return (
    <View
      style={{
        flex: 1,
        width,
        height,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.main_background,
      }}
    >
      <ThreeDotLoader />
    </View>
  );
};

export default HomeLoading;
