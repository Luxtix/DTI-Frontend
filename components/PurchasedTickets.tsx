"use client";

import Image from "next/image";
import { usePurchasedEvents } from "../contexts/PurchasedEventsContext";
import { EventType } from "@/types/event";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

function PurchasedTickets() {
  const { purchasedEvents } = usePurchasedEvents();
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    const eventsArray = Array.from(purchasedEvents.values());
    setEvents(eventsArray);
  }, [purchasedEvents]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="block sm:py-6">
        <Link href="/" className="text-luxtix-1">
          <AiOutlineArrowLeft size={25} />
        </Link>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Purchased Tickets</h2>
        {events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="border rounded-lg overflow-hidden shadow-sm relative"
              >
                <div className="relative">
                  <Link href={`/event/${event.id}`}>
                    <Image
                      src={event.image}
                      alt={event.title}
                      className="w-full h-40 object-cover cursor-pointer"
                    />
                  </Link>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-luxtix-5">
                      {event.date}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold text-luxtix-1 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-luxtix-7 mb-2 line-clamp-3">
                      {event.description}
                    </p>
                    <button className="btn-anim bg-luxtix-6 text-luxtix-1 hover:bg-luxtix-2 px-4 py-2 rounded-lg">
                      Tickets Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg text-luxtix-1">No purchased tickets yet.</p>
        )}
      </div>
    </div>
  );
}

export default PurchasedTickets;
