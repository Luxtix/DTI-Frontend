import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export function useDeleteEvent() {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const deleteEvent = async (eventId: number) => {
    setIsDeleting(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/events/${eventId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      toast({
        title: "Event deleted",
        description: "The event has been successfully deleted.",
      });

      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete event. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteEvent, isDeleting };
}
