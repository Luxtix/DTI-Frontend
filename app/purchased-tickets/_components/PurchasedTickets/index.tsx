"use client";

import Image from "next/image";
import { usePurchasedEvents } from "@/contexts/PurchasedEventsContext";
import { EventType } from "@/types/event";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Barcode from "react-barcode";

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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {events.map((event) => (
              <div className="max-w-sm mx-auto bg-luxtix-4 text-luxtix-1 rounded-2xl">
                <h2 className="text-sm font-extralight p-1 bg-luxtix-1 text-white text-center rounded-t-xl">
                  ©Luxtix
                </h2>
                <div className="p-4 text-center">
                  <h1 className="text-xl font-bold">{event.title}</h1>
                  <div>
                    <p className="text-lg font-medium">{event.city}</p>
                  </div>
                </div>
                <Image
                  src={event.image}
                  alt="Event Poster"
                  className="w-full"
                />
                <div className="grid grid-cols-3 gap-4 p-4 text-center">
                  <div>
                    <p className="text-sm">DAY</p>
                    <p className="text-lg font-bold">{event.day}</p>
                  </div>
                  <div>
                    <p className="text-sm">DATE</p>
                    <p className="text-md font-bold">{event.date}</p>
                  </div>
                  <div>
                    <p className="text-sm">TIME</p>
                    <p className="text-md font-bold">{event.time}</p>
                  </div>
                  <div className="col-span-3">
                    <p className="text-sm">VENUE</p>
                    <p className="text-lg font-bold">{event.venue}</p>
                  </div>
                </div>
                <p className="text-[10px] px-8 text-center font-light italic">
                  Please scan the barcode at the venue to receive your entry
                  ticket. Double-check your quantity and tier before leaving the
                  ticketing area.
                </p>
                <div className="p-4 flex flex-center">
                  <Barcode
                    value={`${event.id}${new Date(event.date).getTime()}`}
                    height={50}
                    fontSize={10}
                  />
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
