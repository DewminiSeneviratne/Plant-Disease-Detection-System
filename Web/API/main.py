from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# load tf models
MODEL = tf.keras.models.load_model("C:/Users/ASUS/Documents/Plant Disease Detection System/models/modelPreProcess")
MODEL2 = tf.keras.models.load_model("C:/Users/ASUS/Documents/Plant Disease Detection System/models/3")

CLASS_NAMES = ["non-plant", "plant"]
CLASS_NAMES_2 = ["Bacterial Spot of Tomato", "Black Rot of Grapes", "Common Rust in Corn",
               "Corn Healthy Leaf", "Early Blight of Potato", "Early Blight of Tomato",
               "Esca (Black Measles) of Grapes", "Grape Healthy Leaf", "Late Blight of Potato",
               "Late Blight of Tomato", "Nothern Corn Leaf Blight", "Potato Healthy Leaf",
               "Tomato Healthy Leaf", "Tomato Yellow Leaf Curl Virus (TYLCV)"]

@app.get("/ping")
async def ping():
    return "Hello, I am alive"


def read_file_as_image(data) -> np.ndarray:
    # image = np.array(Image.open(BytesIO(data)))
    # return image
    image = Image.open(BytesIO(data)).resize((256, 256))
    return np.array(image)

@app.post("/predict")
async def predict(
        file: UploadFile = File(...)
):
    image = read_file_as_image(await file.read())
    img_batch = np.expand_dims(image, 0)

    predictions = MODEL.predict(img_batch)
    pass

    predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
    confidence = np.max(predictions[0])


    if predicted_class == "non-plant" and confidence == 1.0:
        return {
            "class": predicted_class,
            "confidence": float(confidence)
        }
    else:
        new_predictions = MODEL2.predict(img_batch)
        pass

        new_predicted_class = CLASS_NAMES_2[np.argmax(new_predictions[0])]
        new_confidence = np.max(new_predictions[0])

        return {
            "class": new_predicted_class,
            "confidence": float(new_confidence)
        }

if __name__ == "__main__":
    uvicorn.run(app, host='192.168.8.131', port=8000)