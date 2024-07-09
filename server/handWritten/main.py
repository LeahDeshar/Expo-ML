# app.py
from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from tensorflow.keras.models import load_model
import numpy as np
import io
import cv2
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Load your trained model
model = load_model("handWritten.keras")
# model = joblib.load('handWritten.keras"')
# Define Pydantic model for predictions
class Prediction(BaseModel):
    prediction: int
    confidence: float

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    try:
        # Read the uploaded image file
        image = await file.read()
        np_img = np.fromstring(image, np.uint8)
        img = cv2.imdecode(np_img, cv2.IMREAD_GRAYSCALE)
        img = np.invert(np.array([img]))

        # Predict using the model
        prediction = model.predict(img)
        predicted_digit = np.argmax(prediction)
        return JSONResponse(content={"prediction": int(predicted_digit)})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


# @app.post("/predict/", response_model=Prediction)
# async def predict(file: UploadFile = File(...)):
#     # Read image file
#     contents = await file.read()
#     pil_image = Image.open(io.BytesIO(contents))

#     # Preprocess the image
#     img = pil_image.convert("L")
#     img = img.resize((28, 28))
#     img = image.img_to_array(img)
#     img = np.expand_dims(img, axis=0)
#     img = img / 255.0

#     # Make a prediction
#     predictions = model.predict(img)
#     predicted_class = np.argmax(predictions, axis=1)[0]
#     confidence = np.max(predictions)

#     return {"prediction": int(predicted_class), "confidence": float(confidence)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
