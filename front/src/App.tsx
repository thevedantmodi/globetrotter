import React from "react"
import Main from "./pages/Main"

import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';


const theme = createTheme({

})

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Main />
    </MantineProvider>
  )
}