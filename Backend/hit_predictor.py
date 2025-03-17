import re
import pandas as pd
import contractions


import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords



stop_words = set(stopwords.words("english"))


def clean_lyrics(text):
    if pd.isna(text):  # Handle missing values
        return ""
    
    text = text.lower()  # Convert to lowercase
    text = re.sub(r"\[.*?\]", "", text)  # Remove section markers like [Chorus], [Verse]
    text = re.sub(r"\d+", "", text)  # Remove numbers
    text = re.sub(r"[^\w\s']", "", text)  # Keep words and apostrophes, remove special characters
    text = re.sub(r"\s+", " ", text).strip()  # Remove extra spaces

    return text


def expand_contractions(text):
    expanded_text = contractions.fix(text)
    
    return expanded_text 


def remove_stopwords(text):
    tokens = word_tokenize(text)
    filtered_tokens = [token for token in tokens if token not in stop_words]
    return " ".join(filtered_tokens)