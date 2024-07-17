import { useState } from 'react'
import { useEvents } from './useEvents'

export const useIntrestedEvent = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { refreshEvents } = useEvents()

  const toogleIntrested = async (id: number) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(
        `http://localhost:8080/api/favorite/toggle/${id}`,
        {
          credentials: 'include',
          method: 'POST',
        }
      )
      if (!response.ok) {
        throw new Error('Failed to create event')
      }
      const data = await response.json()
      setIsLoading(false)
      refreshEvents()
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setIsLoading(false)
    }
  }

  return { toogleIntrested, isLoading, error }
}
