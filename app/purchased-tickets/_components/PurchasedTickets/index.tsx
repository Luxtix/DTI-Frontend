"use client";

import { usePurchasedEvents } from "@/contexts/PurchasedEventsContext";
import { EventType } from "@/types/event";
import AddReview from "../AddReview";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Barcode from "react-barcode";
import Modal from "@/components/Modal";

function PurchasedTickets() {
  const { purchasedEvents } = usePurchasedEvents();
  const [events, setEvents] = useState<EventType[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);

  const openEventDetailsModal = (event: EventType) => setSelectedEvent(event);
  const closeEventDetailsModal = () => setSelectedEvent(null);

  const openReviewModal = () => setReviewModalOpen(true);
  const closeReviewModal = () => setReviewModalOpen(false);

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
                    <div className="flex justify-between gap-4 mt-4">
                      <button
                        onClick={() => openEventDetailsModal(event)}
                        className="w-full btn-anim bg-luxtix-6 text-luxtix-1 hover:bg-luxtix-2 text-xs px-2 py-1 sm:px-4 sm:py-2 rounded-lg"
                      >
                        Tickets Details
                      </button>
                      <button
                        onClick={openReviewModal}
                        className="w-full btn-anim bg-luxtix-4 text-luxtix-1 hover:bg-luxtix-2 text-xs px-2 py-1 sm:px-4 sm:py-2 rounded-lg"
                      >
                        Add Review
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg text-luxtix-1">No purchased tickets yet.</p>
        )}
      </div>

      <Modal isOpen={selectedEvent !== null} onClose={closeEventDetailsModal}>
        {selectedEvent && (
          <div className="py-4">
            <div className="max-w-sm mx-auto bg-luxtix-4 text-luxtix-1 rounded-2xl">
              <h2 className="text-sm font-extralight p-1 bg-luxtix-1 text-white text-center rounded-t-xl">
                ©Luxtix
              </h2>
              <div className="p-4 text-center">
                <h1 className="text-xl font-bold">{selectedEvent.title}</h1>
                <div>
                  <p className="text-lg font-medium">{selectedEvent.city}</p>
                </div>
              </div>
              <Image
                src={selectedEvent.image}
                alt="Event Poster"
                className="w-full"
              />
              <div className="grid grid-cols-3 gap-4 p-4 text-center">
                <div>
                  <p className="text-sm">DAY</p>
                  <p className="text-lg font-bold">{selectedEvent.day}</p>
                </div>
                <div>
                  <p className="text-sm">DATE</p>
                  <p className="text-md font-bold">{selectedEvent.date}</p>
                </div>
                <div>
                  <p className="text-sm">VENUE</p>
                  <p className="text-lg font-bold">{selectedEvent.venue}</p>
                </div>
                <div>
                  <p className="text-sm">TIME</p>
                  <p className="text-md font-bold">{selectedEvent.time}</p>
                </div>
                <div>
                  <p className="text-sm">QTY</p>
                  <p className="text-lg font-bold">2</p>
                </div>
                <div>
                  <p className="text-sm">TIER</p>
                  <p className="text-lg font-bold">VVIP</p>
                </div>
              </div>
              <p className="text-[10px] px-8 text-center font-light italic">
                {`${
                  selectedEvent.type === "Offline"
                    ? "Please scan the barcode at the venue to receive your entry ticket. Double-check your quantity and tier before leaving the ticketing area."
                    : "Online event link will be sent to your email 1 hour before the event starts."
                }`}
              </p>
              <div className="p-4 flex justify-center">
                <Barcode
                  value={`${selectedEvent.id}${new Date(
                    selectedEvent.date
                  ).getTime()}`}
                  height={50}
                  fontSize={10}
                />
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={isReviewModalOpen} onClose={closeReviewModal}>
        <AddReview />
      </Modal>
    </div>
  );
}

export default PurchasedTickets;
