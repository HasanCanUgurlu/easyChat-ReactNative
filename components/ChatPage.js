import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ImageBackground,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/stack";
import MessageCreateArea from "./MessageCreateArea";
import { db } from "../firebase";

export default function ChatPage({ navigation, route }) {
  const { username } = route.params;
  const image = {
    uri: "https://www.transparenttextures.com/patterns/soft-wallpaper.png",
  };
  const [chatArray, setChatArray] = useState([]);

  // react header, using it to add to the avoiding view bottom padding.
  const headerHeight = useHeaderHeight();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
    });
  }, []);
  useLayoutEffect(() => {
    const messageList = db
      .collection("chat")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setChatArray(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return messageList;
  }, [route]);
  return (
    <ImageBackground source={image} style={styles.image}>
      <KeyboardAvoidingView
        enabled={true}
        keyboardVerticalOffset={headerHeight + 5}
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles.avoid}
      >
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.safearea}>
          <View style={styles.container}>
            <FlatList
              data={chatArray}
              renderItem={({ item }) => {
                if (item.data.sender === username) {
                  return (
                    <View
                      style={{
                        alignSelf: "flex-end",
                        padding: 12,
                        borderRadius: 20,
                        marginBottom: 5,
                        maxWidth: "80%",
                        backgroundColor: "#DCE5DF",
                      }}
                    >
                      <Text style={{ color: "tomato", fontSize: 10 }}>
                        {item.data.sender}
                      </Text>
                      <Text style={{ fontSize: 12, marginTop: 5 }}>
                        {item.data.message}
                      </Text>
                    </View>
                  );
                } else {
                  return (
                    <View
                      style={{
                        alignSelf: "flex-start",
                        padding: 12,
                        borderRadius: 20,
                        marginBottom: 5,
                        maxWidth: "80%",
                        backgroundColor: "#F4E4E1",
                      }}
                    >
                      <Text style={{ color: "tomato", fontSize: 10 }}>
                        {item.data.sender}
                      </Text>
                      <Text style={{ fontSize: 12, marginTop: 5 }}>
                        {item.data.message}
                      </Text>
                    </View>
                  );
                }
              }}
              keyExtractor={(item) => item.id.toString()}
              // extraData tells component to re-render everytime when length changes.
              extraData={chatArray.length}
              scrollEnabled={true}
              style={styles.flatListStyle}
            />

            <MessageCreateArea username={username} />
            {/* I had this bug where keyboardAvoidingView didn't work, the reason was,
          react-router heading. It adds some height and pushes the text input down.
          Also, the keyboardAvoidingView component itself is just a view with bottom padding, 
          So in order to add padding, you need to fill the empty area at the bottom.
          So I added an <EMPTY VIEW WITH FLEX:1> in the end(where this comment is),
          but in the end I didn't do it. And it's working  ¯\_(ツ)_/¯   */}
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

// It was hard to debug views. I used borders to,
// see what is where.
const styles = StyleSheet.create({
  avoid: {
    flex: 1,
  },
  safearea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  flatListStyle: {
    marginTop: 10,
    height: "75%",
    width: "100%",
  },
  flatListContent: {
    alignItems: "flex-start",
    padding: 10,
  },
});
