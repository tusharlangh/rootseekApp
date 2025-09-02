import { Pressable, Text, View, TouchableOpacity } from "react-native";
import { theme } from "../../../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { LeftArrowIcon, SortIcon, StreakIcon } from "../../icons";
import Card from "./card";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useContext, useEffect } from "react";
import Sort from "./sort";
import { HideTabBar } from "../../navbar";

const ThemeThread = () => {
  const [isSortBottomSheetOpen, setIsSortBottomSheetOpen] = useState(false);
  const { setHideTabBar } = useContext(HideTabBar);

  const navigation = useNavigation();
  const route = useRoute();
  let { _theme, _theme_color, _progression } = route.params;
  _theme = _theme[0].toUpperCase() + _theme.slice(1);

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const y = event.contentOffset.y;
      scrollY.value = y;
    },
  });

  const fadeStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 100],
        [1, 0],
        Extrapolation.CLAMP
      ),
    };
  });

  const fadeInTextStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 50], [0, 1], Extrapolation.CLAMP),
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [0, 50],
            [10, 0],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  useEffect(() => {
    setHideTabBar(isSortBottomSheetOpen);
  }, [isSortBottomSheetOpen]);

  return (
    <LinearGradient
      colors={[_theme_color, theme.main_background, theme.main_background]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView edges={["top", "left", "right"]}>
        <View
          style={{
            paddingHorizontal: 16,
            marginBottom: 14,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Pressable onPress={() => navigation.goBack()}>
            <LeftArrowIcon color={"white"} size={18} />
          </Pressable>

          <Animated.Text
            style={[
              fadeInTextStyle,
              {
                paddingRight: 14,
                color: "white",
                fontWeight: "700",
                fontSize: 18,
              },
            ]}
          >
            {_theme}
          </Animated.Text>
          <Text></Text>
        </View>

        <Animated.ScrollView
          onScroll={scrollHandler}
          contentContainerStyle={{ paddingBottom: 200 }}
        >
          <Animated.View
            style={[
              fadeStyle,

              {
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginTop: 2,
                paddingHorizontal: 16,
              },
            ]}
          >
            <Text
              style={{
                color: "white",
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              {_theme}
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 12,
                fontWeight: "500",
                opacity: 0.8,
              }}
            >
              {_progression["growth_role"].length} roots
            </Text>
          </Animated.View>
          <Animated.View
            style={[
              fadeStyle,
              {
                paddingHorizontal: 16,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                marginTop: 4,
                marginBottom: 16,
              },
            ]}
          >
            <StreakIcon color="rgba(254, 157, 71, 1)" size={24} />
            <Text
              style={{
                color: "white",
                fontSize: 12,
                fontWeight: "500",
                opacity: 0.8,
              }}
            >
              6 days
            </Text>
          </Animated.View>

          <Animated.View
            style={[
              fadeStyle,
              {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: 10,
                paddingHorizontal: 16,
                marginBottom: 12,
              },
            ]}
          >
            <TouchableOpacity onPress={() => setIsSortBottomSheetOpen(true)}>
              <SortIcon color="rgba(255,255,255,0.8)" />
            </TouchableOpacity>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
                backgroundColor: "white",
                padding: 8,
                borderRadius: 4,
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: 700, opacity: 0.9 }}>
                Chart insight
              </Text>
            </View>
          </Animated.View>

          <View style={{ paddingHorizontal: 16 }}>
            {_progression["growth_role"].map((_, index) => (
              <View key={index}>
                <Card
                  summary={_progression["summary"][index]}
                  date={_progression["dates"][index]}
                  growth_role={_progression["growth_role"][index]}
                  emoji={_progression["emoji"][index]}
                />
              </View>
            ))}
          </View>
        </Animated.ScrollView>
      </SafeAreaView>
      <Sort
        setIsSortBottomSheetOpen={setIsSortBottomSheetOpen}
        isSortBottomSheetOpen={isSortBottomSheetOpen}
      />
    </LinearGradient>
  );
};

export default ThemeThread;
