import debounce from 'lodash.debounce'
import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import deleteWatchlist from '../../../lib/api/stock/deleteWatchlist'
import putAddWatchlist from '../../../lib/api/stock/putAddWatchlist'
import AVStock from '../../../lib/models/av_stock'
import stockSlice from '../../../reducers/Slices/stock'
import { selectIsWatchlist } from '../../../selectors/stockSelectors'
import { useRootState } from '../../common/hooks/useRootState'

export function useStockInfo(avStock: AVStock) {
  const initialWatching = useRootState((state) =>
    selectIsWatchlist(state, avStock.stock.symbol)
  )
  const [isWatchlist, setIsWatchlist] = useState<boolean>(initialWatching)
  const [watchUserCount, setWatchUserCount] = useState<number>(
    avStock.stock.stockCount.watchUserCount
  )

  const { addWatchlist, deleteOneWatchlist, addOrReplaceStockPrice } =
    stockSlice.actions

  const dispatch = useDispatch()

  const clickAddWatchlistButton = () => {
    const captureValue = isWatchlist
    if (isWatchlist) {
      setIsWatchlist(false)
      if (watchUserCount > 0) {
        setWatchUserCount(watchUserCount - 1)
      }
    } else {
      setIsWatchlist(true)
      setWatchUserCount(watchUserCount + 1)
    }
    debounceApiCallback(captureValue)
  }
  const debounceApiCallback = useCallback(
    debounce((isWatch: boolean) => {
      if (isWatch) {
        deleteWatchListApi()
      } else {
        addWatchListApi()
      }
    }, 300),
    []
  )

  const addWatchListApi = async () => {
    try {
      await putAddWatchlist(avStock.id)
      dispatch(addWatchlist(avStock.stock))
      if (avStock.hasPrice) {
        dispatch(addOrReplaceStockPrice(avStock.priceInfo!))
      }
    } catch (err) {
      setIsWatchlist(false)
      if (watchUserCount > 0) {
        setWatchUserCount(watchUserCount - 1)
      }
    }
  }

  const deleteWatchListApi = async () => {
    try {
      await deleteWatchlist(avStock.id)
      dispatch(deleteOneWatchlist(avStock.id))
    } catch (err) {
      setIsWatchlist(true)
      setWatchUserCount(watchUserCount + 1)
    }
  }

  return { isWatchlist, watchUserCount, clickAddWatchlistButton }
}