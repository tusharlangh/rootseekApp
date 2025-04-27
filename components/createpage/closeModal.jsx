import { useColorMode } from "native-base";
import { View, TouchableOpacity, Text } from "react-native";
import { CancelIcon, TrashIcon } from "../icons";

const CloseModal = ({ setIsCloseModalVisible, handleClose }) => {
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "black" : "white";

  return (
    <View style={{ marginHorizontal: -20 }}>
      <View>
        <Text
          style={{
            color: textColor,
            fontSize: 18,
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          If you leave, your root will not be saved
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "column",

            marginTop: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setIsCloseModalVisible(false);
              handleClose();
            }}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              borderTopWidth: 1,
              borderColor: colorMode === "light" ? "#DCDCDC" : "#242323",
              width: "100%",
              padding: 14,
              gap: 10,
            }}
          >
            <TrashIcon size={26} color="red" />
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                fontWeight: 400,
                color: "red",
              }}
            >
              Discard post
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setIsCloseModalVisible(false)}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderTopWidth: 1,
              borderColor: colorMode === "light" ? "#DCDCDC" : "#242323",
              width: "100%",
              padding: 14,
              gap: 10,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                fontWeight: 500,
                color: textColor,
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CloseModal;
