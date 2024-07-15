import { useState, useEffect } from 'react'
import { EventDetailType } from '@/types/event'
import { useSession } from 'next-auth/react'

interface ApiResponse {
  statusCode: number
  message: string
  success: boolean
  data: EventDetailType
}

export function useEventById(eventId: number) {
  const [event, setEvent] = useState<EventDetailType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { data: session } = useSession()

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const endpoint = session
          ? `/api/events/${eventId}`
          : `/api/events/public/${eventId}`

        const response = await fetch(`http://localhost:8080${endpoint}`, {
          credentials: 'include',
        })
        if (!response.ok) {
          throw new Error('Failed to fetch event')
        }
        const data: ApiResponse = await response.json()
        setEvent(data.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [eventId, session])

  return { event, loading, error }
}
