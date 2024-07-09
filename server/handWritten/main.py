# # app.py
# from fastapi import FastAPI, UploadFile, File
# from pydantic import BaseModel
# from tensorflow.keras.models import load_model
# import numpy as np
# import io
# import cv2
# from fastapi.responses import JSONResponse
# from fastapi.middleware.cors import CORSMiddleware
# from PIL import Image



# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )
# # Load your trained model
# model = load_model("handWritten.keras")

# class Prediction(BaseModel):
#     prediction: int
#     confidence: float

# @app.post("/predict/")
# async def predict(file: UploadFile = File(...)):
#     try:
#         # Read the uploaded image file
#         image = await file.read()
#         np_img = np.fromstring(image, np.uint8)
#         img = cv2.imdecode(np_img, cv2.IMREAD_GRAYSCALE)
#         img = np.invert(np.array([img]))

#         # Predict using the model
#         prediction = model.predict(img)
#         predicted_digit = np.argmax(prediction)
#         return JSONResponse(content={"prediction": int(predicted_digit)})
#     except Exception as e:
#         return JSONResponse(content={"error": str(e)}, status_code=500)



# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)


from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from tensorflow.keras.models import load_model
import numpy as np
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

class Prediction(BaseModel):
    prediction: int
# test endpoint
@app.get("/")
async def read_root():
    return {"message": "Welcome to the Handwritten Digit Recognition API!"}

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    try:
        # Read the uploaded image file
        image = await file.read()
        np_img = np.frombuffer(image, np.uint8)
        img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)
        
        # Convert to grayscale and resize to 28x28
        gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        resized_img = cv2.resize(gray_img, (28, 28))
        processed_img = np.expand_dims(resized_img, axis=0)
        processed_img = np.expand_dims(processed_img, axis=-1)

        # Predict using the model
        prediction = model.predict(processed_img)
        predicted_digit = np.argmax(prediction)
        return JSONResponse(content={"prediction": int(predicted_digit)})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
