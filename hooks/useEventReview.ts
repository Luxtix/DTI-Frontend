import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

interface EventReview {
  data: {
    id: number
    rating: number
    comments: string
    type: string
    reviewerName: string
  }[]
  totalPages: number
  currentPage: number
}
const useEventReview = (id: number | null) => {
  const [eventReview, setEventReview] = useState<EventReview>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { data: session } = useSession()

  useEffect(() => {
    const fetchEventReview = async () => {
      try {
        const endpoint = `/api/event-review/${id}`
        const headers: HeadersInit = {}
        if (session) {
          headers['Authorization'] = `Bearer ${session.user.accessToken}`
        }

        const response = await fetch(
          `https://dti-backend-lg2iizcpdq-uc.a.run.app${endpoint}`,
          {
            credentials: 'include',
            headers,
          }
        )
        if (!response.ok) {
          throw new Error('Failed to fetch events')
        }
        const data = await response.json()
        setEventReview(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }
    if (id != null) {
      fetchEventReview()
    }
  }, [id])

  return { eventReview, loading, error }
}

export default useEventReview
