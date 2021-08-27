import React from 'react'
import { useParams } from 'react-router-dom'
import MainTemplate from '../../components/main/MainTemPlate'
import useGetStock from './hooks/useGetStock'
import StockDetailPage from './StockDetailPage'
import StockNotFound from './StockNotFound'

export default function StockPage() {
  const { ticker } = useParams<{ ticker: string }>()
  const { stock, loading } = useGetStock(ticker)
  return (
    <>
      <MainTemplate
        children={
          <>
            {!loading &&
              (stock ? <StockDetailPage stock={stock!} /> : <StockNotFound />)}
          </>
        }
      ></MainTemplate>
    </>
  )
}
