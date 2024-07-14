import { useEffect, useState } from 'react'

export interface TransactionDetail {
  id: number
  eventName: string
  eventImage: string
  eventDate: string
  startTime: string
  endTime: string
  eventDay: string
  venueName: string
  ticketName: string
  ticketQty: number
  cityName: string
  isOnline: boolean
}

const transactionDetail = (transactionId: number | undefined) => {
  const [transactionDetailList, setTransactionDetailList] = useState<
    TransactionDetail[]
  >([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<unknown>(null)
  useEffect(() => {
    const getDetailTransaction = async () => {
      try {
        setLoading(true)
        const endpoint = `/api/transaction/detail/${transactionId}`
        const response = await fetch(`http://localhost:8080${endpoint}`, {
          credentials: 'include',
        })
        if (!response.ok) {
          throw new Error('Failed to fetch user transaction detail')
        }
        const transactionDetail = await response.json()
        setTransactionDetailList(transactionDetail.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }
    getDetailTransaction()
  }, [transactionId])
  return {
    transactionDetailList,
    loading,
    error,
  }
}

export default transactionDetail
