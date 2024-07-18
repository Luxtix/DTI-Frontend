import React, { useState } from 'react'

const useDeleteVoucher = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const deleteVoucher = async (id: number) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`http://localhost:8080/api/voucher/${id}`, {
        credentials: 'include',
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete voucher')
      }
      const data = await response.json()
      setIsLoading(false)
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setIsLoading(false)
    }
  }

  return { deleteVoucher, isLoading, error }
}

export default useDeleteVoucher
