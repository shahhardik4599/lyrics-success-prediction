from flask import Flask, request, jsonify
import requests
from main import Predictor

app = Flask(__name__)
predictor = Predictor()


def get_lyrics(song_name, performer):
    """Fetch lyrics using the Lyrics.ovh API."""
    url = f"https://api.lyrics.ovh/v1/{performer}/{song_name}"
    response = requests.get(url)

    if response.status_code == 200:
        lyrics = response.json().get("lyrics", "").strip()
        if lyrics:
            return lyrics
    return None  # Use `None` instead of string 'None'

@app.route('/get_lyrics', methods=['POST'])
def fetch_lyrics():
    data = request.get_json()  # ✅ Corrected from request.json()
    song_name = data.get("song_name")
    performer = data.get("performer")

    if not song_name or not performer:
        return jsonify({"error": "Missing song_name or performer"}), 400

    lyrics = get_lyrics(song_name, performer)

    if lyrics is None:
        return jsonify({"error": "Lyrics not found"}), 404

    else :
        result  =  predictor.get_success(lyrics)
        return jsonify(result)


@app.route('/post_lyrics', methods=['POST'])
def submit_lyrics():
    """Accepts raw lyrics input from the user and returns them as JSON."""
    data = request.get_json()

    lyrics = data.get("lyrics")
    if not lyrics:
        return jsonify({"error": "Missing lyrics"}), 400

    else :
        result  =  predictor.get_success(lyrics)
        return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port = 3000)