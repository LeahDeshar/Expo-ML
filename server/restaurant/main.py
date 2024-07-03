from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import re
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer

app = FastAPI()

class Review(BaseModel):
    review_text: str

model = joblib.load('naive_bayes_model.pkl')
vectorizer = joblib.load('count_vectorizer.pkl')
ps = PorterStemmer()

@app.post("/predict")
def predict_sentiment(review: Review):
    # Preprocess the review
    processed_review = re.sub('[^a-zA-Z]', ' ', review.review_text)
    processed_review = processed_review.lower()
    processed_review = processed_review.split()
    processed_review = [ps.stem(word) for word in processed_review if word not in stopwords.words('english')]
    processed_review = " ".join(processed_review)
    
    # Vectorize the review
    review_vector = vectorizer.transform([processed_review]).toarray()
    
    # Predict sentiment
    prediction = model.predict(review_vector)
    
    return {"prediction": int(prediction[0])}
