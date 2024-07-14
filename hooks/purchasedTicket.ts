import React, { use, useEffect, useState } from 'react'

export interface TransactionList {
  transactionId: number
  eventId: number
  eventDate: string
  eventDay: string
  eventName: string
  eventImage: string
  isDone: boolean
}

const purchasedTicket = () => {
  const [transactionList, setTransactionList] = useState<TransactionList[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<unknown>(null)
  useEffect(() => {
    const getLists = async () => {
      try {
        setLoading(true)
        const endpoint = `/api/transaction`
        const response = await fetch(`http://localhost:8080${endpoint}`, {
          credentials: 'include',
        })
        if (!response.ok) {
          throw new Error('Failed to fetch user transaction')
        }
        const transaction = await response.json()
        setTransactionList(transaction.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }
    getLists()
  }, [])
  return {
    transactionList,
    loading,
    error,
  }
}

export default purchasedTicket
