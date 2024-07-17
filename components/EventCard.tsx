"use client";

import { EventType } from "@/types/event";
import Image from "next/image";
import Link from "next/link";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { GiTicket } from "react-icons/gi";
import { useState } from "react";
import moment from "moment";

interface EventCardProps {
  event: EventType;
}

function EventCard({ event }: EventCardProps) {
  const [isStarred, setIsStarred] = useState<boolean>(false);

  const handleStarClick = () => {
    setIsStarred(!isStarred);
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm relative">
      <div className="relative">
        <Link href={`/events/${event.id}`}>
          <Image
            src={event.eventImage}
            alt={event.eventName}
            className="w-full h-40 object-cover relative"
            width={600}
            height={400}
          />
        </Link>
        <div className="absolute bottom-0 left-0 bg-luxtix-6 text-luxtix-1 px-2 py-1 rounded-tr-md">
          <span className="text-xs font-medium">{event.categoryName}</span>
        </div>
      </div>
      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-center mb-2 sm:mb-4">
          <span className="text-xs sm:text-sm font-bold text-luxtix-5">
            {event.eventDay}, {moment(event.eventDate).format("MMM Do YY")}
          </span>
          <button className="btn-anim" onClick={handleStarClick}>
            {isStarred ? (
              <AiFillStar
                size={30}
                className="fill-luxtix-2 p-1 bg-white rounded-full"
              />
            ) : (
              <AiOutlineStar
                size={30}
                className="fill-luxtix-1 p-1 bg-white rounded-full"
              />
            )}
          </button>
        </div>
        <div className="flex flex-col">
          <Link href={`/events/${event.id}`}>
            <h3 className="text-md sm:text-lg font-semibold text-luxtix-1 mb-2">
              {event.eventName}
            </h3>
          </Link>
          <p className="text-xs sm:text-sm text-luxtix-7 mb-1 sm:mb-2 line-clamp-3">
            {event.descriptions}
          </p>
          <p className="text-xs sm:text-sm text-luxtix-1 mb-1 sm:mb-2">
            {event.startTime} - {event.endTime}
          </p>
          <p className="text-xs sm:text-sm space-x-2 text-orange-500 flex items-center">
            <GiTicket className="mr-1" />
            {event.ticketPrice === 0
              ? "Free"
              : `From IDR ${event.ticketPrice.toLocaleString()}`}

            <span className="text-luxtix-2">
              ★ {event.favoriteCount} interested
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
