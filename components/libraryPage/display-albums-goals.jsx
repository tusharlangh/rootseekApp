import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { DefualtCover } from "../../additional";
import { FilterIcon } from "../icons";
import { useColorMode } from "native-base";

const DisplayAlbumsGoals = ({
  albums,
  setSelectedAlbum,
  setIsModalVisible,
}) => {
  const width = 190;
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "black" : "white";
  const bgColor = colorMode === "light" ? "#F2F1F5" : "black";

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
          justifyContent: "center",
          marginBottom: 100,
        }}
      >
        {albums.map((album, index) => (
          <Pressable
            key={index}
            style={{ padding: 10, position: "relative" }}
            onPress={() => {
              setSelectedAlbum(album);
              setIsModalVisible(true);
            }}
          >
            {album.picture === "" && (
              <Image
                source={DefualtCover}
                style={{ height: width, width: width, borderRadius: 12 }}
              />
            )}

            <View
              style={{
                marginLeft: 6,
                position: "absolute",
                bottom: 30,
                left: 18,
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 600,
                  marginTop: 6,
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                {album.title}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.8)",
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
