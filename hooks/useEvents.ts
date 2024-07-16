import { useState, useEffect } from "react";
import { EventType } from "@/types/event";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

interface ApiResponse {
  statusCode: number;
  message: string;
  success: boolean;
  data: EventType[];
  totalPages: number;
  currentPage: number;
}

export function useEvents(queryParams: string = "", size?: number) {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const search = useSearchParams();
  const city = search.get("city") || "";

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let endpoint = session ? "/api/events" : "/api/events/public";
        let params = new URLSearchParams(queryParams);

        if (size) {
          params.append("size", size.toString());
        }
        if (city) {
          params.append("city", city);
        }

        if (params.toString()) {
          endpoint += `?${params.toString()}`;
        }

        const response = await fetch(`http://localhost:8080${endpoint}`, {
          credentials: "include",
        });

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
  }, [queryParams, size, session]);

  return { events, loading, error };
}
