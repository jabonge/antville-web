import { getCategoriesResponse, getSearchResponse } from '../api/tenor/types'

export interface postOptions {
  isUp: boolean
  isDown: boolean
  categorys: getCategoriesResponse | null
  gifs: getSearchResponse | null
  query: string
  previewUrl: string | ArrayBuffer | null
  submitData: {
    body: string
    sentiment: string
    gifDto: GifDto | undefined
  }
  isSubmitted: boolean
}

export interface GifDto {
  gifId: string
  tinyGifUrl: string
  gifUrl: string
  ratio: number
}
