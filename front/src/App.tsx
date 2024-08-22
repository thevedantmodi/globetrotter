import React from "react"
import Main from "./pages/Main"

import { ThemeProvider } from "./components/ThemeProvider"
import AuthProvider from "react-auth-kit"
import createStore from 'react-auth-kit/createStore'

interface IUserData {
  name: string;
  uuid: string;
 };
 

export default function App() {
  const store = createStore<IUserData>({
    authName: '_auth',
    authType: 'cookie',
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === 'https:'
  })

  return (
    <>
      <AuthProvider store={store}>
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