import React from "react"
import Main from "./pages/Main"

import { ThemeProvider } from "./components/ThemeProvider"
import AuthProvider from "context/AuthProvider"

export default function App() {
  return (
    <>
      <AuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Main />
        </ThemeProvider>
      </AuthProvider>
    </>
  )
}