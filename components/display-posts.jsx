import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";

const DisplayPosts = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={{
        marginTop: 12,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        marginBottom: 100,
      }}
    >
      <View style={styles.postContainer}>
        <Text style={styles.postTitle} numberOfLines={2}>
          okay so now I should be able to extract songs test 1
        </Text>
        <View>
          <Text style={styles.postContent} numberOfLines={5}>
            Reduce the Frequency of Requests If you're sending too many requests
            at once, try to reduce the frequency by adding a delay between
            requests, for example using setTimeout() or using a queue mechanism
            to limit the requests sent within a certain time. In short, the
            error you're seeing is due to too many requests being made in a
            short time. Try using a custom CORS proxy or consider a solution to
            manage the rate limits (like retrying after a delay).
          </Text>
          <Text style={styles.postHashTags}>#RootSeek#Life</Text>
        </View>
      </View>

      <View style={styles.postContainer}>
        <Text style={styles.postTitle} numberOfLines={2}>
          So made it so that it can send
        </Text>
        <View>
          <Text style={styles.postContent} numberOfLines={5}>
            Lets see if it works #1
          </Text>
          <Text style={styles.postHashTags}>#RootSeek#Life</Text>
        </View>
      </View>

      <View style={styles.postContainer}>
        <Text style={styles.postTitle} numberOfLines={2}>
          Cinderella
        </Text>
        <Text style={styles.postContent} numberOfLines={5}>
          cindrella by metro boomin and future ft. travis and carti
        </Text>
      </View>

      <View style={styles.postContainer}>
        <Text style={styles.postTitle} numberOfLines={2}>
          A lot of things happened today.
        </Text>
        <Text style={styles.postContent} numberOfLines={5}>
          first of all carti dropping the album tomorrow. Been waiting for
          almost 2 years. And second thing added a single root view. the user
          can click on any root and view it in full. Also added so that they can
          delete the post too.
        </Text>
      </View>

      <View style={styles.postContainer}>
        <Text style={styles.postTitle} numberOfLines={2}>
          I learned to today something new of useStates
        </Text>
        <Text style={styles.postContent} numberOfLines={5}>
          I learned today that states do not change based on any changes inside
          the object for example dictionary. It would not cause any re renders.
          For a re render to occur you will have to create a new object each
          time. You can do that for dictionary by using ...dictionary, which
          will make a copy of the current dictionary and the nafter that you can
          add whatever you want.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: 18,
    borderRadius: 10,
    backgroundColor: "#F8F8F8",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 1,
    elevation: 5,
  },

  postTitle: {
    fontWeight: "700",
    fontSize: 28,
  },
  postContent: {
    fontWeight: "400",
    fontSize: 12,
  },
  postHashTags: {
    marginTop: 4,
    fontWeight: "700",
    fontSize: 12,
  },
});

export default DisplayPosts;
