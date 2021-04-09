import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Button,
  StatusBar,
  Platform,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/stack";

export default function PickUserName({ navigation }) {
  const [username, setUsername] = useState("");

  const headerHeight = useHeaderHeight();

  function handleUsernameSubmit() {
    navigation.replace("ChatPage", {
      username,
    });
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Pick a Nickname",
    });
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={styles.container}
      keyboardVerticalOffset={Platform.select({
        ios: () => -100,
        android: () => null,
      })()}
    >
      <StatusBar barStyle="light-content" />

      <TextInput
        type="text"
        name="username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        placeholder="Pick a nickname"
        style={styles.usernameInput}
      />
      <Button
        onPress={handleUsernameSubmit}
        title="Ready!"
        color="dodgerblue"
        accessibilityLabel="submit your username"
        style={styles.agreeButton}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  usernameInput: {
    textAlign: "center",
    width: "80%",
    height: 50,
    backgroundColor: "whitesmoke",
    marginBottom: 40,
  },
  agreeButton: {
    width: 200,
  },
});
