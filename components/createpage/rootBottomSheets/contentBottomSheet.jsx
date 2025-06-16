import { BlurView } from "expo-blur";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View, Dimensions } from "react-native";
import { RootCreationContext } from "../create";
import RootBottomSheet from "../../rootBottomSheet";
import { theme } from "../../../theme";

const ContentBottomSheet = ({ isContentOpen, setIsContentOpen }) => {
  const { content, setContent } = useContext(RootCreationContext);
  const [countChar, setCountChar] = useState(content.length);

  useEffect(() => {
    setCountChar(content.length);
  }, [content]);

  return (
    <RootBottomSheet
      snapHeight="90%"
      isBottomSheetOpen={isContentOpen}
      setIsBottomSheetOpen={setIsContentOpen}
      enablePanDownToClose={true}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Root content:</Text>

        <BlurView style={[styles.inputContainer]}>
          <TextInput
            style={styles.contentInput}
            placeholder="Talk about your memory. What makes it a memory?"
            placeholderTextColor={
              theme.create_screen.content_bottomsheet.content_input
            }
            multiline
            value={content}
            onChangeText={(text) => {
              if (countChar < 1000 || text.length < content.length) {
                setContent(text);
              }
            }}
          />
        </BlurView>
        <Text style={styles.countCharText}>{countChar}/1000</Text>
      </View>
    </RootBottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 10,
  },
  header: {
    color: theme.create_screen.content_bottomsheet.header,
    fontWeight: 500,
    fontSize: 16,
    marginLeft: 10,
  },
  inputContainer: {
    marginTop: 4,
    padding: 12,
    height: 300,
    borderRadius: 10,
    backgroundColor: theme.create_screen.content_bottomsheet.input_container,
    overflow: "hidden",
  },
  countCharText: {
    fontSize: 16,
    color: theme.create_screen.content_bottomsheet.count_char_text,
    textAlign: "right",
    marginRight: 10,
    marginTop: 4,
  },
  contentInput: {
    color: theme.create_screen.content_bottomsheet.content_input,
    fontSize: 15,
  },
});
export default ContentBottomSheet;
