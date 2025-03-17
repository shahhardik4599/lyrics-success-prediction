"use client"

import { useEffect, useState } from "react"

export default function LyricsResultModal({ isOpen, onClose, data }) {
    const [animateIn, setAnimateIn] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setAnimateIn(true)
        } else {
            setAnimateIn(false)
        }
    }, [isOpen])

    if (!isOpen || !data) return null

    const { lyrics, successPrediction, artist, title } = data

    // Determine success prediction styling
    const getSuccessBadge = () => {
        if (successPrediction >= 80) {
            return {
                text: "High Success Potential",
                color: "bg-green-500",
                textColor: "text-green-100",
            }
        } else if (successPrediction >= 50) {
            return {
                text: "Moderate Success Potential",
                color: "bg-yellow-500",
                textColor: "text-yellow-100",
            }
        } else {
            return {
                text: "Low Success Potential",
                color: "bg-red-500",
                textColor: "text-red-100",
            }
        }
    }

    const badge = getSuccessBadge()

    return (
        <div
            className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm transition-opacity duration-300 ${animateIn ? "opacity-100" : "opacity-0"}`}
        >
            <div
                className={`bg-gradient-to-br from-purple-900/90 to-blue-900/90 rounded-lg shadow-xl w-full max-w-3xl mx-4 transition-all duration-300 ${animateIn ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}
            >
                <div className="p-4 border-b border-white/20 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-white">{title}</h2>
                        <p className="text-white/80">by {artist}</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className={`${badge.color} ${badge.textColor} px-3 py-1 rounded-full text-sm font-medium`}>
                            {badge.text} ({successPrediction}%)
                        </div>

                        <button onClick={onClose} className="text-white/70 hover:text-white">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="h-96 overflow-y-auto my-4 px-6">
                    <pre className="text-white whitespace-pre-wrap font-sans leading-relaxed">{lyrics}</pre>
                </div>

                <div className="p-4 border-t border-white/20 flex justify-between">
                    <div>
                        <span className="text-white/60 text-sm">{new Date().toLocaleDateString()}</span>
                    </div>

                    <div className="flex space-x-3">
                        <button className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                />
                            </svg>
                        </button>
                        <button className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                        </button>
                        <button className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

