import debounce from 'lodash.debounce'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import getSearchStocks from '../../../lib/api/stock/getSearchStocks'
import searchSlice from '../../../reducers/Slices/search'

type Props = {
  query: string
}

export default function useSearchStocks({ query }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const { setStocks } = searchSlice.actions
  const dispatch = useDispatch()

  const searchApi = async (term: string) => {
    const result = await getSearchStocks(term)
    dispatch(setStocks(result))
    setIsLoading(false)
  }

  const debouncedSearch = useCallback(
    debounce((term) => searchApi(term), 300),
    []
  )

  useEffect(() => {
    if (query === '') {
      dispatch(setStocks(null))
      return
    }
    setIsLoading(true)
    debouncedSearch(query)
  }, [query, debouncedSearch])

  return { isLoading }
}
