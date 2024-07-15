import { TransactionDetail } from '@/types/transaction'
import { useEffect, useState } from 'react'

const transactionDetail = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<unknown>(null)

  const getDetailTransaction = async (transactionId: number | undefined) => {
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
      return transactionDetail.data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }
  return {
    getDetailTransaction,
    loading,
    error,
  }
}

export default transactionDetail
