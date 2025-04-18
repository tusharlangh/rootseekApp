import { useColorMode } from "native-base";
import { View, TouchableOpacity, Text } from "react-native";

const CloseModal = ({ setIsCloseModalVisible, handleClose }) => {
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "black" : "white";

  return (
    <View>
      <View>
        <Text
          style={{
            color: textColor,
            fontSize: 18,
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          If you leave, your post will not be saved.
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setIsCloseModalVisible(false);
              handleClose();
            }}
          >
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
          <TouchableOpacity onPress={() => setIsCloseModalVisible(false)}>
            <Text
              style={{ textAlign: "center", fontSize: 16, fontWeight: 400 }}
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
