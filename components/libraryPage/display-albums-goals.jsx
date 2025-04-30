import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { DefualtCover } from "../../additional";
import { FilterIcon } from "../icons";
import { useColorMode } from "native-base";
import { BlurView } from "expo-blur";
import { useContext } from "react";
import { AlbumsContext } from "./library";

const DisplayAlbumsGoals = ({ setSelectedAlbumIndex, setIsModalVisible }) => {
  const { albums } = useContext(AlbumsContext);
  const width = 190;
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "black" : "white";
  const bgColor = colorMode === "light" ? "#F2F1F5" : "black";

  const __dirname =
    "file:///Users/tusharlanghnoda/Desktop/Projects/RootSeek/rootseek/server";

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          alignItems: "center",
          padding: 10,
        }}
      >
        <FilterIcon size={20} color={textColor} />
        <Text style={{ color: textColor, fontSize: 16 }}>Filter</Text>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          marginBottom: 100,
          justifyContent: "space-between",
          gap: 14,
          padding: 14,
        }}
      >
        {albums.map((album, index) => (
          <Pressable
            key={index}
            style={{
              position: "relative",
              width: "48%",
              marginBottom: 14,
            }}
            onPress={() => {
              setSelectedAlbumIndex(index);
              setIsModalVisible(true);
            }}
          >
            {!album.picture ? (
              <Image
                source={DefualtCover}
                style={{ height: width, width: width, borderRadius: 12 }}
              />
            ) : (
              <Image
                source={{ uri: __dirname + album.picture }}
                style={{ height: width, width: width, borderRadius: 12 }}
              />
            )}

            <View
              style={{
                marginLeft: 6,
                position: "absolute",
                bottom: "14%",
                left: "8%",
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 600,
                  marginTop: 6,
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                {album.title}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                {album.totalPosts} memories
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default DisplayAlbumsGoals;
