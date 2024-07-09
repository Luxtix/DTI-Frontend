import EventCard from "@/components/EventCard";
import eventCardItems from "@/utils/eventCardItems";

import Link from "next/link";

function PopularEvents() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:py-8">
      <h2 className="text-3xl font-bold text-luxtix-5 mb-8 mt-8 sm:mt-0">
        Popular Events
      </h2>
      <div className="flex flex-wrap gap-2 mb-4"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {eventCardItems.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Link
          href="/events"
          className="btn-anim px-8 sm:px-40 py-4 text-lg border border-luxtix-7 text-luxtix-1 rounded-full"
        >
          See More
        </Link>
      </div>
    </div>
  );
}

export default PopularEvents;
