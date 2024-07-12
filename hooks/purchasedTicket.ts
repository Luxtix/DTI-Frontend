import { useSession } from 'next-auth/react'
import React, { use, useEffect, useState } from 'react'

export interface TransactionList {
  transactionId: number
  eventId: number
  eventDate: Date
  eventName: string
  eventImage: string
  isDone: boolean
}

const purchasedTicket = () => {
  const [transactionList, setTransactionList] = useState<TransactionList[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<unknown>(null)
  const { data: session } = useSession()
  useEffect(() => {
    const getLists = async () => {
      try {
        setLoading(true)
        const endpoint = `/api/transaction`
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`
        )
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
  }, [session])
  return {
    transactionList,
    loading,
    error,
  }
}

export default purchasedTicket
