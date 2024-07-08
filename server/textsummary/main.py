from fastapi import FastAPI, Request
from pydantic import BaseModel
import spacy
from spacy.lang.en.stop_words import STOP_WORDS
from string import punctuation
from heapq import nlargest
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
nlp = spacy.load("en_core_web_sm")

class TextData(BaseModel):
    text: str

@app.post("/summarize")
async def summarize_text(request: TextData):
    text = request.text
    doc = nlp(text)
    
    tokens = [token.text for token in doc]
     
    punctuation_chars = punctuation + '\n'
    word_freq = {}
    stop_words = list(STOP_WORDS)
   
    
    
    for word in doc:
        if word.text.lower() not in stop_words:
            if word.text.lower() not in punctuation_chars:
                if word.text not in word_freq.keys():
                    word_freq[word.text] = 1
                else:
                    word_freq[word.text] += 1

    max_freq = max(word_freq.values())

    for word in word_freq.keys():
        word_freq[word] = word_freq[word] / max_freq

    sent_token = [sent for sent in doc.sents]

    sent_score = {}
    for sent in sent_token:
        for word in sent:
            if word.text.lower() in word_freq.keys():
                if sent not in sent_score.keys():
                    sent_score[sent] = word_freq[word.text.lower()]
                else:
                    sent_score[sent] += word_freq[word.text.lower()]

    summary_length = int(len(sent_token) * 0.3)
    summary_sentences = nlargest(summary_length, sent_score, key=sent_score.get)
    summary = ' '.join([sent.text for sent in summary_sentences])

    return {
        "summary": summary,
        "origina_length": len(text),
        "summary_length": len(summary)
        }
