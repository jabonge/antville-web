import React from 'react'
import { Global, css } from '@emotion/react'

function App() {
  return (
    <>
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
