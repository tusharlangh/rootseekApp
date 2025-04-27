import { useColorMode } from "native-base";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  Pressable,
  Modal,
} from "react-native";
import {
  AddIcon,
  FilterIcon,
  GoalsIcons,
  MemoryIcon,
  PictureIcon,
  SearchIconOutline,
} from "../icons";
import { DefualtCover } from "../../additional";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import BottomPage from "../bottom-page";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ViewAlbum from "./view-album";
import DisplayAlbumsGoals from "./display-albums-goals";

const Library = () => {
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "black" : "white";
  const bgColor = colorMode === "light" ? "#F2F1F5" : "black";

  const options = ["Albums", "Goals"];

  const [createAlbumVisible, setCreateAlbumVisible] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = await AsyncStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:5002/library/albums-all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAlbums(response.data);
      } catch (error) {}
      r;
    };
    fetchPosts();
  }, [createAlbumVisible, isModalVisible]);

  const createAlbum = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }
    try {
      const response = await axios.get(
        "http://localhost:5002/library/create-default-album",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSelectedAlbum(response.data);
      setCreateAlbumVisible(false);
      setIsModalVisible(true);
    } catch (error) {
      console.error("Error creating album", error);
    }
  };

  return (
    <>
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingRight: 10,
            shadowColor: bgColor,
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 6,
            backgroundColor: bgColor,
            zIndex: 10,
          }}
        >
          <Text style={[styles.dailyText, { color: textColor }]}>
            Your library
          </Text>
          <View style={{ display: "flex", flexDirection: "row", gap: 20 }}>
            <SearchIconOutline size={24} color={textColor} />
            <Pressable
              onPress={() => setCreateAlbumVisible(!createAlbumVisible)}
            >
              <AddIcon size={24} color={textColor} />
            </Pressable>
          </View>
        </View>
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 10, marginBottom: 10 }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                paddingHorizontal: 8,
              }}
            >
              {options.map((option, index) => (
                <Pressable
                  key={index}
                  style={{
                    backgroundColor: "#E4E3E8",
                    borderRadius: 16,
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontSize: 16,
                    }}
                  >
                    {option}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>

        {albums.length === 0 ? (
          <View style={{ width: "100%", height: "100%" }}>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "75%",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 22,
                  fontWeight: 700,
                  color: textColor,
                }}
              >
                Create albums or goals
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: 400,
                  color: textColor,
                }}
              >
                Reach your goals
              </Text>
            </View>
          </View>
        ) : (
          <DisplayAlbumsGoals
            albums={albums}
            setIsModalVisible={setIsModalVisible}
            setSelectedAlbum={setSelectedAlbum}
          />
        )}

        <BottomPage
          isModalVisible={createAlbumVisible}
          setIsModalVisible={setCreateAlbumVisible}
          height={20}
        >
          <View
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 40,
                height: 5,
                borderRadius: 10,
                backgroundColor: "rgb(192, 192, 192)",
                marginTop: -10,
              }}
            ></View>
          </View>
          <View style={{ gap: 20, marginTop: 20 }}>
            <Pressable
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              }}
              onPress={createAlbum}
            >
              <MemoryIcon size={34} color="rgb(89, 89, 89)" />
              <View>
                <Text
                  style={{ color: textColor, fontSize: 16, fontWeight: 600 }}
                >
                  Album
                </Text>
                <Text style={{ color: textColor, fontSize: 14 }}>
                  Create an album with memories that define moments
                </Text>
              </View>
            </Pressable>
            <Pressable
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              }}
            >
              <GoalsIcons size={34} color="rgb(89, 89, 89)" />
              <View>
                <Text
                  style={{ color: textColor, fontSize: 16, fontWeight: 600 }}
                >
                  Goals
                </Text>
                <Text style={{ color: textColor, fontSize: 14 }}>
                  Finish goals to improve something about yourself
                </Text>
              </View>
            </Pressable>
          </View>
        </BottomPage>
      </View>
      <Modal
        visible={isModalVisible}
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
        animationType="slide"
      >
        <ViewAlbum
          album={selectedAlbum}
          setIsModalVisible={setIsModalVisible}
        />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  logo: {
    color: "black",
    fontSize: 38,
    fontFamily: "GrandHotel_400Regular",
    marginTop: -10,
  },
  container: {
    height: "100%",
    paddingTop: 60,
    paddingHorizontal: 5,
  },
  nestedContainer: {
    height: "100%",
    paddingHorizontal: 4,
  },
  dailyText: {
    marginLeft: 8,
    fontSize: 32,
    fontWeight: "bold",
  },
  closeButton: {
    marginLeft: 10,
    padding: 12,
    borderRadius: 50,
  },
});

export default Library;
