// import React from "react";
// import {
//   View,
//   Text,
//   Button,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Alert,
// } from "react-native";
// import { useRouter } from "expo-router";
// import { useTheme } from "../../../../constants/ThemeProvider";

// const HomeScreen = () => {
//   const { colors, setScheme, dark } = useTheme();
//   const navigator = useRouter();

//   const projects = [
//     "Handwritten Digit Recognition",
//     "Image Classification with CIFAR-10",
//     "Face Detection",
//     "Object Detection with YOLO (You Only Look Once)",
//     "Emotion Detection from Facial Expressions",
//     "Dog Breed Classification",
//     "Plant Species Recognition",
//     "Traffic Sign Recognition",
//     "Food Classification",
//     "Bird Species Classification",
//     "Comment sentiment analyzer",
//   ];
//   const handlePress = (title) => {
//     Alert.alert("Project Selected", title);
//   };
//   return <ListProject projects={projects} handlePress={handlePress} />;
// };
// const ListProject = ({ projects, handlePress }) => {
//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={projects}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             onPress={() => handlePress(item)}
//             style={styles.item}
//           >
//             <Text style={styles.title}>{item}</Text>
//           </TouchableOpacity>
//         )}
//         keyExtractor={(item) => item.key}
//       />
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     padding: 20,
//   },
//   item: {
//     backgroundColor: "#adddff",
//     padding: 20,
//     marginVertical: 8,
//     borderRadius: 10,
//   },
//   title: {
//     fontSize: 18,
//   },
// });

// export default HomeScreen;

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
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

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
      title: "Text Classification with CNN",
      screen: "TextClassification",
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
    {
      title: "Comment sentiment analyzer",
      screen: "sentiment",
      isCompleted: true,
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
          <TouchableOpacity
            onPress={() => handlePress(item.screen)}
            style={styles.item}
          >
            <Text style={styles.title}>{item.title}</Text>
            {item.isCompleted ? (
              <MaterialIcons name="done-all" size={20} />
            ) : (
              <MaterialIcons name="remove-done" size={20} />
            )}
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
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
  },
});

export default HomeScreen;
