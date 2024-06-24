import { AiOutlineArrowLeft } from "react-icons/ai";
import eventDetailsItems from "@/utils/eventDetailsItems";
import { EventDetailsCard } from ".";
import Link from "next/link";

function EventDetails() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="hidden sm:block sm:py-6">
        <Link href="/" className="text-luxtix-1">
          <AiOutlineArrowLeft size={25} />
        </Link>
      </div>
      {eventDetailsItems.map((event) => (
        <EventDetailsCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default EventDetails;
