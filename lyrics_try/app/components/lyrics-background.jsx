"use client"

import { useEffect, useState } from "react"

const sampleLyrics = [
  "And I will always love you...",
  "Never gonna give you up, never gonna let you down",
  "I'm just a poor boy, nobody loves me",
  "Hello from the other side",
  "All the small things, true care, truth brings",
  "Sweet dreams are made of this",
  "I want it that way",
  "Billie Jean is not my lover",
  "I can't get no satisfaction",
  "Smells like teen spirit",
  "Every breath you take",
  "Bohemian rhapsody",
  "Imagine all the people",
  "Yesterday, all my troubles seemed so far away",
  "I will survive, hey hey",
  "Don't stop believin'",
  "Sweet child o' mine",
  "Like a rolling stone",
  "Stairway to heaven",
  "Hotel California",
]

export default function LyricsBackground() {
  const [lyrics, setLyrics] = useState([])

  useEffect(() => {
    // Initialize lyrics with random positions and speeds
    const initialLyrics = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      text: sampleLyrics[Math.floor(Math.random() * sampleLyrics.length)],
      speed: Math.random() * 0.5 + 0.2, // Random speed between 0.2 and 0.7
      position: Math.random() * 100, // Random starting position
    }))

    setLyrics(initialLyrics)

    const interval = setInterval(() => {
      setLyrics((prevLyrics) =>
        prevLyrics.map((lyric) => {
          // Move the lyric to the left
          const newPosition = lyric.position - lyric.speed

          // If the lyric has moved off the screen, reset it
          if (newPosition < -30) {
            return {
              ...lyric,
              text: sampleLyrics[Math.floor(Math.random() * sampleLyrics.length)],
              position: 100 + Math.random() * 20,
              speed: Math.random() * 0.5 + 0.2,
            }
          }

          return {
            ...lyric,
            position: newPosition,
          }
        }),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-black">
      {/* {lyrics.map((lyric) => (
        <div
          key={lyric.id}
          className="absolute whitespace-nowrap text-white/20 font-bold"
          style={{
            left: `${lyric.position}%`,
            top: `${(lyric.id * 6) % 100}%`,
            fontSize: `${Math.random() * 1.5 + 0.8}rem`,
            transform: "translateX(-50%)",
            transition: "left 0.05s linear",
          }}
        >
          {lyric.text}
        </div>
      ))} */}
    </div>
  )
}

