import {
  TransactionContext,
  useTransactionContext,
} from '@/contexts/TicketListContext'
import React, { use, useEffect, useState } from 'react'

export interface TransactionList {
  data: Transaction[]
  totalData: number
}

export type Transaction = {
  transactionId: number
  eventId: number
  eventDate: string
  eventName: string
  eventImage: string
  isDone: boolean
}

const TransactionList = () => {
  const [transactionList, setTransactionList] = useState<TransactionList>()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<unknown>(null)
  const [transactionLimit, setTransactionLimit] = useState<number>(1)
  useEffect(() => {
    const getLists = async () => {
      try {
        const limit = 6 * transactionLimit
        setLoading(true)
        const endpoint = `/api/transaction?size=${limit}`
        const response = await fetch(`http://localhost:8080${endpoint}`, {
          credentials: 'include',
        })
        if (!response.ok) {
          throw new Error('Failed to fetch user transaction')
        }
        const transaction = await response.json()
        setTransactionList(transaction)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }
    getLists()
  }, [transactionLimit])
  return {
    transactionList,
    loading,
    error,
    transactionLimit,
    setTransactionLimit,
  }
}

export default TransactionList