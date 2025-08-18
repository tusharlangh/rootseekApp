import { Text, View } from "react-native";
import { theme } from "../../../theme";
import { SafeAreaView } from "react-native-safe-area-context";

const MockUp = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.main_background }}
      edges={["top", "left", "right"]}
    >
      <View style={{ flex: 1, backgroundColor: theme.main_background }}>
        <Text style={{ color: "white", fontSize: 30, alignSelf: "center" }}>
          Technology
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default MockUp;
