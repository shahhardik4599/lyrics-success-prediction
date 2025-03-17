"use client"

import { useState } from "react"
import { submitLyrics } from "../actions" // Import submit function

export default function LyricsModal({ isOpen, onClose, onLyricsSubmitted }) {
  const [lyrics, setLyrics] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!lyrics) return

    setIsSubmitting(true)

    try {
      const response = await submitLyrics(lyrics) // Send only lyrics

      if (!response || response.success === false) {
        setSubmitResult({ success: false, message: "An unexpected error occurred" })
      } else {
        setSubmitResult({ success: true, message: "Lyrics submitted successfully!" })

        // Pass lyrics and success rate back to Home.js
        onLyricsSubmitted(response.lyrics, response.successRate)

        // Close modal after delay
        setTimeout(() => {
          onClose()
          setLyrics("")
          setSubmitResult(null)
        }, 2000)
      }
    } catch (error) {
      setSubmitResult({ success: false, message: "An unexpected error occurred" })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white relative rounded-lg shadow-xl w-full max-w-md mx-4">
        <button onClick={onClose} className="text-white text-[20px] hover:text-gray-800 absolute flex rounded-[100%] px-[20px] py-[15px]  bg-black -top-[6%] -right-[3%] hover:bg-slate-500">
            &times;
        </button>
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Submit Lyrics</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="space-y-2">
            <label htmlFor="lyrics" className="block font-medium">
              Lyrics
            </label>
            <textarea
              id="lyrics"
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              placeholder="Enter the song lyrics here"
              className="w-full min-h-[200px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-purple-600 text-white rounded-md">
            {isSubmitting ? "Submitting..." : "Submit Lyrics"}
          </button>
        </form>
      </div>
    </div>
  )
}
