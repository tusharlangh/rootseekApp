import { View, Text, StyleSheet, Dimensions } from "react-native";
import Backdrop from "./backdrop";
import { theme } from "../../../theme";
import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { PhoneContext } from "../../../App";
import HighlightedText from "./highlightedText";
import ThreeDotLoader from "../../loadingScreen/threeDotLoading";

const GrowthTrace = () => {
  const { usePhone } = useContext(PhoneContext);
  const address = usePhone ? "192.168.1.80:5002" : "localhost:5002";

  const [result, setResult] = useState("");

  useEffect(() => {
    const fetchTraces = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        const response = await axios.get(
          `http://${address}/posts/growth-trace`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setResult(response.data.trace);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTraces();
  }, []);

  return (
    <Backdrop>
      <View style={styles.container}>
        <View style={styles.growthTraceDimension}>
          <Text style={styles.headerText}>
            Has something about you have changed? Lets figure out
          </Text>

          {result ? (
            <HighlightedText content={result.trace} />
          ) : (
            <View style={styles.threeDotLoadingContainer}>
              <ThreeDotLoader />
            </View>
          )}
        </View>
      </View>
    </Backdrop>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 400,
    justifyContent: "center",
    alignItems: "center",
  },
  growthTraceDimension: {
    backgroundColor: theme.create_screen.growth_trace.growthTraceDimension,
    width: 300,
    borderRadius: 20,
    padding: 16,
  },
  headerText: {
    color: theme.create_screen.growth_trace.header_text,
    fontSize: 16,
    fontWeight: "700",
    zIndex: 1000,
  },
  threeDotLoadingContainer: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GrowthTrace;
