import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import RootBottomSheet from "../../rootBottomSheet";
import { CheckIcon } from "../../icons";
import { useContext, useState } from "react";
import { theme } from "../../../theme";
import { SelectedContext } from "./themeThread";

const Sort = ({ isSortBottomSheetOpen, setIsSortBottomSheetOpen }) => {
  const { selectedSort, setSelectedSort } = useContext(SelectedContext);

  return (
    <RootBottomSheet
      isBottomSheetOpen={isSortBottomSheetOpen}
      setIsBottomSheetOpen={setIsSortBottomSheetOpen}
      snapHeight="30%"
      enablePanDownToClose={true}
      showHandleIndicator={false}
    >
      <View style={{ paddingHorizontal: 14 }}>
        <Text style={styles.sortText}>Sort by</Text>
        <ScrollView
          style={{ paddingTop: 20 }}
          showsVerticalScrollIndicator={true}
        >
          <TouchableOpacity
            onPress={() => setSelectedSort(0)}
            style={[
              styles.sortContainer,
              {
                shadowOpacity: selectedSort === 0 ? 0.9 : 0,
                backgroundColor:
                  selectedSort === 0
                    ? "rgba(98, 160, 149, 0.3)"
                    : "transparent",
              },
            ]}
          >
            <Text style={[styles.optionText]}>Recent First</Text>
            {selectedSort === 0 && (
              <CheckIcon color="rgba(255, 255, 255, 0.9)" size={18} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedSort(1)}
            style={[
              styles.sortContainer,
              {
                shadowOpacity: selectedSort === 1 ? 0.9 : 0,
                backgroundColor:
                  selectedSort === 1
                    ? "rgba(98, 160, 149, 0.3)"
                    : "transparent",
              },
            ]}
          >
            <Text style={[styles.optionText]}>Oldest First</Text>
            {selectedSort === 1 && (
              <CheckIcon color="rgba(255, 255, 255, 0.9)" size={18} />
            )}
          </TouchableOpacity>
        </ScrollView>
        <Pressable
          style={{ padding: 10, marginTop: 20 }}
          onPress={() => setIsSortBottomSheetOpen(false)}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              textAlign: "center",
              fontWeight: "700",
            }}
          >
            Cancel
          </Text>
        </Pressable>
      </View>
    </RootBottomSheet>
  );
};

const styles = StyleSheet.create({
  sortText: {
    color: theme.home_screen.themeThread.sort.sort_text,
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  sortContainer: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: theme.home_screen.themeThread.sort.sort_container_shadow,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 4,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionText: {
    color: theme.home_screen.themeThread.sort.option_text,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    textShadowColor: theme.home_screen.themeThread.sort.option_text_shadow,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
});

export default Sort;
