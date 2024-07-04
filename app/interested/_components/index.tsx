import EventCard from "@/components/EventCard";
import eventCardItems from "@/utils/eventCardItems";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";

function InterestedPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="block sm:py-6">
        <Link href="/" className="text-luxtix-1">
          <AiOutlineArrowLeft size={25} />
        </Link>
      </div>
      <h2 className="text-2xl font-bold mb-4">Interested Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {eventCardItems.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default InterestedPage;
