import React, { useEffect, useState } from 'react'

interface userPointProps {
  points: number
}
const useTotalUserPoint = () => {
  const [userPoint, setUserPoint] = useState<userPointProps | undefined>(
    undefined
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserPoint = async () => {
      try {
        const endpoint = `/api/points`

        const response = await fetch(`http://localhost:8080${endpoint}`, {
          credentials: 'include',
        })
        if (!response.ok) {
          throw new Error('Failed to fetch events')
        }
        const point = await response.json()
        setUserPoint(point.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }
    fetchUserPoint()
  }, [])

  return { userPoint, loading, error }
}

export default useTotalUserPoint
