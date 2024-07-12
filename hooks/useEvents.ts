// hooks/useEvents.ts
import { useState, useEffect } from "react";
import { EventType } from "@/types/event";
import { useSession } from "next-auth/react";

interface ApiResponse {
  statusCode: number;
  message: string;
  success: boolean;
  data: EventType[];
  totalPages: number;
  currentPage: number;
}

export function useEvents(queryParams: string = "") {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const endpoint = session
          ? `/api/events${queryParams}`
          : `/api/events/public${queryParams}`;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data: ApiResponse = await response.json();
        setEvents(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [queryParams, session]);

  return { events, loading, error };
}