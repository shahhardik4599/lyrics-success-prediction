from hit_predictor import * 
from tensorflow.keras.models import load_model
from gensim.models import Word2Vec
from tensorflow.keras.preprocessing.sequence import pad_sequences
import joblib
from autogluon.tabular import TabularPredictor
import numpy as np
import pandas as pd
from collections import Counter
from nltk.corpus import cmudict


class Predictor:
    
    def __init__(self):
        self.loaded_model = load_model('lyrics_model.h5')
        self.loaded_word2vec = Word2Vec.load('lyrics_word2vec.model')
        self.loaded_tokenizer = joblib.load('lyrics_tokenizer.pkl')
        
        self.ag_predictor = TabularPredictor.load('ag-20250317_001617')
        self.d = cmudict.dict()


    def predict(self, text, max_len = 1001):
        
        new_lyrics_tokenized = self.loaded_tokenizer.texts_to_sequences([text])
        new_lyrics_padded = pad_sequences(new_lyrics_tokenized, padding='post', maxlen=max_len)
        
        prediction = self.loaded_model.predict(new_lyrics_padded)[0][0] # extract the probability
        return round(prediction * 100,2)

    def compute_entropy(self,probabilities):
        probabilities = np.array(probabilities)

        result = 0
        for prob in probabilities:
            result += prob * np.log(prob + 1e-10)

        return result
    
    
        
        
    def predict_ag(self,text):
        input_data = pd.DataFrame({"Cleaned_Lyrics": [text]})
        probabilities = self.ag_predictor.predict_proba(input_data)

    
        return round(float(probabilities["True"].values[0]) * 100, 2)
        
    
    def unique_ratio(self,text):
        return round(len(set(text.split())) / len(text.split()) * 100,2)
    

    
    def repetition_ratio(self, text):
        words = text.split()
        word_freq = Counter(words)
        return round((sum([v for k, v in word_freq.items() if v > 1]) / len(words)) * 100, 2)

        
    def lexical_diversity(self,lyrics):
        words = word_tokenize(lyrics) 
        total_words = len(words)
        unique_words = len(set(words))
        return round((unique_words / total_words if total_words > 0 else 0) * 100,2 )

    
    def get_rhyme_part(self,word):
        word = word.lower()
        if word in self.d:
            return ''.join(self.d[word][0][-2:]) 
        else:
            return None

    
    def rhyme_density(self,lyrics):
        words = word_tokenize(lyrics)
        rhyme_parts = [self.get_rhyme_part(word) for word in words if self.get_rhyme_part(word)]
        rhyme_parts = [rhyme for rhyme in rhyme_parts if rhyme]
        
        rhyme_count = len(rhyme_parts)
        # Count rhyme occurrences (pairs of rhyming words)
        rhyme_pairs = Counter(rhyme_parts)
        rhyme_pairs = {key: value for key, value in rhyme_pairs.items() if value > 1}
        
        # Rhyme density: proportion of words involved in rhyming
        total_rhyming_words = sum(rhyme_pairs.values())
        total_words = len(words)
        
        return round((total_rhyming_words / total_words if total_words > 0 else 0) * 100,2)
    
    
    
    def get_success(self,lyrics):
        text = clean_lyrics(lyrics)
        text = expand_contractions(text)
        text = remove_stopwords(text)

        rep_ratio = self.repetition_ratio(text)
        uni_ratio = self.unique_ratio(lyrics)
        lex_div = self.lexical_diversity(lyrics)
        rhyme_density_value = self.rhyme_density(lyrics)




        model_result = self.predict(text)
        ag_result = self.predict_ag(text)
        
        ag_entropy = self.compute_entropy([ag_result / 100, 1 - (ag_result / 100)])        

        model_entropy = self.compute_entropy([model_result / 100, 1 - (model_result / 100 )])

        print({ "lyrics" : lyrics, "ag_result" : ag_result, "model_result" : model_result, "ag_con" : 1 - ag_entropy, "model_con" : 1- model_entropy, "ld" : lex_div, "rep" : rep_ratio, "uni" : uni_ratio, "rd" : rhyme_density_value})
        
        return { "lyrics" : lyrics, "ag_result" : ag_result, "model_result" : model_result, "ag_con" : 1 - ag_entropy, "model_con" : 1- model_entropy, "ld" : lex_div, "rep" : rep_ratio, "uni" : uni_ratio, "rd" : rhyme_density_value}
        

        
if __name__ == "__main__" :
    lyrics =  "I found a love for me Oh, darling, just dive right in and follow my lead Well, I found a girl, beautiful and sweet Oh, I never knew you were the someone waitin' for me 'Cause we were just kids when we fell in love, not knowin' what it was I will not give you up this time Oh, darling, just kiss me slow, your heart is all I own And in your eyes, you're holding mine Baby, I'm dancin' in the dark with you between my arms Barefoot on the grass while listenin' to our favourite song When you said you looked a mess, I whispered underneath my breath But you heard it, Darling, you look perfect tonight Well, I found a woman, stronger than anyone I know She shares my dreams, I hope that someday, I'll share her home I found a love to carry more than just my secrets To carry love, to carry children of our own We are still kids, but we're so in love, fightin' against all odds I know we'll be alright this time Darling, just hold my hand, be my girl, I'll be your man I see my future in your eyes Oh, baby, I'm dancin' in the dark with you between my arms Barefoot on the grass while listenin' to our favourite song When I saw you in that dress, lookin' so beautiful I don't deserve this, darling, you look perfect tonight No, no, no Mm, oh Baby, I'm dancin' in the dark with you between my arms Barefoot on the grass, oh, listenin' to our favourite song I have faith in what I see, now I know I have met An angel in person, and she looks perfect Though I don't deserve this, you look perfect tonight"
    pred = Predictor()
    pred.get_success(lyrics)