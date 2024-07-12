"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";
import EventDetailsCard from "@/components/EventDetailsCard";
import { useEvents } from "@/hooks/useEvents";

function EventDetails() {
  const { id } = useParams();
  const { events, loading, error } = useEvents();

  const CircularLoader = () => (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-luxtix-2"></div>
    </div>
  );

  if (loading) {
    return <CircularLoader />;
  }

  if (error) {
    return <p>Error loading event</p>;
  }

  const event = events.find((event) => event.id === Number(id));

  if (!event) {
    return <p>Event not found</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="block py-6">
        <Link href="/" className="text-luxtix-1">
          <AiOutlineArrowLeft size={25} />
        </Link>
      </div>
      <EventDetailsCard key={event.id} event={event} />
    </div>
  );
}

export default EventDetails;
