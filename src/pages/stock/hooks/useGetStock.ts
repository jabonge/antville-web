import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import getStockByTicker from '../../../lib/api/stock/getStockByTicker'
import { Stock } from '../../../lib/api/types'
import stockSlice from '../../../reducers/Slices/stock'

export default function useGetStock(ticker: string) {
  const [stock, setStock] = useState<Stock>()
  const [loading, setLoading] = useState<boolean>(true)
  const dispatch = useDispatch()
  const { addOrReplaceStockPrice } = stockSlice.actions

  const getStockApi = async () => {
    try {
      const result = await getStockByTicker(ticker)
      setStock(result.stock)
      dispatch(addOrReplaceStockPrice(result.stockPriceInfo))
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  useEffect(() => {
    getStockApi()
  }, [ticker])

  return { stock, loading }
}
