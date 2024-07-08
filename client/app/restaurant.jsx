import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import axios from "axios";
const _layout = () => {
  return (
    <View>
      <Review />
    </View>
  );
};

export default _layout;

function Review() {
  const [review, setReview] = useState("");
  const [prediction, setPrediction] = useState(null);

  const handlePredict = async () => {
    try {
      const response = await axios.post("http://your-fastapi-url/predict", {
        review_text: review,
      });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        placeholder="Enter your review"
        onChangeText={(text) => setReview(text)}
        value={review}
      />
      <Button title="Predict Sentiment" onPress={handlePredict} />
      {prediction !== null && (
        <Text>Sentiment: {prediction === 1 ? "Positive" : "Negative"}</Text>
      )}
    </View>
  );
}
