import "./globals.css"
import { LyricsProvider } from "../context/LyricsContext";

export const metadata = {
  title: "Lyrics Finder",
  description: "Find lyrics for your favorite songs",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <LyricsProvider>
        {children}
      </LyricsProvider>
      </body>
    </html>
  )
}

