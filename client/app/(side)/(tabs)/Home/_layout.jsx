import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../../../constants/ThemeProvider";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";

const HomeScreen = () => {
  const { colors, setScheme, dark } = useTheme();
  const navigation = useNavigation();

  const projects = [
    {
      title: "Handwritten Digit Recognition",
      screen: "Handwrite",
      isCompleted: true,
    },
    {
      title: "NLP: Text Summarization",
      screen: "text",
      isCompleted: true,
    },
    {
      title: "Restaurant Review Prediction",
      screen: "restaurant",
      isCompleted: true,
    },
    {
      title: "Spam Detection with CNN",
      screen: "TextClassification",
      isCompleted: true,
    },
    {
      title: "Comment sentiment analyzer",
      screen: "sentiment",
      isCompleted: true,
    },
    {
      title: "Image Classification with CIFAR-10",
      screen: "ImageClassificationCIFAR10",
      isCompleted: false,
    },
    { title: "Face Detection", screen: "FaceDetection", isCompleted: false },
    {
      title: "Object Detection with YOLO (You Only Look Once)",
      screen: "ObjectDetectionYOLO",
      isCompleted: false,
    },
    {
      title: "Emotion Detection from Facial Expressions",
      screen: "EmotionDetection",
      isCompleted: false,
    },
    {
      title: "Dog Breed Classification",
      screen: "DogBreedClassification",
      isCompleted: false,
    },
    {
      title: "Plant Species Recognition",
      screen: "PlantSpeciesRecognition",
      isCompleted: false,
    },
    {
      title: "Traffic Sign Recognition",
      screen: "TrafficSignRecognition",
      isCompleted: false,
    },
    {
      title: "Food Classification",
      screen: "FoodClassification",
      isCompleted: false,
    },
    {
      title: "Bird Species Classification",
      screen: "BirdSpeciesClassification",
      isCompleted: false,
    },
  ];

  const handlePress = (screen) => {
    navigation.navigate(screen);
  };

  return <ListProject projects={projects} handlePress={handlePress} />;
};

const ListProject = ({ projects, handlePress }) => {
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={projects}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item.screen)}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {item.isCompleted ? (
                <Feather name="check-circle" size={20} />
              ) : (
                <Feather name="circle" size={20} />
              )}
              <View style={styles.item}>
                <Text style={styles.title}>{item.title}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.screen}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    justifyContent: "center",
    padding: 20,
  },
  item: {
    backgroundColor: "#adddff",
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    // flexDirection: "row",
    // justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
  },
});

export default HomeScreen;
