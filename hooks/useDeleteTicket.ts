import React, { useState } from 'react'

const useDeleteTicket = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const deleteTicket = async (id: number) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`http://localhost:8080/api/ticket/${id}`, {
        credentials: 'include',
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete ticket')
      }
      const data = await response.json()
      setIsLoading(false)
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setIsLoading(false)
    }
  }

  return { deleteTicket, isLoading, error }
}

export default useDeleteTicket
