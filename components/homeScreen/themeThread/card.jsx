import { Text, View } from "react-native";

const Card = () => {
  return (
    <View style={{ marginTop: 30 }}>
      <View
        style={{
          borderRadius: 18,
          padding: 16,
          shadowColor: "black",
          shadowOpacity: 0,
          shadowRadius: 12,
          backgroundColor: "rgba(255, 255, 255, 0.15)",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
          <Text style={{ fontSize: 32, marginRight: 12 }}>😊</Text>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: "white",
                fontSize: 16,
                marginBottom: 12,
                lineHeight: 22,
                fontWeight: "600",
              }}
            >
              Thought about using a spinner but chose an easier method instead,
              showing practical thinking.
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 13,
                  flexShrink: 1,
                  opacity: 0.9,
                }}
              >
                You mentioned faith 10 times for this theme
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 12,
                  marginLeft: 10,
                  fontWeight: "500",
                }}
              >
                Aug 17, 2025
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Card;
