import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "Wallet Reputation Checker - Intuition",
  description: "Check wallet reputation and trust scores on the Intuition Knowledge Graph",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen`}
      >
        {children}
      </body>
    </html>
  )
}
