"use client";  // Required for client-side context in Next.js App Router

import { createContext, useContext, useState } from "react";

// Create Context
const LyricsContext = createContext();

// Provider Component
export function LyricsProvider({ children }) {
    const [lyrics, setLyrics] = useState("");
    const [modelsuccessRate, setmodelsuccessRate] = useState(null);
    const [AGsuccessRate, setAGsuccessRate] = useState("");
    const [modelconfidence, setmodelconfidence] = useState(null);
    const [AGconfidence, setAGconfidence] = useState("");
    const [uniq, setuniq] = useState(null);
    const [repe, setrepe] = useState(null);
    const [lexica, setlexica] = useState("");
    const [Rhythm, setRhythm] = useState(null);

    return (
        <LyricsContext.Provider value={{ lyrics, setLyrics, modelsuccessRate, setmodelsuccessRate, 
        AGsuccessRate, setAGsuccessRate, modelconfidence, setmodelconfidence, 
        AGconfidence, setAGconfidence, uniq, setuniq, repe, setrepe, 
        lexica, setlexica, Rhythm, setRhythm }}>
            {children}
        </LyricsContext.Provider>
    );
}

// Custom Hook to use Lyrics Context
export function useLyrics() {
    return useContext(LyricsContext);
}
