import { PostStockPrice } from './../api/types'
import {
  blue010,
  blue050,
  grey010,
  grey060,
  red010,
  red050,
} from '../styles/colors'
import NumberFormatUtil from '../utils/number_format'

class PostStock {
  stockPrice: PostStockPrice

  sign!: string
  textColor!: string
  backgroundColor!: string
  name!: string

  thenPrice!: string
  nowPrice!: string
  change!: string
  changePercent!: string

  constructor(stockPrice: PostStockPrice) {
    this.stockPrice = stockPrice
    this.setInfo()
  }

  setInfo() {
    this.name = this.stockPrice.stock.cashTagName
    const diff = this.stockPrice.nowPrice - this.stockPrice.price
    var isUSD: boolean
    if (this.stockPrice.stock.exchange.countryCode !== 'KR') {
      isUSD = true
    } else {
      isUSD = false
    }
    this.thenPrice = NumberFormatUtil.format(isUSD, this.stockPrice.price, true)
    this.nowPrice = NumberFormatUtil.format(
      isUSD,
      this.stockPrice.nowPrice,
      true
    )
    this.changePercent = (
      (Math.abs(diff) / this.stockPrice.nowPrice) *
      100
    ).toFixed(2)
    this.change = NumberFormatUtil.format(isUSD, Math.abs(diff), false)

    if (diff > 0) {
      this.sign = '+'
      this.textColor = red050
      this.backgroundColor = red010
    } else if (diff === 0) {
      this.sign = ''
      this.backgroundColor = grey010
      this.textColor = grey060
    } else {
      this.sign = '-'
      this.backgroundColor = blue010
      this.textColor = blue050
    }
  }
}

export default PostStock
