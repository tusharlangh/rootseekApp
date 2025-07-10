import { Text, View } from "react-native";

const MilestoneCard = ({ currentIndex, narrative }) => {
  return (
    <View
      style={{
        width: 300,
        marginHorizontal: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        height: "100%",
      }}
    >
      <View style={{ gap: 10 }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 600,
            textAlign: "center",
            color: "black",
          }}
        >
          {narrative[currentIndex].suspense}
        </Text>

        <Text
          style={{
            fontSize: 24,
            fontWeight: 600,
            textAlign: "center",
            color: "black",
          }}
        >
          {narrative[currentIndex].message}
        </Text>
      </View>
    </View>
  );
};

export default MilestoneCard;
