import { useColorMode } from "native-base";
import {
  Image,
  Text,
  View,
  StyleSheet,
  Pressable,
  TextInput,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { DefualtCover } from "../../additional";
import { BlurView } from "expo-blur";
import { useContext, useEffect, useState } from "react";
import { CancelIcon } from "../icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import pickImage from "../createpage/ImagePicker";
import { getNativeSourceAndFullInitialStatusForLoadAsync } from "expo-av/build/AV";
import { RefreshValue } from "../navbar";

const EditModal = ({ album, setEditAlbumVisible }) => {
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "black" : "white";
  const bgColor = colorMode === "light" ? "#F2F1F5" : "black";

  const [title, setTitle] = useState(album.title);
  const [description, setDescription] = useState(album.description);
  const [posts, setPosts] = useState(album.posts);
  const [picture, setPicture] = useState(album.picture);

  const { refreshValue, setRefreshValue } = useContext(RefreshValue);

  const __dirname =
    "file:///Users/tusharlanghnoda/Desktop/Projects/RootSeek/rootseek/server";

  const saveChanges = async () => {
    const token = await AsyncStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    formData.append("posts", JSON.stringify(posts));

    if (picture !== album.picture) {
      formData.append("picture", {
        uri: picture,
        name: "image.jpg",
        type: "image/jpeg",
      });
    }

    try {
      const response = await axios.patch(
        `http://localhost:5002/library/album/edit/${album._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setEditAlbumVisible(false);
      setRefreshValue((prev) => prev + 1);
      console.log(response.data.message);
    } catch (error) {
      console.log(error.response?.data?.message || "Unknown error");
    }
  };

  const deletePost = async (postId) => {
    const token = await AsyncStorage.getItem("token");
    try {
      const response = await axios.patch(
        `http://localhost:5002/library/album/post-delete/${album._id}`,
        {
          postId: postId,
          posts: posts,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPosts(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const openPickImage = () => {
    pickImage(setPicture);
  };

  return (
    <View style={{ height: "100%" }}>
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

      <Text
        style={{
          color: textColor,
          fontSize: 16,
          fontWeight: 600,
          textAlign: "center",
          marginTop: 10,
        }}
      >
        Edit album
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "black",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 10,
            elevation: 6,
            marginTop: 24,
          }}
        >
          {!picture ? (
            <Image
              source={DefualtCover}
              style={{
                height: 200,
                width: 200,
                borderRadius: 12,
              }}
            />
          ) : (
            <Image
              source={{
                uri: album.picture === picture ? __dirname + picture : picture,
              }}
              style={{
                height: 200,
                width: 200,
                borderRadius: 12,
              }}
            />
          )}
          <View style={styles.imageButton}>
            <Pressable
              style={{
                borderRadius: 20,
                overflow: "hidden", // Ensures blur effect stays within borders
              }}
              onPress={openPickImage}
            >
              <View
                style={{
                  borderRadius: 20,
                  overflow: "hidden",
                  backgroundColor: "rgba(38, 43, 43, 0.6)",
                }}
              >
                <BlurView intensity={50} tint="default" style={{ padding: 10 }}>
                  <Text style={styles.addImageText}>Edit image</Text>
                </BlurView>
              </View>
            </Pressable>
          </View>
        </View>
        <BlurView
          intensity={50}
          tint="default"
          style={[
            styles.blurCard,
            {
              marginTop: 20,
              color: textColor,
              backgroundColor:
                colorMode === "light"
                  ? "rgba(255, 255, 255, 0.9)"
                  : "rgba(38, 43, 43, 0.1)",
            },
          ]}
        >
          <TextInput
            value={title}
            onChangeText={setTitle}
            style={[styles.titleInput, { color: textColor }]}
            placeholder="Title"
            placeholderTextColor={
              colorMode === "light"
                ? "rgba(0, 0, 0, 0.9)"
                : "rgba(245, 245, 245, 0.9)"
            }
            numberOfLines={1}
          />
        </BlurView>
        <BlurView
          intensity={50}
          tint="default"
          style={[
            styles.blurCard,
            {
              color: textColor,
              backgroundColor:
                colorMode === "light"
                  ? "rgba(255, 255, 255, 0.9)"
                  : "rgba(38, 43, 43, 0.1)",
            },
          ]}
        >
          <TextInput
            style={{ paddingHorizontal: 4 }}
            placeholder="Enter description"
            value={description}
            onChangeText={setDescription}
          />
        </BlurView>
        <View
          style={{
            display: "flex",
            flexDirection: "column",

            marginTop: 40,
          }}
        >
          {posts.map((post, index) => (
            <View
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                borderBottomWidth: 1,
                borderBottomColor: "rgb(220, 217, 217)",
                paddingVertical: 12,
                gap: 12,
              }}
            >
              <TouchableOpacity onPress={() => deletePost(post._id)}>
                <CancelIcon size={34} color={textColor} />
              </TouchableOpacity>

              <View
                style={{ display: "flex", flexDirection: "column", gap: 4 }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: 500, color: textColor }}
                >
                  {post.title}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color:
                      colorMode === "light"
                        ? "rgb(96, 96, 96)"
                        : "rgb(220,217,217)",
                  }}
                  numberOfLines={4}
                >
                  {post.content}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <View
        style={{
          alignSelf: "center",
          position: "absolute",
          bottom: 60,
          shadowColor: "black",
          shadowOffset: { width: 6, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 10,
          elevation: 6,
        }}
      >
        <TouchableOpacity
          style={{
            paddingHorizontal: 18,
            paddingVertical: 10,
            backgroundColor: colorMode === "light" ? "black" : "white",
            borderRadius: 16,
          }}
          onPress={saveChanges}
        >
          <Text
            style={{
              textAlign: "center",
              color: bgColor,
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addImageText: {
    color: "rgba(245, 245, 245, 0.9)",
    fontWeight: "bold",
    fontSize: 16,
  },
  imageButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  blurCard: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginTop: 10,
    overflow: "hidden",
    borderRadius: 30,
    padding: 12,
  },
  titleInput: {
    textAlign: "center",
    color: "rgba(245, 245, 245, 0.9)",
    fontSize: 40,
    fontWeight: "600",
    //borderBottomWidth: 1,
    //borderBottomColor: "rgba(200, 200, 200, 0.1)",
    borderRadius: 2,
  },
});

export default EditModal;
