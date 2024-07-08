import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Alert,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingViewComponent,
  Platform,
  ScrollView,
} from "react-native";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";
const _layout = () => {
  return (
    <KeyboardAvoidingView
      style={styles.screenContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={60}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      {/* <View style={styles.container}>
        <TextAreaComponent />
      </View> */}
      <ScrollView contentContainerStyle={styles.container}>
        <TextAreaComponent />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const TextAreaComponent = () => {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [length, setLength] = useState({
    origina_length: 0,
    summary_length: 0,
  });

  const countWords = (text) => {
    return text ? text.trim().split(/\s+/).length : 0;
  };

  const handleClearText = () => {
    setText("");
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://192.168.1.6:8000/summarize", {
        text: text,
      });
      setSummary(response.data.summary);
      setLength({
        origina_length: countWords(text),
        summary_length: countWords(response.data.summary),
      });
    } catch (error) {
      console.error(error);
    }
    Alert.alert("Submitted", "Your text has been submitted!");
  };
  const wordCount = countWords(text);
  const isSubmitDisabled = wordCount < 100;
  return (
    <View style={styles.textAreaContainer}>
      <View>
        <TextInput
          style={styles.textArea}
          placeholderTextColor={"grey"}
          multiline={true}
          numberOfLines={20}
          placeholder="Enter the text here to summarize.."
          value={text}
          onChangeText={(text) => setText(text)}
        />
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={isSubmitDisabled}
          style={{
            position: "absolute",
            bottom: 50,
            right: 20,
          }}
        >
          <Ionicons
            name="send-outline"
            size={24}
            color={isSubmitDisabled ? "#808080" : "#0a7ea4"}
          />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginRight: 15,
          }}
        >
          <Text style={styles.wordCount}>{countWords(text)}</Text>
          <Text
            style={[
              styles.wordCount,
              {
                color: "grey",
                fontWeight: "thin",
              },
            ]}
          >
            /at least 100 words
          </Text>
        </View>
      </View>
      {text ? (
        <View
          style={{
            position: "absolute",
            top: 20,
            right: 20,
          }}
        >
          <Ionicons
            name="close-sharp"
            size={24}
            color={"#0a7ea4"}
            onPress={handleClearText}
          />
        </View>
      ) : null}

      {summary && (
        <View
          style={{
            paddingTop: 30,
          }}
        >
          <Text style={styles.headerText}>Summary</Text>
          <Text>{summary}</Text>

          <View>
            <Text>Original Text Length: {length.origina_length}</Text>
            <Text>Summary Text Length: {length.summary_length}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    margiVertical: 50,
    paddingBottom: 20,
  },
  textAreaContainer: {
    flex: 1,
  },
  textArea: {
    height: 350,
    paddingTop: 50,
    borderColor: "#8080804e",

    borderWidth: 1,
    borderRadius: 25,
    padding: 10,
    textAlignVertical: "top",
  },
  wordCount: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default _layout;
