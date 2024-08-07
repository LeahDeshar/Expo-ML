import { StyleSheet } from "react-native";
import React from "react";
import { ThemeProvider } from "../constants/ThemeProvider";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "../store/store";
const Layout = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Stack>
          {/* <Stack.Screen
          name="(side)/home/HomeScreen"
          options={{ headerShown: false }}
        /> */}
          <Stack.Screen name="(side)" options={{ headerShown: false }} />
          <Stack.Screen
            name="Handwrite"
            options={{
              title: "Hand written Digit Recognition",
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen
            name="sentiment"
            options={{
              title: "Comment sentiment analyzer",
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen
            name="text"
            options={{
              title: "NLP: Text Summarization",
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen
            name="restaurant"
            options={{
              title: "NLP: Restaurant Review Prediction",
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen
            name="TextClassification"
            options={{
              title: "Text Classification with CNN",
              headerBackTitleVisible: false,
            }}
          />
        </Stack>
      </ThemeProvider>
    </Provider>
  );
};

export default Layout;
