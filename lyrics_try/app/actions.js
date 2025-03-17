"use server"

const BASE_URL = "http://127.0.0.1:5001"; // Your backend server

// Function to fetch lyrics using the expected API format
export async function searchLyrics(singer, song) {
  try {
    const response = await fetch(`${BASE_URL}/get_lyrics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        song_name: song,  // Use correct key expected by API
        performer: singer, // Use correct key expected by API
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 404) return null; // No lyrics found
      throw new Error("Failed to fetch lyrics");
    }

    const data = await response.json();
    return {
      lyrics: data.lyrics,
      modelsuccessRate: data.model_result,
      AGsuccessRate: data.ag_result,
      modelconfidence: data.model_con,
      AGconfidence: data.ag_con,
      uniq: data.uni,
      repe: data.rep,
      lexica: data.ld,
      Rhythm: data.rd
    };
  } catch (error) {
    console.error("Error fetching lyrics:", error);
    return null;
  }
}

// Function to submit lyrics (only sends lyrics)
export async function submitLyrics(lyrics) {
  try {
    const response = await fetch(`${BASE_URL}/post_lyrics`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lyrics }), // Send only lyrics
    });

    if (!response.ok) {
      throw new Error("Failed to submit lyrics");
    }

    const data = await response.json();
    return { lyrics: data.lyrics, 
      modelsuccessRate: data.model_result, 
      AGsuccessRate: data.ag_result,
      modelconfidence: data.model_con,
      AGconfidence: data.ag_con,
      uniq: data.uni,
      repe: data.rep,
      lexica: data.ld,
      Rhythm: data.rd
     };
  } catch (error) {
    console.error("Error submitting lyrics:", error);
    return { success: false, error: "Failed to submit lyrics" };
  }
}
