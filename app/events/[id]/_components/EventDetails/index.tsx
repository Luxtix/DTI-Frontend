"use client";
import eventCardItems from "@/utils/eventCardItems";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";
import EventDetailsCard from "@/components/EventDetailsCard";

function EventDetails() {
  const { id } = useParams();

  const event = eventCardItems.find((event) => event.id === Number(id));

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
