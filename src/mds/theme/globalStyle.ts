import { css } from '@emotion/react'

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
    h1 {
      font-size: 48px;
      font-weight: bold;
    }
  }
`

export default globalStyle
