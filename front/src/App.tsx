import React from "react"
import Main from "./pages/Main"

import { ThemeProvider } from "./components/ThemeProvider"

export default function App() {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Main />
      </ThemeProvider>
    </>
  )
}