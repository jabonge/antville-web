import React from 'react'
import { Global, css } from '@emotion/react'
import Header from './components/Header'
import Routes from './Routes'

function App() {
  return (
    <>
      <Header />
      <Routes />
      <Global styles={globalStyle} />
    </>
  )
}

const globalStyle = css`
  html,
  body,
  #root {
    height: 100%;
  }
  html {
    box-sizing: border-box;

    * {
      box-sizing: inherit;
    }
  }
`

export default App
