// import React, { useState } from "react";
// import { View, Text, Button, Image } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import axios from "axios";

// const HandwrittenDigitRecognition = () => {
//   const [image, setImage] = useState(null);
//   const [prediction, setPrediction] = useState(null);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     console.log(result);

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }

//     try {
//       console.log(image);
//       const response = await axios.post(
//         "http://192.168.1.9:8000/predict/",
//         image
//       );
//       setPrediction(response.data.prediction);
//     } catch (error) {
//       console.error(error);
//     }
//     // };
//     // const pickImage = async () => {
//     //   let result = await ImagePicker.launchImageLibraryAsync({
//     //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
//     //     allowsEditing: true,
//     //     aspect: [4, 3],
//     //     quality: 1,
//     //   });

//     //   if (!result.canceled) {
//     //     setImage(result.uri);
//     //     const formData = new FormData();
//     //     formData.append("file", {
//     //       uri: result.uri,
//     //     });

//     //     console.log(image);

//     //   try {
//     //     const response = await axios.post(
//     //       "http://192.168.1.9:8000/predict/",
//     //       formData,
//     //       {
//     //         headers: {
//     //           "Content-Type": "multipart/form-data",
//     //         },
//     //       }
//     //     );
//     //     setPrediction(response.data.prediction);
//     //   } catch (error) {
//     //     console.error(error);
//     //   }
//     // }
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
      setImage(result.assets[0].uri);
      const formData = new FormData();
      formData.append("file", {
        uri: result.assets[0].uri,
        type: "image/jpeg", // Adjust this based on the file type, e.g., 'image/png'
        name: "photo.jpg", // You can use any name here
      });

      try {
        const response = await axios.post(
          "http://192.168.1.9:8000/predict/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setPrediction(response.data.prediction);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      {prediction !== null && <Text>Prediction: {prediction}</Text>}
    </View>
  );
};

export default HandwrittenDigitRecognition;
