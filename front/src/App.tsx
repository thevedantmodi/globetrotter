import React from "react"
import Main from "./pages/Main"

import { ThemeProvider } from "./components/ThemeProvider"

export default function App() {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Main />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}