import { TextInput, View, Text, TextBase } from "react-native";
import { useColorMode } from "native-base";
import { Hashtag, SmileIcon } from "../icons";
import { useEffect, useState } from "react";

const ContentPage = ({
  title,
  setTitle,
  content,
  setContent,
  mood,
  setMood,
}) => {
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "black" : "white";
  const [countChar, setCountChar] = useState(content.length);

  useEffect(() => {
    setCountChar(content.length);
  });

  return (
    <View style={{ marginTop: 20 }}>
      <View
        style={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          gap: 30,
        }}
      >
        <TextInput
          style={{ fontSize: 18, color: textColor }}
          value={title}
          onChangeText={setTitle}
          placeholder="Title"
        />
        <TextInput
          style={{
            fontSize: 18,
            color: textColor,
            height: "70%",
          }}
          value={content}
          onChangeText={setContent}
          placeholder="Content"
          multiline={true}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 4,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 4,
            }}
          >
            <SmileIcon size={28} color={textColor} />
            <TextInput
              style={{
                fontSize: 18,
                color: textColor,
              }}
              value={mood}
              onChangeText={setMood}
              placeholder="Add mood"
            />
          </View>

          <Text style={{ color: textColor, paddingRight: 4 }}>
            {countChar}/2000
          </Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row", gap: 4 }}>
          <Hashtag size={28} color={textColor} />
          <TextInput
            style={{
              fontSize: 18,
              color: textColor,
            }}
            placeholder="Add hashtags"
          />
        </View>
      </View>
    </View>
  );
};

export default ContentPage;
