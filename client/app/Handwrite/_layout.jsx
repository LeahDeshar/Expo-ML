// import { View, Text, Button } from "react-native";
// import React, { useState } from "react";
// import * as ImagePicker from "expo-image-picker";
// import axios from "axios";
// // const api = axios.create({
// //   baseURL: "http://127.0.0.1:8000", // Replace with your FastAPI server URL
// // });

// const HandwrittenDigitRecognition = () => {
//   const [image, setImage] = useState(null);
//   const [prediction, setPrediction] = useState(null);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImage(result.uri);
//       const formData = new FormData();
//       formData.append("file", {
//         uri: result.uri,
//         name: "photo.jpg",
//         type: "image/jpeg",
//       });

//       try {
//         const response = await axios.post(
//           "http://192.168.1.9:8000/predict/",
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
//         setPrediction(response.data.prediction);
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   };

//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Button title="Pick an image from camera roll" onPress={pickImage} />
//       {image && (
//         <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
//       )}
//       {prediction !== null && <Text>Prediction: {prediction}</Text>}
//     </View>
//   );
// };

// export default HandwrittenDigitRecognition;

import React, { useState } from "react";
import { View, Text, Button, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const HandwrittenDigitRecognition = () => {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
      const formData = new FormData();
      formData.append("file", {
        uri: result.uri,
      });

    //   try {
    //     const response = await axios.post(
    //       "http://192.168.1.9:8000/predict/",
    //       formData,
    //       {
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //         },
    //       }
    //     );
    //     setPrediction(response.data.prediction);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
  };

  const handleTest = async () => {
    console.log("test");
    try {
      const response = await axios.get("http://192.168.1.9:8000");
      console.log(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      {prediction !== null && <Text>Prediction: {prediction}</Text>}

      <Button title="test" onPress={handleTest} />
    </View>
  );
};

export default HandwrittenDigitRecognition;
