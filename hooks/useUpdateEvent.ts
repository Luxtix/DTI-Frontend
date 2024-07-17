import UpdateEvent from '@/app/update-event/_components'
import React, { useState } from 'react'

const useUpdateEvent = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateEvent = async (formData: any) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('http://localhost:8080/api/events', {
        credentials: 'include',
        method: 'PUT',
        body: formData,
      })
      if (!response.ok) {
        throw new Error('Failed to create event')
      }
      const data = await response.json()
      setIsLoading(false)
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setIsLoading(false)
    }
  }

  return { updateEvent, isLoading, error }
}

export default useUpdateEvent
