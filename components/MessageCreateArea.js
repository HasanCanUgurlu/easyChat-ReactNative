import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { db } from "../firebase";
import * as firebase from "firebase";

export default function MessageCreateArea(props) {
  const [currentMessage, setCurrentMessage] = useState({
    id: 0,
    message: "",
  });

  function handleSubmit() {
    // increase the id value.
    setCurrentMessage({
      ...currentMessage,
      id: currentMessage.id++,
    });

    // push the message to the firestore db.
    db.collection("chat").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      id: currentMessage.id,
      message: currentMessage.message,
      sender: props.username,
    });

    // refresh the input area.
    setCurrentMessage({
      ...currentMessage,
      message: "",
    });
  }

  return (
    <View style={styles.writingArea}>
      <View style={styles.inputBackground}>
        <TextInput
          style={styles.input}
          type="text"
          name="message"
          value={currentMessage.message}
          onChangeText={(text) =>
            setCurrentMessage({ ...currentMessage, message: text })
          }
          selectionColor={"red"}
          placeholder="Message"
        />
      </View>
      <TouchableOpacity activeOpacity={0.5} onPress={handleSubmit}>
        <Ionicons
          style={styles.flexButton}
          name="send"
          size={24}
          color="#528DEB"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  writingArea: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputBackground: {
    width: "87%",
    borderRadius: 50,
    backgroundColor: "#E8EDEA",
  },
  input: {
    width: "94%",
    height: 40,
    marginLeft: 10,
  },
  flexButton: {
    marginLeft: 7,
  },
});
