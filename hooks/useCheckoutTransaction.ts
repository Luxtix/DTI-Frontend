import React from 'react'

interface TransactionProps {
  eventId: string
  voucherId: number | null
  totalQty: number
  finalPrice: number
  totalDiscount: number
  originalPrice: number
  usePoint: number | null
  tickets: {
    ticketId: number
    price: number
    qty: number
  }[]
}

const useCheckoutTransaction = () => {
  const checkoutTransaction = async (result: TransactionProps) => {
    try {
      const response = await fetch('http://localhost:8080/api/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(result),
      })
      if (!response.ok) {
        throw new Error('Failed to create event')
      }
      const data = await response.json()
      return data
    } catch (err) {
      console.log(err)
    }
  }
  return { checkoutTransaction }
}

export default useCheckoutTransaction
